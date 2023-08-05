import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Page, Document, Thumbnail } from 'react-pdf'; /** File library */
import { enqueueSnackbar } from 'notistack';
import './DeckPreview.css';
import Button from '../../UI/Button';
import { CloseIcon, Logo } from '../..';
import AskEmailPassword from '../../AskEmailPassword';
import { UIContext } from '@/context';
import { deckService, deckViewService } from '@/services';
import { IDeckSlidesStats } from '@/types';
// import { milisecondsToMinutesAndSeconds } from '@/utils';

export interface Props {
  type: 'deckCreationPreview' | 'deckUserPreview';
  onClose: () => void;
  pageNumber: number;
  file;
  onDocumentLoadSuccess;
  options;
  numPages;
  setPreviewPickDeckSlide;
  setPageNumber;
  deckId: string | null;
  deckSlidesNumber?: number | null;
  userId?: string | null;
}

function DeckPreview({
  type,
  onClose,
  pageNumber,
  file,
  onDocumentLoadSuccess,
  options,
  numPages,
  setPreviewPickDeckSlide,
  setPageNumber,
  deckId,
  deckSlidesNumber,
  userId,
}: Props) {
  const { isShowModal, setShowModal, hasPasswordRequired } =
    useContext(UIContext);
  const [currentSlideStartTime, setCurrentSlideStartTime] = useState(0);
  const [isPageActive, setIsPageActive] = useState(true);
  const [slidesStats, setSlidesStats] = useState<IDeckSlidesStats[]>([]);
  const [deckViewId, setDeckViewId] = useState<string | null>(null);

  const handleError = (error: Error | string) => {
    let errorMessage: string = 'Whoops! Something went wrong. Error: ';
    const contactSupportMessage = ' Please contact support.';
    if (axios.isAxiosError(error)) {
      errorMessage +=
        error.response?.data?.message ??
        error.response?.data ??
        'Server error.';
      enqueueSnackbar(errorMessage + contactSupportMessage, {
        variant: 'error',
        autoHideDuration: 10000,
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'right',
        },
      });
    } else {
      errorMessage += (error as Error).message ?? error;
      enqueueSnackbar(errorMessage + contactSupportMessage, {
        variant: 'error',
        autoHideDuration: 10000,
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'right',
        },
      });
    }
  };
  const updateDeckView = () => {
    if (deckViewId) {
      try {
        deckViewService.editDeckView(
          { deckSlidesStats: slidesStats },
          deckViewId,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );
      } catch (error: any) {
        console.error('Error while updating deckView');
        handleError(error);
      }
    }
  };

  const updateSlideTime = () => {
    if (isPageActive) {
      if (slidesStats.length) {
        const currentTime = Date.now();
        const elapsedTime = currentTime - currentSlideStartTime;
        const auxSlidesStats = JSON.parse(JSON.stringify(slidesStats));
        auxSlidesStats[pageNumber - 1].viewingTime += elapsedTime;
        // console.log(
        //   `El usuario ${userId} miró la slide ${pageNumber} durante ${milisecondsToMinutesAndSeconds(
        //     auxSlidesStats[pageNumber - 1].viewingTime
        //   )}`
        // );
        setSlidesStats([...auxSlidesStats]);
        setCurrentSlideStartTime(Date.now());
      }
    }
  };

  const handleOnClose = (event) => {
    if (event.target.id === 'container') {
      onClose();
    }
  };

  const onSaveDeck = () => {
    console.log('testing save');
  };

  const onPrev = () => {
    updateSlideTime();
    setPageNumber(pageNumber - 1);
  };

  const onNext = () => {
    updateSlideTime();
    setPageNumber(pageNumber + 1);
  };

  function initializeArrayOfSLidesStats(count): IDeckSlidesStats[] {
    const arrayOfEmptyObjects: { slideNumber: number; viewingTime: number }[] =
      [];

    for (let i = 0; i < count; i++) {
      arrayOfEmptyObjects.push({
        slideNumber: i + 1,
        viewingTime: 0,
      });
    }

    return arrayOfEmptyObjects;
  }

  function initializeCounting() {
    setCurrentSlideStartTime(Date.now());
  }

  const handleModalSubmit = async (email: string, password?: string) => {
    try {
      if (!deckId) {
        enqueueSnackbar('deck id is null. Please contact support.', {
          variant: 'error',
          autoHideDuration: 2000,
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'right',
          },
        });
        return;
      }
      if (hasPasswordRequired) {
        await deckService.validateDeck(
          {
            _id: deckId as string,
            password,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );
      }

      const auxSlidesStats = initializeArrayOfSLidesStats(deckSlidesNumber);
      setSlidesStats(auxSlidesStats);
      const { data } = await deckViewService.createDeckView(
        {
          deckId,
          deckSlidesStats: slidesStats,
          viewerEmail: email,
          deckOwnerId: userId!,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      setShowModal(false);
      setDeckViewId(data._id);
      initializeCounting();
    } catch (error: any) {
      handleError(error);
    }
  };

  const handleVisibilityChange = () => {
    if (document.visibilityState === 'visible') {
      // User gets back to our tab
      setIsPageActive(true);
      setCurrentSlideStartTime(Date.now());
    } else {
      // User changes to another tab
      setIsPageActive(false);
      // updateSlideTime();
    }
  };

  useEffect(() => {
    if (type === 'deckUserPreview') {
      document.addEventListener('visibilitychange', handleVisibilityChange);
    }
    return () => {
      if (type === 'deckUserPreview') {
        document.removeEventListener(
          'visibilitychange',
          handleVisibilityChange
        );
        // TODO do one last update to the deck-view endpoint
        updateDeckView();
      }
    };
  }, []);

  // useEffect(() => {
  //   if (deckViewId) {
  //     window.addEventListener('beforeunload', (event) => {
  //       console.log('beforeunload: ');
  //       getSlidesInfo();
  //       // updateDeckView();
  //       // eslint-disable-next-line no-param-reassign
  //       event.returnValue = 'Are you sure about closing this tab?';
  //     });
  //   }
  // }, [deckViewId]);

  useEffect(() => {
    if (slidesStats.length) {
      updateDeckView();
    }
  }, [slidesStats]);

  return (
    <div
      id="container"
      role="button"
      tabIndex={0}
      onClick={handleOnClose}
      className={`fixedContainer fixed overflow-y-scroll h-screen inset-0 bg-black bg-opacity-80 backdrop-blur-sm ${
        type === 'deckUserPreview' ? 'p-2' : ''
      }`}
    >
      <AskEmailPassword onSubmit={handleModalSubmit} />

      {!isShowModal && (
        <Document
          file={file}
          onLoadSuccess={onDocumentLoadSuccess}
          options={options}
          noData={<h4 className="">No file selected</h4>}
          className={`document h-screen p-4 bg-mirage ${
            type === 'deckCreationPreview' ? ' rounded-lg' : 'md:rounded-none'
          }`}
        >
          <div
            className={`flex gap-4 justify-center${
              type === 'deckUserPreview'
                ? ' max-w-full max-h-full w-auto h-auto'
                : ''
            }`}
          >
            <Button
              type="button"
              icon={
                <Logo
                  color={pageNumber === 1 ? '#f1511b2e' : '#F1511B'}
                  topLeft
                />
              }
              onClick={onPrev}
              disabled={pageNumber === 1}
            />

            <Page
              renderTextLayer={false}
              renderAnnotationLayer={false}
              className={`${
                type === 'deckUserPreview'
                  ? 'pageWrapperFullScreen'
                  : 'pageWrapper'
              }`}
              pageNumber={pageNumber}
            />
            <Button
              type="button"
              icon={
                <Logo
                  color={pageNumber === numPages ? '#f1511b2e' : '#F1511B'}
                />
              }
              className="max-h-min"
              onClick={onNext}
              disabled={pageNumber === numPages}
            />
          </div>
          {type === 'deckCreationPreview' && (
            <div className="previewPagesWrapper">
              {Array.from(new Array(numPages), (_el, index) => (
                <Thumbnail
                  onItemClick={() => {
                    setPreviewPickDeckSlide(true);
                    setPageNumber(index + 1);
                  }}
                  key={`page_${index + 1}`}
                  pageNumber={index + 1}
                  className="previewPageWrapper"
                />
              ))}
            </div>
          )}
        </Document>
      )}

      {type === 'deckUserPreview' && (
        <Button
          type="button"
          text="Save This Deck"
          icon={<Logo color="white" />}
          className="bg-persimmon text-white fixed bottom-4 left-1/2 -translate-x-1/2"
          backgroundColor="#F1511B"
          textColor="#FFF"
          onClick={onSaveDeck}
        />
      )}

      {type === 'deckCreationPreview' && (
        <Button
          type="button"
          icon={<CloseIcon width="16" height="16" color="#FFFFFF" />}
          className="buttonClose fixed w-8 h-8 top-8 right-8 p-2 bg-persimmon rounded-md"
          onClick={onClose}
        />
      )}
    </div>
  );
}

export default DeckPreview;
