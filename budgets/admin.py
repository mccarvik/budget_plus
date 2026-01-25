from django.contrib import admin
from .models import BudgetEntry


@admin.register(BudgetEntry)
class BudgetEntryAdmin(admin.ModelAdmin):
    list_display = ('date', 'description', 'total_income', 'total_expenses', 'net_income', 'created_at')
    list_filter = ('date', 'created_at')
    search_fields = ('description',)
    date_hierarchy = 'date'
    readonly_fields = ('created_at', 'updated_at')
    
    fieldsets = (
        ('Basic Information', {
            'fields': ('date', 'description')
        }),
        ('Income', {
            'fields': ('salary', 'bonus', 'investment_income', 'other_income')
        }),
        ('Housing Expenses', {
            'fields': ('rent_mortgage', 'utilities', 'property_tax', 'home_insurance')
        }),
        ('Transportation Expenses', {
            'fields': ('car_payment', 'gas', 'car_insurance', 'maintenance', 'public_transit')
        }),
        ('Food Expenses', {
            'fields': ('groceries', 'dining_out')
        }),
        ('Healthcare Expenses', {
            'fields': ('health_insurance', 'medical_expenses', 'prescriptions')
        }),
        ('Personal Expenses', {
            'fields': ('clothing', 'personal_care', 'entertainment', 'subscriptions')
        }),
        ('Financial', {
            'fields': ('credit_card_payment', 'loan_payment', 'savings', 'investments')
        }),
        ('Other Expenses', {
            'fields': ('childcare', 'education', 'gifts_donations', 'pet_expenses', 'miscellaneous')
        }),
        ('Metadata', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )
