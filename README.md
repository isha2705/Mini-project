# Gemini AI Chatbot

A beautiful and responsive chatbot web application powered by Google's Gemini AI API.

## Features

- Interactive chat interface with animated responses
- Modern and creative CSS design
- Real-time interaction with Google's Gemini AI
- Responsive design for all device sizes
- Typing indicators and animations

## Setup Instructions

1. Clone this repository to your local machine

2. Install dependencies:
   ```
   npm install
   ```

3. Get a Gemini API key:
   - Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Create a new API key
   - Copy the API key

4. Configure your API key:
   - Open the `.env` file
   - Replace `your_gemini_api_key_here` with your actual API key

5. Start the server:
   ```
   npm start
   ```
   
   For development with auto-restart:
   ```
   npm run dev
   ```

6. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

## Project Structure

```
├── public/              # Static files
│   ├── css/             # CSS stylesheets
│   │   └── style.css    # Main stylesheet
│   ├── js/              # JavaScript files
│   │   └── script.js    # Main client-side script
│   └── index.html       # Main HTML file
├── src/                 # Backend files
│   └── server.js        # Express server and API endpoints
├── .env                 # Environment variables
├── package.json         # Project dependencies
└── README.md            # This file
```

## Tech Stack

- **Frontend**: HTML, CSS, JavaScript (Vanilla)
- **Backend**: Node.js, Express
- **AI Integration**: Google's Gemini API

## Notes

- Make sure to keep your API key private
- The free tier of Gemini API has usage limits
- This project is for educational purposes only 