# Budget+ Application

A Django + React application for budget tracking and management.

## Features
- Budget entry form with comprehensive income and expense categories
- Real-time calculation of totals and net income
- Clean, modern UI with responsive design
- REST API backend with Django REST Framework
- Future: Audio-to-text budget entry with LLM

## Quick Start

### Prerequisites
- Python 3.8+
- Node.js 16+
- npm

### Setup Instructions

**Step 1: Install Python Dependencies**
```bash
pip install -r requirements.txt
```

**Step 2: Start Django Backend**
```bash
# Backend is already set up with migrations run
# Just start the server
python manage.py runserver
```
Backend will run on http://localhost:8000

**Step 3: Install Frontend Dependencies**
Open a NEW terminal and run:
```bash
cd frontend
npm install
```

**Step 4: Start React Frontend**
```bash
npm run dev
```
Frontend will run on http://localhost:5173

**Step 5: Open your browser**
Navigate to http://localhost:5173

## API Endpoints
- `GET /api/budgets/entries/` - List all budget entries
- `POST /api/budgets/entries/` - Create new budget entry
- `GET /api/budgets/entries/{id}/` - Get specific entry
- `PUT /api/budgets/entries/{id}/` - Update entry
- `DELETE /api/budgets/entries/{id}/` - Delete entry
- `GET /api/budgets/entries/summary/` - Get summary statistics

## Admin Panel
Access Django admin at http://localhost:8000/admin/
(Create superuser with: `python manage.py createsuperuser`)

## Budget Categories

### Income
- Salary, Bonus, Investment Income, Other Income

### Expenses
- **Housing**: Rent/Mortgage, Utilities, Property Tax, Home Insurance
- **Transportation**: Car Payment, Gas, Car Insurance, Maintenance, Public Transit
- **Food**: Groceries, Dining Out
- **Healthcare**: Health Insurance, Medical Expenses, Prescriptions
- **Personal**: Clothing, Personal Care, Entertainment, Subscriptions
- **Financial**: Credit Card Payment, Loan Payment, Savings, Investments
- **Other**: Childcare, Education, Gifts & Donations, Pet Expenses, Miscellaneous

## Future Features
- Audio file upload and processing
- LLM integration for automatic field population from audio
- Historical data visualization
- Budget vs actual comparison
- Vercel deployment configuration
