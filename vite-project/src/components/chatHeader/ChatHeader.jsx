import styles from "./ChatHeader.module.css";
import { IoIosArrowDown } from 'react-icons/io';
import { AiFillRobot } from 'react-icons/ai';


const ChatHeader = () => {
  return (
    <div className={styles.chatHeader}>
      <div className={styles.headerLogo}>
        <AiFillRobot className={styles.logoIcon} />
        <h2 className={styles.logoText}>Chatbot</h2>
      </div>
      <button id="close-chatbot" className={styles.closeChatbot}>
        <IoIosArrowDown />
      </button>
    </div>
  );
};

export default ChatHeader;