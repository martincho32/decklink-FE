import { useState } from 'react';
import styles from './SuccessBanner.module.css';

interface BannerProps {
  message: string;
}

function SuccessBanner({ message }: BannerProps) {
  const [showBanner, setShowBanner] = useState(true);

  const handleBannerClose = () => {
    setShowBanner(false);
  };

  return (
    <div className={styles.alignBannerCenter}>
      {showBanner && (
        <div className={styles.successBanner}>
          <span className={styles.message}>{message}</span>
          <button
            type="button"
            className={styles.closeButton}
            onClick={handleBannerClose}
          >
            X
          </button>
        </div>
      )}
    </div>
  );
}

export default SuccessBanner;
