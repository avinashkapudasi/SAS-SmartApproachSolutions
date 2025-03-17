import React, { useState } from 'react';
import { X, Loader2 } from 'lucide-react';
import styles from '../css/ApplicationModal.module.css';
import Loader from './Common/Loader/Loader';
const ApplicationModal = ({ formUrl, onClose }) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className={styles.formModal} onClick={(e) => {
      if (e.target === e.currentTarget) onClose();
    }}>
      <div className={styles.modalContent}>
        <button 
          className={styles.closeBtn} 
          onClick={onClose}
          aria-label="Close"
        >
          <X size={24} color="#4b5563" />
        </button>
        
        {isLoading && (
          <div className={styles.loaderContainer}>
            <Loader size={40} />
          </div>
        )}
        
        <iframe
          className={styles.modalIframe}
          src={formUrl}
          title="Application Form"
          frameBorder="0"
          onLoad={() => setIsLoading(false)}
        >
          Loading...
        </iframe>
      </div>
    </div>
  );
};

export default ApplicationModal;