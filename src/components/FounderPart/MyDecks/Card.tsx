import { useState } from 'react';
import { useSnackbar } from 'notistack';
import { Page, Document } from 'react-pdf'; /** File library */
import { Link } from 'react-router-dom';
import { Button } from '../..';
import whiteTopRightArrow from '../../../assets/images/ArrowTopRight.svg';
import styles from './Card.module.css';
import { Logo } from '../../icons';
import viewIcon from '../../../assets/images/views.png';
import AverageTimeIcon from '../../../assets/images/AverageTime.png';
import orangeTopRightArrow from '../../../assets/images/OrangeArrowTopRight.svg';
import deleteIcon from '../../../assets/images/Delete.png';
import { Deck } from '../../../types';
import loadingImage from '../../../assets/images/Dummy Slide.svg';

interface Props {
  deck: Deck;
}

function Card({ deck }: Props) {
  const { enqueueSnackbar } = useSnackbar();

  const [loading, setLoading] = useState<boolean>(true);

  const onDocumentLoadSuccess = () => {
    setLoading(false);
  };

  const handleCopyClick = () => {
    // Create a temporary input element
    const tempInput = document.createElement('input');
    tempInput.value = 'decklink.com/'.concat(deck.customDeckLink);
    document.body.appendChild(tempInput);

    // Select the text inside the input element
    tempInput.select();
    tempInput.setSelectionRange(0, 99999); // For mobile devices

    // Copy the text to the clipboard
    document.execCommand('copy');

    // Remove the temporary input element
    document.body.removeChild(tempInput);

    enqueueSnackbar('You copied link', {
      variant: 'success',
      autoHideDuration: 1000,
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'right',
      },
    });
  };

  const handleLoadError = (error: any) => {
    console.error('Error while loading PDF:', error);
    setLoading(true);
  };

  return (
    <div className={styles.deckBlock}>
      {/* Conditionally render the loading image while PDF is loading */}
      {loading && (
        <img
          className={styles.dummyPreviewImage}
          src={loadingImage}
          alt="Loading"
        />
      )}

      <Document
        file={deck.deckUrl}
        onLoadSuccess={onDocumentLoadSuccess}
        onLoadError={handleLoadError}
        noData={<img src={loadingImage} alt="Loading" />}
        loading=""
      >
        {/* Only render the <Page> component when the PDF is loaded */}
        {!loading && (
          <Page
            renderTextLayer={false}
            renderAnnotationLayer={false}
            className={styles.previewImage}
            pageNumber={1}
          />
        )}
      </Document>

      <div className={styles.deckMainContentWrapper}>
        <div className={styles.deckFirstRow}>
          <div className={styles.deckTitleWrapper}>
            <h3 className={styles.deckTitle}>{deck.name}</h3>
            {/* <p className={styles.subtitle}>Published</p> */}
          </div>
          <Button
            type="button"
            text="Copy Link"
            icon={<Logo color="#161A20" />}
            textColor="#161A20"
            onClick={handleCopyClick}
          />
        </div>
        <div className={styles.deckMainInfoAndButtons}>
          <div className={styles.deckMainInfo}>
            <div className={styles.deckMainInfoItem}>
              <div className={styles.deckTitleAndIcon}>
                <img
                  className={styles.deckMainInfoItemDataIcon}
                  src={viewIcon}
                  alt="view-icon"
                />
                <p className={styles.deckMainInfoItemTitle}>Number of views:</p>
              </div>
              <div className={styles.dashedLine} />
              <p className={styles.deckMainInfoItemData}>10</p>
            </div>
            <div className={styles.deckMainInfoItem}>
              <div className={styles.deckTitleAndIcon}>
                <img
                  className={styles.deckMainInfoItemDataIcon}
                  src={AverageTimeIcon}
                  alt="average-time-icon"
                />
                <p className={styles.deckMainInfoItemTitle}>
                  Average spent time:
                </p>
              </div>
              <div className={styles.dashedLine} />
              <p className={styles.deckMainInfoItemData}>10</p>
            </div>
          </div>
          <div className={styles.buttons}>
            <Button
              type="button"
              text="See Detailed Info"
              icon={<img src={whiteTopRightArrow} alt="Arrow" />}
              backgroundColor="#F1511B"
              textColor="#FFF"
            />
            <div className={styles.secondaryButtonsWrapper}>
              <Link
                className={styles.editButton}
                to={`/founder/deck/edit/${deck._id}`}
              >
                <Button
                  type="button"
                  text="Edit"
                  icon={<img src={orangeTopRightArrow} alt="Arrow" />}
                  borderColor="#F1511B"
                  textColor="#F1511B"
                />
              </Link>
              <Button
                type="button"
                icon={<img src={deleteIcon} alt="delete" />}
                backgroundColor="#161A20"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
