
import axios from 'axios';
const API_KEY = `AIzaSyA1g06lgmxKqjQb-Z5CzgqpcEqaAeojLXA`;
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

export const fetchBotResponse = async ({ text, image }) => {
  const requestBody = {
    contents: [
      {
        parts: [],
      },
    ],
  };


  if (text) {
    requestBody.contents[0].parts.push({ text });
  }


  if (image) {
    requestBody.contents[0].parts.push({
      inlineData: {
        mimeType: 'image/jpeg', 
        data: image.split(',')[1], 
      },
    });
  }


  if (requestBody.contents[0].parts.length === 0) {
    requestBody.contents[0].parts.push({ text: 'Describe this image.' });
  }

  try {
    const response = await axios.post(API_URL, requestBody, {
      headers: { 'Content-Type': 'application/json' },
    });

    return (
      response.data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ||
      'No response.'
    );
  } catch (error) {
    console.error(
      'Eroare Gemini API:',
      error.response?.data || error.message
    );
    return 'An error occurred. Please try again.';
  }
};