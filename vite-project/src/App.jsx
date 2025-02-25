import React, { useState } from 'react';
import ChatBody from './components/chatbody/ChatBody';
import ChatFooter from './components/footer/ChatFooter';
import ChatHeader from './components/chatheader/ChatHeader';
import { fetchBotResponse } from './services/api';

const App = () => {
  const [messages, setMessages] = useState([
    { text: 'Hello! How can I help you today?', sender: 'bot' },
  ]);

const handleSendMessage = async ({ text, image }) => {
  let newMessages = [...messages];

  if (text) {
    newMessages.push({ text, sender: 'user' });
  }

  if (image) {
    newMessages.push({ text: '', image, sender: 'user' });

    const botResponse = await fetchBotResponse({
      text: 'Describe this image:',
      image,
    });

    newMessages.push({ text: botResponse, sender: 'bot' });
  } else {
    const botResponse = await fetchBotResponse({ text });
    newMessages.push({ text: botResponse, sender: 'bot' });
  }

  setMessages(newMessages);
};


  return (
    <div>
   <ChatHeader />
      <ChatBody messages={messages} />
      <ChatFooter onSendMessage={handleSendMessage} />
    </div>
  );
};

export default App;
