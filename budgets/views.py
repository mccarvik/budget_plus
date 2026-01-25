from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import BudgetEntry
from .serializers import BudgetEntrySerializer


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
