import styles from './ChatHeader.module.css';
import { VscNewFile } from 'react-icons/vsc';
import { AiFillRobot } from 'react-icons/ai';
import { CgMenuRight } from 'react-icons/cg';

const ChatHeader = ({ onNewChat, onToggleSidebar, hideMenu }) => {
  return (
    <div className={styles.chatHeader}>
      {!hideMenu && (
        <CgMenuRight className={styles.menu} onClick={onToggleSidebar} />
      )}
      <div className={styles.headerLogo}>
        <AiFillRobot className={styles.logoIcon} />
        <h2 className={styles.logoText}>Chatbot</h2>
      </div>
      <button className={styles.newfilebtn} onClick={onNewChat}>
        <VscNewFile />
      </button>
    </div>
  );
};

export default ChatHeader;
