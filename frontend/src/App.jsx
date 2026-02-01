import { useState, useEffect } from 'react';
import BudgetForm from './components/BudgetForm';
import AudioRecorder from './components/AudioRecorder';
import './App.css';

function App() {
  const [audioFields, setAudioFields] = useState({});

  const handleAudioTranscriptUpdate = (fields) => {
    setAudioFields(prev => ({
      ...prev,
      ...fields
    }));
  };

  return (
    <div className="App">
      <header className="app-header">
        <h1>Budget+ Tracker</h1>
        <p>Track your income and expenses</p>
        <AudioRecorder onTranscriptUpdate={handleAudioTranscriptUpdate} />
      </header>
      <main className="app-main">
        <BudgetForm audioFields={audioFields} />
      </main>
    </div>
  );
}

export default App;
