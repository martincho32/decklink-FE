import { useEffect, useMemo, useState } from 'react';
import { useSnackbar } from 'notistack';
// import { Page, Document } from 'react-pdf'; /** File library */
import { Viewer, Worker } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

import { thumbnailPlugin } from '@react-pdf-viewer/thumbnail';
import '@react-pdf-viewer/thumbnail/lib/styles/index.css';

import { Link } from 'react-router-dom';
import { Button } from '../..';
import whiteTopRightArrow from '../../../assets/images/ArrowTopRight.svg';
import styles from './Card.module.css';
import viewIcon from '../../../assets/images/Views.png';
import AverageTimeIcon from '../../../assets/images/AverageTime.png';
import orangeTopRightArrow from '../../../assets/images/OrangeArrowTopRight.svg';
import deleteIcon from '../../../assets/images/Delete.png';
import { IDeck, IDeckView } from '../../../types';
import copyIcon from '../../../assets/images/CopyIcon.svg';
import chartIcon from '../../../assets/images/ChartIcon.svg';
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
import { deckViewService } from '@/services';
import { getAverageTotalTime } from '@/utils';

import { pageThumbnailPlugin } from './pageThumbnailPlugin';

interface Props {
  deck: IDeck;
  handleClickDelete: (id: string) => Promise<void>;
  onClick: (event) => void;
}

function Card({ deck, handleClickDelete, onClick }: Props) {
  const thumbnailPluginInstance = thumbnailPlugin();
  const { Cover } = thumbnailPluginInstance;

  const pageThumbnailPluginInstance = pageThumbnailPlugin({
    PageThumbnail: <Cover width={500} getPageIndex={() => 0} />,
  });

  const [isPopupVisible, setPopupVisible] = useState(false);

  const handleMouseEnter = () => {
    setPopupVisible(true);
  };

  const handleMouseLeave = () => {
    setPopupVisible(false);
  };

  const { enqueueSnackbar } = useSnackbar();

  const [deckViews, setDeckViews] = useState<IDeckView[] | null>(null);

  const handleCopyClick = () => {
    navigator.clipboard
      .writeText(
        `https://www.fundraisingtoolbox.io/preview/${deck?.customDeckLink}`
      )
      .then(
        () => {
          enqueueSnackbar('Url successfully copied!', {
            variant: 'success',
            autoHideDuration: 2000,
            anchorOrigin: {
              vertical: 'top',
              horizontal: 'right',
            },
          });
        },
        (error) => {
          enqueueSnackbar(`Failed to copy. Please contact support. ${error}`, {
            variant: 'error',
            autoHideDuration: 2000,
            anchorOrigin: {
              vertical: 'top',
              horizontal: 'right',
            },
          });
        }
      );
  };

  useEffect(() => {
    deckViewService
      .getDeckViewByDeckId(deck._id, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then(({ data }) => {
        setDeckViews(data);
      })
      .catch((error: any) => {
        console.error('Error: ', error.message);
      });
  }, []);

  const viewer = useMemo(
    () => (
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.6.172/build/pdf.worker.min.js">
        <div className="">
          <Viewer
            defaultScale={10}
            fileUrl={deck.deckUrl}
            plugins={[pageThumbnailPluginInstance, thumbnailPluginInstance]}
          />
        </div>
      </Worker>
    ),
    [deck.deckUrl]
  );

  return (
    <div
      onClick={onClick}
      tabIndex={0}
      role="button"
      className={styles.deckBlock}
    >
      {/* <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.6.172/build/pdf.worker.min.js">
        <div className="">
          <Viewer
            defaultScale={10}
            fileUrl={deck.deckUrl}
            plugins={[pageThumbnailPluginInstance, thumbnailPluginInstance]}
          />
        </div>
      </Worker> */}

      {viewer}

      <div className={styles.deckMainContentWrapper}>
        <div className={styles.deckMainInfoAndButtons}>
          <div className={styles.deckFirstRow}>
            <div className={styles.deckTitleWrapper}>
              <h3 className={styles.deckTitle}>{deck.name}</h3>
            </div>
            <div
              role="button"
              tabIndex={0}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onClick={handleCopyClick}
              className={`${styles.buttonContainer} flex w-full gap-1 p-2 bg-gray-200 rounded justify-between`}
            >
              <p className="break-all max-w-[12rem] truncate">{`fundraisingtoolbox.io/preview/${deck?.customDeckLink}`}</p>
              <img src={copyIcon} alt="" />
              {isPopupVisible && (
                <div
                  className={styles.popup}
                >{`fundraisingtoolbox.io/preview/${deck?.customDeckLink}`}</div>
              )}
            </div>
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
              <p className={styles.deckMainInfoItemData}>
                {deckViews?.length ?? 0}
              </p>
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
              <p className={styles.deckMainInfoItemData}>
                {getAverageTotalTime(deckViews)}
              </p>
            </div>
          </div>
        </div>
        <div className={styles.buttons}>
          <Link className="hover:no-underline" to={`/founder/deck/${deck._id}`}>
            <Button
              type="button"
              text="See Detailed Info"
              leftIcon={<img src={chartIcon} alt="Arrow" />}
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
