from django.db import models
from django.utils import timezone


class BudgetEntry(models.Model):
    """Model for budget entries"""
    
    # Basic info
    date = models.DateField(default=timezone.now)
    description = models.CharField(max_length=255, blank=True)
    
    # Income fields
    salary = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    bonus = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    investment_income = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    other_income = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    
    # Expense fields - Housing
    rent_mortgage = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    utilities = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    property_tax = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    home_insurance = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    
    # Expense fields - Transportation
    car_payment = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    gas = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    car_insurance = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    maintenance = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    public_transit = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    
    # Expense fields - Food
    groceries = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    dining_out = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    
    # Expense fields - Healthcare
    health_insurance = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    medical_expenses = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    prescriptions = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    
    # Expense fields - Personal
    clothing = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    personal_care = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    entertainment = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    subscriptions = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    
    # Expense fields - Financial
    credit_card_payment = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    loan_payment = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    savings = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    investments = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    
    # Expense fields - Other
    childcare = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    education = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    gifts_donations = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    pet_expenses = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    miscellaneous = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    
    # Metadata
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-date']
        verbose_name = 'Budget Entry'
        verbose_name_plural = 'Budget Entries'
    
    def __str__(self):
        return f"Budget Entry - {self.date}"
    
    @property
    def total_income(self):
        """Calculate total income"""
        return (
            self.salary + self.bonus + 
            self.investment_income + self.other_income
        )
    
    @property
    def total_expenses(self):
        """Calculate total expenses"""
        return (
            # Housing
            self.rent_mortgage + self.utilities + 
            self.property_tax + self.home_insurance +
            # Transportation
            self.car_payment + self.gas + 
            self.car_insurance + self.maintenance + 
            self.public_transit +
            # Food
            self.groceries + self.dining_out +
            # Healthcare
            self.health_insurance + self.medical_expenses + 
            self.prescriptions +
            # Personal
            self.clothing + self.personal_care + 
            self.entertainment + self.subscriptions +
            # Financial
            self.credit_card_payment + self.loan_payment + 
            self.savings + self.investments +
            # Other
            self.childcare + self.education + 
            self.gifts_donations + self.pet_expenses + 
            self.miscellaneous
        )
    
    @property
    def net_income(self):
        """Calculate net income (income - expenses)"""
        return self.total_income - self.total_expenses
