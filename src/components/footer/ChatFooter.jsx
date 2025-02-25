import React, { useState } from 'react';
import { FaArrowUp } from 'react-icons/fa';
import EmojiPickerComponent from '../emojipicker/EmojiPickerComponent';
import FileUpload from '../fileupload/FileUpload';
import styles from './ChatFooter.module.css';

const ChatFooter = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');
  const [image, setImage] = useState(null); 

  const handleSubmit = e => {
    e.preventDefault();

    if (message.trim() || image) {
      onSendMessage({ text: message, image });
      setMessage(''); 
      setImage(null); 
    }
  };

  const handleKeyPress = e => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault(); 
      handleSubmit(e); 
    }
  };

  return (
    <div className={styles.chatFooter}>
      <form onSubmit={handleSubmit} className={styles.chatForm}>
        <textarea
          placeholder="Message..."
          className={styles.messageInput}
          value={message}
          onChange={e => setMessage(e.target.value)}
          onKeyDown={handleKeyPress} 
        />

  
        <EmojiPickerComponent
          onEmojiSelect={emoji => setMessage(prev => prev + emoji)}
        />

        <FileUpload onFileSelect={imgUrl => setImage(imgUrl)} />

        <button type="submit" className={styles.sendButton}>
          <FaArrowUp size={24} />
        </button>
      </form>
    </div>
  );
};

export default ChatFooter;
