from rest_framework import viewsets, status
from rest_framework.decorators import action, api_view
from rest_framework.response import Response
from .models import BudgetEntry
from .serializers import BudgetEntrySerializer
import os
import json
import requests
from dotenv import load_dotenv

load_dotenv()


class BudgetEntryViewSet(viewsets.ModelViewSet):
    """
    API endpoint for budget entries
    """
    queryset = BudgetEntry.objects.all()
    serializer_class = BudgetEntrySerializer
    
    @action(detail=False, methods=['get'])
    def summary(self, request):
        """Get summary statistics for all budget entries"""
        entries = self.get_queryset()
        
        if not entries.exists():
            return Response({
                'total_income': 0,
                'total_expenses': 0,
                'net_income': 0,
                'count': 0
            })
        
        total_income = sum(entry.total_income for entry in entries)
        total_expenses = sum(entry.total_expenses for entry in entries)
        
        return Response({
            'total_income': total_income,
            'total_expenses': total_expenses,
            'net_income': total_income - total_expenses,
            'count': entries.count()
        })


@api_view(['POST'])
def process_audio_transcript(request):
    """
    Process audio transcript with Grok AI to extract budget fields
    """
    transcript = request.data.get('transcript', '')
    
    if not transcript:
        return Response({'error': 'No transcript provided'}, status=status.HTTP_400_BAD_REQUEST)
    
    # Get Grok API key from environment
    grok_api_key = os.getenv('GROK_API_KEY')
    
    if not grok_api_key:
        return Response({'error': 'Grok API key not configured'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    # Prepare the prompt for Grok
    system_prompt = """You are a budget entry assistant. Extract financial information from the user's speech and return it as a JSON object.

Available fields:
- date (YYYY-MM-DD format)
- description (string)
- salary, bonus, investment_income, other_income (numbers)
- rent_mortgage, utilities, property_tax, home_insurance (numbers)
- car_payment, gas, car_insurance, maintenance, public_transit (numbers)
- groceries, dining_out (numbers)
- health_insurance, medical_expenses, prescriptions (numbers)
- clothing, personal_care, entertainment, subscriptions (numbers)
- credit_card_payment, loan_payment, savings, investments (numbers)
- childcare, education, gifts_donations, pet_expenses, miscellaneous (numbers)

IMPORTANT: 
- Only return a JSON object with the fields that were mentioned
- Do not include fields that were not mentioned
- Convert all monetary amounts to numbers (no dollar signs or commas)
- For dates, use YYYY-MM-DD format
- Return ONLY valid JSON, no additional text

Example:
User says: "I spent 50 dollars on groceries and 30 on gas today"
Return: {"groceries": 50, "gas": 30}

User says: "My salary this month is 5000 and rent is 1500"
Return: {"salary": 5000, "rent_mortgage": 1500}"""

    try:
        # Call Grok API (using x.ai endpoint)
        response = requests.post(
            'https://api.x.ai/v1/chat/completions',
            headers={
                'Content-Type': 'application/json',
                'Authorization': f'Bearer {grok_api_key}'
            },
            json={
                'messages': [
                    {'role': 'system', 'content': system_prompt},
                    {'role': 'user', 'content': transcript}
                ],
                'model': 'grok-beta',
                'temperature': 0.3,
                'stream': False
            },
            timeout=10
        )
        
        if response.status_code == 200:
            result = response.json()
            content = result['choices'][0]['message']['content']
            
            # Try to parse the JSON from the response
            try:
                # Clean the response (remove markdown code blocks if present)
                content = content.strip()
                if content.startswith('```json'):
                    content = content[7:]
                if content.startswith('```'):
                    content = content[3:]
                if content.endswith('```'):
                    content = content[:-3]
                content = content.strip()
                
                fields = json.loads(content)
                return Response({'fields': fields})
            except json.JSONDecodeError as e:
                print(f"JSON decode error: {e}, Content: {content}")
                return Response({'error': 'Failed to parse AI response', 'raw': content}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        else:
            error_msg = f"Grok API error: {response.status_code}"
            if response.text:
                error_msg += f" - {response.text}"
            return Response({'error': error_msg}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            
    except requests.Timeout:
        return Response({'error': 'Request to Grok API timed out'}, status=status.HTTP_504_GATEWAY_TIMEOUT)
    except Exception as e:
        return Response({'error': f'Error processing with Grok: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
