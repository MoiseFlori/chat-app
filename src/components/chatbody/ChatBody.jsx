import React from 'react';
import styles from './ChatBody.module.css';
import Message from '../message/Message';
import { useRef, useEffect } from 'react';

const ChatBody = ({ messages }) => {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (!Array.isArray(messages)) {
    console.error('Eroare: `messages` nu este un array.', messages);
    return <div className={styles.chatBody}>No messages yet.</div>;
  }
  return (
    <div className={styles.chatBody}>
      {messages.map((msg, index) => (
        <div key={index} className={styles.message}>
          <Message message={msg.text} sender={msg.sender} image={msg.image} />
        </div>
      ))}
      <div ref={messagesEndRef} /> 
    </div>
  );
};

export default ChatBody;
