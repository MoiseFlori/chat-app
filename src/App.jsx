import React, { useState, useEffect } from 'react';
import ChatBody from './components/chatbody/ChatBody';
import ChatFooter from './components/footer/ChatFooter';
import ChatHeader from './components/chatHeader/ChatHeader';
import { fetchBotResponse } from './services/api';
import styles from './App.module.css';
import Sidebar from './components/sidebar/Sidebar';
import { useDispatch, useSelector } from 'react-redux';
import { addMessage } from './redux/chatSlice';
import { startNewChat } from './redux/chatSlice';

const App = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 768);

  const dispatch = useDispatch();
  const conversations = useSelector(state => state.chat.conversations);
  const activeChatId = useSelector(state => state.chat.activeChatId);

const messages =
  activeChatId && conversations[activeChatId]?.messages
    ? conversations[activeChatId].messages
    : [];

  // 📌 Creează automat un chat dacă nu există unul activ
  useEffect(() => {
    if (!activeChatId) {
      dispatch(startNewChat()); // Creează un nou chat la pornire
    }
  }, [activeChatId, dispatch]);

  const handleSendMessage = async ({ text, image }) => {
    if (!activeChatId) return;

    if (text) {
      dispatch(
        addMessage({ chatId: activeChatId, message: { text, sender: 'user' } })
      );
    }

    if (image) {
      dispatch(
        addMessage({ chatId: activeChatId, message: { image, sender: 'user' } })
      );

      const botResponse = await fetchBotResponse({
        text: 'Describe this image:',
        image,
      });
      dispatch(
        addMessage({
          chatId: activeChatId,
          message: { text: botResponse, sender: 'bot' },
        })
      );
    } else {
      const botResponse = await fetchBotResponse({ text });
      dispatch(
        addMessage({
          chatId: activeChatId,
          message: { text: botResponse, sender: 'bot' },
        })
      );
    }
  };

  const handleNewChat = () => {
    dispatch(startNewChat());
  };

  useEffect(() => {
    const handleResize = () => {
      const isNowMobile = window.innerWidth < 768;
      setIsMobile(isNowMobile);
      setIsSidebarOpen(!isNowMobile);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className={`${styles.app} ${isSidebarOpen ? styles.sidebarOpen : ''}`}>
      <Sidebar
        isOpen={isSidebarOpen}
        isMobile={isMobile}
        onClose={() => setIsSidebarOpen(false)}
      />

      <div className={styles.mainContent}>
        {isMobile ? (
          <ChatHeader
            onNewChat={handleNewChat}
            onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          />
        ) : (
          <ChatHeader onNewChat={handleNewChat} hideMenu />
        )}

        <ChatBody messages={messages} />
        <ChatFooter onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
};

export default App;
