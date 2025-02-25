import React, { useState } from 'react';
import { FaPaperclip, FaTimes } from 'react-icons/fa';
import styles from './FileUpload.module.css';

const FileUpload = ({ onFileSelect }) => {
  const [preview, setPreview] = useState(null);

  const handleFileChange = event => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = e => {
        setPreview(e.target.result); 
        onFileSelect(e.target.result); 
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const removeFile = () => {
    setPreview(null);
    onFileSelect(null);
  };

  return (
    <div className={styles.fileUploadWrapper}>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        hidden
        id="file-input"
      />

      {preview ? (
        <div className={styles.previewWrapper}>
          <img src={preview} alt="Preview" className={styles.uploadedImage} />
          <button className={styles.removeButton} onClick={removeFile}>
            <FaTimes size={18} />
          </button>
        </div>
      ) : (
        <button
          type="button"
          className={styles.iconButton}
          onClick={() => document.getElementById('file-input').click()}
        >
          <FaPaperclip size={24} />
        </button>
      )}
    </div>
  );
};

export default FileUpload;
