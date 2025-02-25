import React from 'react';
import { AiFillRobot } from 'react-icons/ai';
import { FaUserCircle } from 'react-icons/fa';
import styles from './Message.module.css';

const Message = ({ message, sender, image }) => {

  return (
    <div
      className={`${styles.messageWrapper} ${
        sender === 'user' ? styles.userWrapper : styles.botWrapper
      }`}
    >
      {sender === 'bot' && <AiFillRobot className={styles.botIcon} />}

      <div
        className={sender === 'user' ? styles.userMessage : styles.botMessage}
      >
        {message && <p>{message}</p>}
        {image && (
          <img src={image} alt="Uploaded" className={styles.imageMessage} />
        )}
      </div>

      {sender === 'user' && <FaUserCircle className={styles.userIcon} />}
    </div>
  );
};

export default Message;
