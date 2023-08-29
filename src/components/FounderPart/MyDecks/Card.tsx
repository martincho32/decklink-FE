import { useEffect, useMemo, useState } from 'react';
import { useSnackbar } from 'notistack';
import { Viewer, Worker } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

import { thumbnailPlugin } from '@react-pdf-viewer/thumbnail';
import '@react-pdf-viewer/thumbnail/lib/styles/index.css';

import { Link } from 'react-router-dom';
import { Button } from '../..';
import styles from './Card.module.css';
import { IDeck, IDeckView } from '../../../types';
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
import { getAverageTotalTimeInMinutes } from '@/utils';

import { pageThumbnailPlugin } from './pageThumbnailPlugin';
import { EditIcon } from '@/components/icons/Edit';
import { ViewsIcon } from '@/components/icons/Views';
import { GraphIcon } from '@/components/icons/Grapth';
import { CopyIcon } from '@/components/icons/Copy';
import { DeleteIcon } from '@/components/icons/Delete';
import ExplanationPopup from '@/components/ExplanationPopup';

interface Props {
  deck: IDeck;
  handleClickDelete: (id: string) => Promise<void>;
}

function Card({ deck, handleClickDelete }: Props) {
  const thumbnailPluginInstance = thumbnailPlugin();
  const { Cover } = thumbnailPluginInstance;

  const pageThumbnailPluginInstance = pageThumbnailPlugin({
    PageThumbnail: <Cover width={500} getPageIndex={() => 0} />,
  });

  // const [isPopupVisible, setPopupVisible] = useState(false);

  // const handleMouseEnter = () => {
  //   setPopupVisible(true);
  // };

  // const handleMouseLeave = () => {
  //   setPopupVisible(false);
  // };

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
          enqueueSnackbar(error.message, {
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
        <Viewer
          defaultScale={10}
          fileUrl={deck.deckUrl}
          plugins={[pageThumbnailPluginInstance, thumbnailPluginInstance]}
        />
      </Worker>
    ),
    [deck.deckUrl]
  );

  // const onMouseEnterExplanationIcon = () => {
  //   setPopupVisible(true);
  // };

  // const onMouseLeaveExplanationIcon = () => {
  //   setPopupVisible(false);
  // };

  return (
    <div className={`${styles.deckBlock}`}>
      {viewer}
      <div className={styles.deckMainContentWrapper}>
        <div className={styles.deckMainInfoAndButtons}>
          <div className={styles.deckFirstRow}>
            <div className={styles.deckTitleWrapper}>
              <h3 className={styles.deckTitle}>{deck.name}</h3>
              <Link
                className="hover:no-underline"
                to={`/founder/deck/edit/${deck._id}`}
              >
                <Button
                  type="button"
                  text="Edit"
                  icon={<EditIcon />}
                  textColor="#F1511B"
                  className="w-full font-bold"
                />
              </Link>
            </div>
          </div>
          <div className={styles.deckMainInfo}>
            <div className={`${styles.deckMainInfoItem} relative`}>
              <div className={styles.deckTitleAndIcon}>
                <ViewsIcon />
                <p className={styles.deckMainInfoItemTitle}>Views:</p>
                <ExplanationPopup
                  message="How many people viewer the pitch deck"
                  showIcon
                />
              </div>
              <div className={styles.dashedLine} />
              <p className={styles.deckMainInfoItemData}>
                {deckViews?.length ?? 0}
              </p>
            </div>
            <div className={`${styles.deckMainInfoItem} relative`}>
              <div className={styles.deckTitleAndIcon}>
                <GraphIcon />
                <p className={styles.deckMainInfoItemTitle}>
                  Avg time spent(m):
                </p>
                <ExplanationPopup
                  message="Avg time spent watching the pitch deck in minutes"
                  showIcon
                />
              </div>
              <div className={styles.dashedLine} />
              <p className={styles.deckMainInfoItemData}>
                {getAverageTotalTimeInMinutes(deckViews)}
              </p>
            </div>
          </div>
        </div>
        <div className={styles.buttons}>
          <Button
            type="button"
            text="Copy Link"
            icon={<CopyIcon />}
            backgroundColor="#F1511B"
            textColor="#FFF"
            className="w-full font-semibold relative"
            onClick={handleCopyClick}
          />

          <div className={styles.secondaryButtonsWrapper}>
            <Link
              className="hover:no-underline"
              to={`/founder/deck/${deck._id}`}
            >
              <Button
                type="button"
                text="Stats"
                icon={<GraphIcon />}
                borderColor="#161A20"
                textColor="#161A20"
                className="w-full font-semibold"
              />
            </Link>
            <AlertDialog>
              <AlertDialogTrigger className="bg-mirage w-14 rounded flex justify-center items-center">
                <DeleteIcon width="25" height="25" />
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
