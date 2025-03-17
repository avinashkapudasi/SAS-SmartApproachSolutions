import React from 'react';
import { Loader2 } from 'lucide-react';
import styles from './Loader.module.css';

const Loader = ({ size = 40 }) => {
  return (
    <div className={styles.loaderContainer}>
      <Loader2 size={size} className={styles.spinner} />
    </div>
  );
};

export default Loader;