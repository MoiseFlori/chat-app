import React from 'react';
import styles from './Sidebar.module.css';
import { IoCloseOutline } from 'react-icons/io5';
import { useSelector, useDispatch } from 'react-redux';
import { setActiveChat } from '../../redux/chatSlice';

const Sidebar = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const conversations = useSelector(state => state.chat.conversations);

  return (
    <div className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
      <button className={styles.closeButton} onClick={onClose}>
        <IoCloseOutline />
      </button>
      <h3 className={styles.history}>History</h3>
      <ul className={styles.chatList}>
        {Object.keys(conversations).map(chatId => (
          <li className={styles.listItem} key={chatId} onClick={() => dispatch(setActiveChat(chatId))}>
            {new Date(parseInt(chatId)).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
