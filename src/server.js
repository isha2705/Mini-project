require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../public')));

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Chat API endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;
    
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Use Gemini Pro model with correct naming
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
    
    // Generate response from Gemini
    const result = await model.generateContent(message);
    const response = result.response.text();
    
    return res.json({ response });
  } catch (error) {
    console.error('Error with Gemini API:', error);
    return res.status(500).json({ error: 'Failed to get response from AI' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
}); 