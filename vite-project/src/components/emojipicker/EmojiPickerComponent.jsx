import React, { useState } from 'react';
import { FaRegSmile } from 'react-icons/fa';
import EmojiPicker from 'emoji-picker-react';
import styles from './EmojiPickerComponent.module.css';

const EmojiPickerComponent = ({ onEmojiSelect }) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  return (
    <div className={styles.emojiWrapper}>
      <button
        type="button"
        className={styles.iconButton}
        onClick={() => setShowEmojiPicker(!showEmojiPicker)}
      >
        <FaRegSmile size={24} />
      </button>

      {showEmojiPicker && (
        <div className={styles.emojiPicker}>
          <EmojiPicker
            onEmojiClick={emojiData => onEmojiSelect(emojiData.emoji)}
          />
        </div>
      )}
    </div>
  );
};

export default EmojiPickerComponent;
