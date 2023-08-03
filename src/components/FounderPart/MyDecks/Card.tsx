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
import { IDeck } from '../../../types';
import loadingImage from '../../../assets/images/Dummy Slide.svg';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../../UI/AlertDialog';

interface Props {
  deck: IDeck;
  handleClickDelete: (id: string) => Promise<void>;
}

function Card({ deck, handleClickDelete }: Props) {
  const { enqueueSnackbar } = useSnackbar();

  const [loading, setLoading] = useState<boolean>(true);

  const onDocumentLoadSuccess = () => {
    setLoading(false);
  };

  const handleCopyClick = () => {
    navigator.clipboard.writeText(`decklink.com/${deck?.customDeckLink}`).then(
      () => {
        /* Resolved - text copied to clipboard successfully */
        enqueueSnackbar('Url successfully copied!!', {
          variant: 'success',
          autoHideDuration: 2000,
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'right',
          },
        });
      },
      (error) => {
        console.error('Failed to copy: ', error);
      }
    );
  };

  const handleLoadError = (error: any) => {
    console.error('Error while loading PDF:', error);
    setLoading(true);
  };

  return (
    <div className={styles.deckBlock}>
      {/* Conditionally render the loading image while PDF is loading */}
      {/* {loading && (
        <img
          className={styles.dummyPreviewImage}
          src={loadingImage}
          alt="Loading"
        />
      )} */}

      <Document
        file={deck.deckUrl}
        onLoadSuccess={onDocumentLoadSuccess}
        onLoadError={handleLoadError}
        noData={
          <img
            className={styles.dummyPreviewImage}
            src={loadingImage}
            alt="Loading"
          />
        }
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
        <div className={styles.deckMainInfoAndButtons}>
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
        </div>
        <div className={styles.buttons}>
          <Link className="hover:no-underline" to={`/founder/deck/${deck._id}`}>
            <Button
              type="button"
              text="See Detailed Info"
              icon={<img src={whiteTopRightArrow} alt="Arrow" />}
              backgroundColor="#F1511B"
              textColor="#FFF"
              className="w-full"
            />
          </Link>
          <div className={styles.secondaryButtonsWrapper}>
            <Link
              className="hover:no-underline"
              to={`/founder/deck/edit/${deck._id}`}
            >
              <Button
                type="button"
                text="Edit"
                icon={<img src={orangeTopRightArrow} alt="Arrow" />}
                borderColor="#F1511B"
                textColor="#F1511B"
                className="w-full"
              />
            </Link>
            <AlertDialog>
              <AlertDialogTrigger className="bg-mirage w-14 rounded">
                <img className="m-auto" src={deleteIcon} alt="delete" />
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    your deck and remove the data from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => handleClickDelete(deck._id)}
                    className="bg-persimmon"
                  >
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
