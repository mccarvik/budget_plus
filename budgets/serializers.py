from rest_framework import serializers
from .models import BudgetEntry


class BudgetEntrySerializer(serializers.ModelSerializer):
    total_income = serializers.DecimalField(max_digits=10, decimal_places=2, read_only=True)
    total_expenses = serializers.DecimalField(max_digits=10, decimal_places=2, read_only=True)
    net_income = serializers.DecimalField(max_digits=10, decimal_places=2, read_only=True)
    
    class Meta:
        model = BudgetEntry
        fields = '__all__'
        read_only_fields = ('created_at', 'updated_at')
