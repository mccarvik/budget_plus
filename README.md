# Budget+ Application

A Django + React application for budget tracking and management.

## Features
- **Voice-Powered Budget Entry**: Record audio and automatically populate budget fields using AI
  - Real-time speech-to-text transcription
  - Grok AI integration for intelligent field extraction
  - Visual feedback when fields are updated
- Budget entry form with comprehensive income and expense categories
- Real-time calculation of totals and net income
- Modern dark theme UI with glassmorphism and smooth animations
- REST API backend with Django REST Framework

## Quick Start

### Prerequisites
- Python 3.8+
- Node.js 16+
- npm
- Grok API key (for audio features) - Get one at https://console.x.ai/

### Setup Instructions

**Step 1: Configure API Keys**
Create a `.env` file in the root directory:
```bash
GROK_API_KEY=your_grok_api_key_here
```

**Step 2: Install Python Dependencies**
```bash
pip install -r requirements.txt
```

**Step 3: Start Django Backend**
```bash
# Backend is already set up with migrations run
# Just start the server
python manage.py runserver
```
Backend will run on http://localhost:8000

**Step 4: Install Frontend Dependencies**
Open a NEW terminal and run:
```bash
cd frontend
npm install
```

**Step 5: Start React Frontend**
```bash
npm run dev
```
Frontend will run on http://localhost:5173

**Step 6: Open your browser**
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

## How to Use Voice Entry

1. Click the "Start Recording" button below the header
2. Allow microphone access when prompted
3. Speak naturally about your budget, for example:
   - "I spent 50 dollars on groceries and 30 on gas today"
   - "My salary this month is 5000 and rent is 1500"
   - "I paid 200 for utilities and 100 for entertainment"
4. Watch as the AI automatically fills in the corresponding fields in real-time
5. Fields that are updated will glow green briefly
6. Click "Stop Recording" when you're done

## Future Features
- Audio file upload and processing
- Historical data visualization
- Budget vs actual comparison
- Monthly/yearly analytics
- Export to Excel/PDF
- Vercel deployment configuration
