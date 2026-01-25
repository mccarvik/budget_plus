import { useState, useEffect } from 'react';
import axios from 'axios';
import './BudgetForm.css';

const API_BASE_URL = 'http://localhost:8000/api/budgets';

const BudgetForm = () => {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    description: '',
    // Income
    salary: 0,
    bonus: 0,
    investment_income: 0,
    other_income: 0,
    // Housing
    rent_mortgage: 0,
    utilities: 0,
    property_tax: 0,
    home_insurance: 0,
    // Transportation
    car_payment: 0,
    gas: 0,
    car_insurance: 0,
    maintenance: 0,
    public_transit: 0,
    // Food
    groceries: 0,
    dining_out: 0,
    // Healthcare
    health_insurance: 0,
    medical_expenses: 0,
    prescriptions: 0,
    // Personal
    clothing: 0,
    personal_care: 0,
    entertainment: 0,
    subscriptions: 0,
    // Financial
    credit_card_payment: 0,
    loan_payment: 0,
    savings: 0,
    investments: 0,
    // Other
    childcare: 0,
    education: 0,
    gifts_donations: 0,
    pet_expenses: 0,
    miscellaneous: 0,
  });

  const [totals, setTotals] = useState({
    totalIncome: 0,
    totalExpenses: 0,
    netIncome: 0,
  });

  useEffect(() => {
    calculateTotals();
  }, [formData]);

  const calculateTotals = () => {
    const totalIncome = 
      parseFloat(formData.salary || 0) +
      parseFloat(formData.bonus || 0) +
      parseFloat(formData.investment_income || 0) +
      parseFloat(formData.other_income || 0);

    const totalExpenses = 
      parseFloat(formData.rent_mortgage || 0) +
      parseFloat(formData.utilities || 0) +
      parseFloat(formData.property_tax || 0) +
      parseFloat(formData.home_insurance || 0) +
      parseFloat(formData.car_payment || 0) +
      parseFloat(formData.gas || 0) +
      parseFloat(formData.car_insurance || 0) +
      parseFloat(formData.maintenance || 0) +
      parseFloat(formData.public_transit || 0) +
      parseFloat(formData.groceries || 0) +
      parseFloat(formData.dining_out || 0) +
      parseFloat(formData.health_insurance || 0) +
      parseFloat(formData.medical_expenses || 0) +
      parseFloat(formData.prescriptions || 0) +
      parseFloat(formData.clothing || 0) +
      parseFloat(formData.personal_care || 0) +
      parseFloat(formData.entertainment || 0) +
      parseFloat(formData.subscriptions || 0) +
      parseFloat(formData.credit_card_payment || 0) +
      parseFloat(formData.loan_payment || 0) +
      parseFloat(formData.savings || 0) +
      parseFloat(formData.investments || 0) +
      parseFloat(formData.childcare || 0) +
      parseFloat(formData.education || 0) +
      parseFloat(formData.gifts_donations || 0) +
      parseFloat(formData.pet_expenses || 0) +
      parseFloat(formData.miscellaneous || 0);

    setTotals({
      totalIncome: totalIncome.toFixed(2),
      totalExpenses: totalExpenses.toFixed(2),
      netIncome: (totalIncome - totalExpenses).toFixed(2),
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_BASE_URL}/entries/`, formData);
      alert('Budget entry saved successfully!');
      console.log('Saved:', response.data);
    } catch (error) {
      console.error('Error saving budget entry:', error);
      alert('Error saving budget entry. Check console for details.');
    }
  };

  const handleReset = () => {
    setFormData({
      date: new Date().toISOString().split('T')[0],
      description: '',
      salary: 0, bonus: 0, investment_income: 0, other_income: 0,
      rent_mortgage: 0, utilities: 0, property_tax: 0, home_insurance: 0,
      car_payment: 0, gas: 0, car_insurance: 0, maintenance: 0, public_transit: 0,
      groceries: 0, dining_out: 0,
      health_insurance: 0, medical_expenses: 0, prescriptions: 0,
      clothing: 0, personal_care: 0, entertainment: 0, subscriptions: 0,
      credit_card_payment: 0, loan_payment: 0, savings: 0, investments: 0,
      childcare: 0, education: 0, gifts_donations: 0, pet_expenses: 0, miscellaneous: 0,
    });
  };

  return (
    <div className="budget-form-container">
      <form onSubmit={handleSubmit} className="budget-form">
        
        {/* Basic Info Section */}
        <div className="form-section">
          <h2>Basic Information</h2>
          <div className="form-row">
            <div className="form-group">
              <label>Date</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group full-width">
              <label>Description</label>
              <input
                type="text"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Monthly budget, Weekly expenses, etc."
              />
            </div>
          </div>
        </div>

        {/* Income Section */}
        <div className="form-section income-section">
          <h2>Income</h2>
          <div className="form-row">
            <div className="form-group">
              <label>Salary</label>
              <input
                type="number"
                step="0.01"
                name="salary"
                value={formData.salary}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Bonus</label>
              <input
                type="number"
                step="0.01"
                name="bonus"
                value={formData.bonus}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Investment Income</label>
              <input
                type="number"
                step="0.01"
                name="investment_income"
                value={formData.investment_income}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Other Income</label>
              <input
                type="number"
                step="0.01"
                name="other_income"
                value={formData.other_income}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        {/* Housing Section */}
        <div className="form-section">
          <h2>Housing Expenses</h2>
          <div className="form-row">
            <div className="form-group">
              <label>Rent/Mortgage</label>
              <input
                type="number"
                step="0.01"
                name="rent_mortgage"
                value={formData.rent_mortgage}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Utilities</label>
              <input
                type="number"
                step="0.01"
                name="utilities"
                value={formData.utilities}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Property Tax</label>
              <input
                type="number"
                step="0.01"
                name="property_tax"
                value={formData.property_tax}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Home Insurance</label>
              <input
                type="number"
                step="0.01"
                name="home_insurance"
                value={formData.home_insurance}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        {/* Transportation Section */}
        <div className="form-section">
          <h2>Transportation Expenses</h2>
          <div className="form-row">
            <div className="form-group">
              <label>Car Payment</label>
              <input
                type="number"
                step="0.01"
                name="car_payment"
                value={formData.car_payment}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Gas</label>
              <input
                type="number"
                step="0.01"
                name="gas"
                value={formData.gas}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Car Insurance</label>
              <input
                type="number"
                step="0.01"
                name="car_insurance"
                value={formData.car_insurance}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Maintenance</label>
              <input
                type="number"
                step="0.01"
                name="maintenance"
                value={formData.maintenance}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Public Transit</label>
              <input
                type="number"
                step="0.01"
                name="public_transit"
                value={formData.public_transit}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        {/* Food Section */}
        <div className="form-section">
          <h2>Food Expenses</h2>
          <div className="form-row">
            <div className="form-group">
              <label>Groceries</label>
              <input
                type="number"
                step="0.01"
                name="groceries"
                value={formData.groceries}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Dining Out</label>
              <input
                type="number"
                step="0.01"
                name="dining_out"
                value={formData.dining_out}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        {/* Healthcare Section */}
        <div className="form-section">
          <h2>Healthcare Expenses</h2>
          <div className="form-row">
            <div className="form-group">
              <label>Health Insurance</label>
              <input
                type="number"
                step="0.01"
                name="health_insurance"
                value={formData.health_insurance}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Medical Expenses</label>
              <input
                type="number"
                step="0.01"
                name="medical_expenses"
                value={formData.medical_expenses}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Prescriptions</label>
              <input
                type="number"
                step="0.01"
                name="prescriptions"
                value={formData.prescriptions}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        {/* Personal Section */}
        <div className="form-section">
          <h2>Personal Expenses</h2>
          <div className="form-row">
            <div className="form-group">
              <label>Clothing</label>
              <input
                type="number"
                step="0.01"
                name="clothing"
                value={formData.clothing}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Personal Care</label>
              <input
                type="number"
                step="0.01"
                name="personal_care"
                value={formData.personal_care}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Entertainment</label>
              <input
                type="number"
                step="0.01"
                name="entertainment"
                value={formData.entertainment}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Subscriptions</label>
              <input
                type="number"
                step="0.01"
                name="subscriptions"
                value={formData.subscriptions}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        {/* Financial Section */}
        <div className="form-section">
          <h2>Financial</h2>
          <div className="form-row">
            <div className="form-group">
              <label>Credit Card Payment</label>
              <input
                type="number"
                step="0.01"
                name="credit_card_payment"
                value={formData.credit_card_payment}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Loan Payment</label>
              <input
                type="number"
                step="0.01"
                name="loan_payment"
                value={formData.loan_payment}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Savings</label>
              <input
                type="number"
                step="0.01"
                name="savings"
                value={formData.savings}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Investments</label>
              <input
                type="number"
                step="0.01"
                name="investments"
                value={formData.investments}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        {/* Other Section */}
        <div className="form-section">
          <h2>Other Expenses</h2>
          <div className="form-row">
            <div className="form-group">
              <label>Childcare</label>
              <input
                type="number"
                step="0.01"
                name="childcare"
                value={formData.childcare}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Education</label>
              <input
                type="number"
                step="0.01"
                name="education"
                value={formData.education}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Gifts & Donations</label>
              <input
                type="number"
                step="0.01"
                name="gifts_donations"
                value={formData.gifts_donations}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Pet Expenses</label>
              <input
                type="number"
                step="0.01"
                name="pet_expenses"
                value={formData.pet_expenses}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Miscellaneous</label>
              <input
                type="number"
                step="0.01"
                name="miscellaneous"
                value={formData.miscellaneous}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        {/* Summary Section */}
        <div className="form-section summary-section">
          <h2>Summary</h2>
          <div className="summary-grid">
            <div className="summary-item income">
              <span className="summary-label">Total Income:</span>
              <span className="summary-value">${totals.totalIncome}</span>
            </div>
            <div className="summary-item expense">
              <span className="summary-label">Total Expenses:</span>
              <span className="summary-value">${totals.totalExpenses}</span>
            </div>
            <div className={`summary-item net ${parseFloat(totals.netIncome) >= 0 ? 'positive' : 'negative'}`}>
              <span className="summary-label">Net Income:</span>
              <span className="summary-value">${totals.netIncome}</span>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="form-actions">
          <button type="submit" className="btn btn-primary">Save Budget Entry</button>
          <button type="button" onClick={handleReset} className="btn btn-secondary">Reset Form</button>
        </div>
      </form>
    </div>
  );
};

export default BudgetForm;
