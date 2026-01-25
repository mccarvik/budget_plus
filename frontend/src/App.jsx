import { useState, useEffect } from 'react';
import BudgetForm from './components/BudgetForm';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="app-header">
        <h1>Budget+ Tracker</h1>
        <p>Track your income and expenses</p>
      </header>
      <main className="app-main">
        <BudgetForm />
      </main>
    </div>
  );
}

export default App;
