import React from 'react';
import styles from './ChatBody.module.css';
import Message from '../message/Message';

const ChatBody = ({ messages }) => {
  return (
    <div className={styles.chatBody}>
      {messages.map((msg, index) => (
        <div key={index} className={styles.message}>
          <Message message={msg.text} sender={msg.sender} image={msg.image} />
        </div>
      ))}
    </div>
  );
};

export default ChatBody;
