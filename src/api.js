// api.js

const API_KEY = `AIzaSyDzHmtMgM4nM5MU4z1SUASXsDPWmo`;
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

export const fetchBotResponse = async message => {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [
        {
          parts: [{ text: message }],
        },
      ],
    }),
  };

  try {
    const response = await fetch(API_URL, requestOptions);
    const data = await response.json();
    if (!response.ok) throw new Error(data.error.message);
    return data.candidates[0].content.parts[0].text.trim();
  } catch (error) {
    console.error('Error fetching bot response:', error);
    return 'An error occurred. Please try again.';
  }
};
