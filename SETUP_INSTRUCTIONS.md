# Budget+ Voice-Powered Setup Guide

## 🎙️ What You're Building
A modern budget tracker with real-time voice input powered by AI. Speak naturally about your expenses and watch the form fill itself!

## 📋 Prerequisites

1. **Python 3.8+** - [Download](https://www.python.org/downloads/)
2. **Node.js 16+** - [Download](https://nodejs.org/)
3. **Grok API Key** - [Get one here](https://console.x.ai/)

## 🚀 Quick Setup

### Step 1: Get Your Grok API Key

1. Go to https://console.x.ai/
2. Sign up or log in
3. Create a new API key
4. Copy the key (you'll need it in Step 2)

### Step 2: Configure Environment

Open the `.env` file in the root directory and add your API key:

```env
GROK_API_KEY=your_actual_grok_api_key_here
```

**Important**: Replace `your_actual_grok_api_key_here` with your real API key!

### Step 3: Install Backend Dependencies

Open a terminal in the project root and run:

```bash
pip install -r requirements.txt
```

### Step 4: Start the Backend Server

In the same terminal:

```bash
python manage.py runserver
```

Keep this terminal running! You should see:
```
Starting development server at http://127.0.0.1:8000/
```

### Step 5: Install Frontend Dependencies

Open a **NEW terminal** and navigate to the frontend folder:

```bash
cd frontend
npm install
```

### Step 6: Start the Frontend

In the same terminal (still in frontend folder):

```bash
npm run dev
```

You should see:
```
Local: http://localhost:5173/
```

### Step 7: Open the App

Open your browser and go to: **http://localhost:5173**

## 🎤 Using Voice Entry

1. **Click "Start Recording"** button (below the header)
2. **Allow microphone access** when your browser asks
3. **Speak naturally** about your budget:
   
   Example phrases:
   - "I spent 50 dollars on groceries today"
   - "My rent is 1500 and utilities are 200"
   - "I paid 30 for gas and 100 for dining out"
   - "My salary this month is 5000"
   - "I invested 500 and saved 1000"

4. **Watch the magic happen**:
   - Your speech converts to text in real-time
   - AI processes it and extracts the numbers
   - Form fields automatically fill and glow green
   - All totals update instantly

5. **Click "Stop Recording"** when done
6. **Click "Save Budget Entry"** to save to database

## 🔧 Troubleshooting

### Microphone Not Working
- Make sure you clicked "Allow" when the browser asked for mic access
- Check your browser settings: Settings → Privacy → Microphone
- Try using Chrome or Edge (best speech recognition support)

### API Key Not Working
- Double-check the `.env` file is in the root directory (not in frontend/)
- Make sure there are no extra spaces around the API key
- Verify the key is valid at https://console.x.ai/
- Restart the backend server after changing `.env`

### "Grok API key not configured" Error
- The `.env` file wasn't loaded properly
- Make sure you have `python-dotenv` installed: `pip install python-dotenv`
- Restart the Django server

### Fields Not Updating
- Check the browser console (F12) for errors
- Make sure both backend (port 8000) and frontend (port 5173) are running
- Verify your internet connection (needed for Grok API)

### CORS Errors
- Make sure you're accessing via `http://localhost:5173` (not `127.0.0.1`)
- Both servers must be running
- Clear your browser cache and try again

## 🎨 Features

### Voice Recognition
- Real-time speech-to-text using Web Speech API
- Works in Chrome, Edge, Safari (latest versions)
- Continuous recording with live transcription

### AI Processing
- Grok AI extracts financial data from natural speech
- Understands context and categories automatically
- Updates only mentioned fields, preserves others

### Visual Feedback
- Animated recording button with pulse effect
- Live audio visualization
- Green glow on updated fields
- Processing indicator when AI is working
- Live transcript display

### Modern UI
- Dark theme with glassmorphism
- Smooth animations and transitions
- Responsive design (works on mobile)
- Accessible and intuitive

## 📚 Example Voice Commands

| What You Say | What Gets Filled |
|-------------|------------------|
| "I spent 50 on groceries" | Groceries: 50 |
| "My salary is 5000" | Salary: 5000 |
| "Rent 1500, utilities 200" | Rent/Mortgage: 1500, Utilities: 200 |
| "Gas 40, car insurance 150" | Gas: 40, Car Insurance: 150 |
| "I saved 1000 and invested 500" | Savings: 1000, Investments: 500 |
| "Dining out 100, entertainment 75" | Dining Out: 100, Entertainment: 75 |

## 🎯 Tips for Best Results

1. **Speak clearly** at a normal pace
2. **Use specific numbers**: "50 dollars" or "fifty dollars" both work
3. **Mention categories**: "groceries", "rent", "gas", etc.
4. **Pause briefly** between different items
5. **Wait for processing**: The "Processing with AI..." indicator shows when it's working

## 🔐 Security Notes

- Never commit your `.env` file (it's in `.gitignore`)
- Keep your Grok API key private
- This setup is for development only
- For production, use proper environment variable management

## 🆘 Need Help?

Check these logs:
1. **Backend errors**: Look at the terminal running Django
2. **Frontend errors**: Press F12 in browser → Console tab
3. **API errors**: Check Network tab in browser dev tools

## 🎉 You're All Set!

Enjoy your voice-powered budget tracker! Speak your expenses and watch the AI do the rest.
