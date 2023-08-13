/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useContext, useEffect, useState } from 'react';
import {
  MinimalButton,
  ViewMode,
  ScrollMode,
  SpecialZoomLevel,
  Viewer,
  Worker,
} from '@react-pdf-viewer/core';
import {
  RenderThumbnailItemProps,
  ThumbnailDirection,
  thumbnailPlugin,
} from '@react-pdf-viewer/thumbnail';
import {
  NextIcon,
  pageNavigationPlugin,
  PreviousIcon,
} from '@react-pdf-viewer/page-navigation';

import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/page-navigation/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import '@react-pdf-viewer/thumbnail/lib/styles/index.css';
import axios from 'axios';
import { enqueueSnackbar } from 'notistack';
// import { Helmet } from 'react-helmet-async';
import './DeckPreview.css';
import Button from '../../UI/Button';
import { CloseIcon, Logo } from '../..';
import AskEmailPassword from '../../AskEmailPassword';
import { UIContext } from '@/context';
import { deckService, deckViewService } from '@/services';
import { IDeckSlidesStats } from '@/types';
// import Loading from '../../PreloadingScreen';

// import { milisecondsToMinutesAndSeconds } from '@/utils';

interface KeyboardEvent {
  key: string;
}

export interface Props {
  type: 'deckCreationPreview' | 'deckUserPreview';
  onClose: () => void;
  pageNumber: number;
  file;
  numPages;
  setPageNumber?;
  deckId: string | null;
  deckSlidesNumber?: number | null;
  userId?: string | null;
}

function DeckPreview({
  type,
  onClose,
  pageNumber,
  file,
  numPages,
  setPageNumber,
  deckId,
  deckSlidesNumber,
  userId,
}: Props) {
  const pageNavigationPluginInstance = pageNavigationPlugin();
  const { jumpToNextPage, jumpToPreviousPage } = pageNavigationPluginInstance;

  const thumbnailPluginInstance = thumbnailPlugin({
    thumbnailWidth: 200,
  });
  const { Thumbnails } = thumbnailPluginInstance;

  const { isShowModal, setShowModal, hasPasswordRequired, hasEmailRequired } =
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
        //   `El usuario ${userId} miró la slide ${pageNumber} durante ${
        //     auxSlidesStats[pageNumber - 1].viewingTime
        //   }`
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
    window.location.href = 'https://tally.so/r/w2a4dM';
  };

  const onPrev = () => {
    updateSlideTime();
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1);
    }
  };

  const onNext = () => {
    updateSlideTime();
    if (pageNumber !== numPages) {
      setPageNumber(pageNumber + 1);
    }
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'ArrowRight') {
      onNext();
    } else if (event.key === 'ArrowLeft') {
      onPrev();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [pageNumber]);

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
          stale: false,
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

  useEffect(() => {
    if (slidesStats.length) {
      updateDeckView();
    }
  }, [slidesStats]);

  useEffect(() => {
    if (!hasPasswordRequired && !hasEmailRequired && deckSlidesNumber) {
      const auxSlidesStats = initializeArrayOfSLidesStats(deckSlidesNumber);
      setSlidesStats(auxSlidesStats);
      deckViewService
        .createDeckView(
          {
            deckId: deckId as string,
            deckSlidesStats: slidesStats,
            viewerEmail: null,
            deckOwnerId: userId!,
            stale: false,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        )
        .then(({ data }) => {
          setDeckViewId(data._id);
          initializeCounting();
        })
        .catch((error: any) => {
          console.error('DeckPreview error: ', error);
        });
    }
  }, [deckSlidesNumber]);

  const urlParts = window.location.pathname.split('/');
  const deckName = urlParts[urlParts.length - 1];

  useEffect(() => {
    if (type === 'deckUserPreview') {
      document.title = deckName;
    }

    // Cleanup function to reset the document title when the component unmounts
    return () => {
      document.title = 'Fundraisingtoolbox'; // Replace with default tab name
    };
  }, [type]);

  const renderThumbnailItem = (props: RenderThumbnailItemProps) => (
    <div
      key={props.pageIndex}
      className="custom-thumbnail-item"
      data-testid={`thumbnail-${props.pageIndex}`}
      style={{
        backgroundColor:
          props.pageIndex === props.currentPage
            ? 'rgb(241, 81, 27)'
            : 'transparent',
        cursor: 'pointer',
        height: '100%',
        marginRight: '1rem',
      }}
    >
      <div style={{ margin: '0.25rem' }} onClick={props.onJumpToPage}>
        {props.renderPageThumbnail}
      </div>
    </div>
  );

  useEffect(() => {
    const handleDocumentClick = (event: MouseEvent) => {
      const container = document.querySelector('.deckUserPreview');
      const pageLayer = document.querySelector('.rpv-core__page-layer');

      if (pageLayer && container?.contains(pageLayer)) {
        // The click occurred on or inside the .rpv-core__page-layer element
        event.stopPropagation();
      }
    };

    document.addEventListener('click', handleDocumentClick);

    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, []);

  console.log(pageNumber);

  return (
    <div
      id="container"
      role="button"
      tabIndex={0}
      onClick={handleOnClose}
      className="fixed !h-full inset-0 bg-black bg-opacity-80 backdrop-blur-sm p-2"
    >
      <AskEmailPassword onSubmit={handleModalSubmit} />
      {!isShowModal && type === 'deckCreationPreview' ? (
        <div className="flex flex-col gap-4 !w-full !h-full p-4 bg-mirage rounded-lg md:rounded-none justify-between">
          <div
            style={{
              display: 'flex',
              height: '100%',
              width: '100%',
              flexDirection: 'column',
            }}
          >
            <div
              style={{
                height: '70%',
                position: 'relative',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '1rem',
                  transform: 'translate(0, -100%) rotate(-90deg)',
                  zIndex: '1',
                }}
              >
                <MinimalButton onClick={jumpToPreviousPage}>
                  <PreviousIcon />
                </MinimalButton>
              </div>
              <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.6.172/build/pdf.worker.min.js">
                <Viewer
                  defaultScale={SpecialZoomLevel.PageFit}
                  initialPage={pageNumber - 1}
                  scrollMode={ScrollMode.Page}
                  viewMode={ViewMode.SinglePage}
                  fileUrl={file}
                  plugins={[
                    pageNavigationPluginInstance,
                    thumbnailPluginInstance,
                  ]}
                />
              </Worker>
              <div
                style={{
                  position: 'absolute',
                  top: '50%',
                  right: '1rem',
                  transform: 'translate(0, -100%) rotate(-90deg)',
                  zIndex: '1',
                }}
              >
                <MinimalButton onClick={jumpToNextPage}>
                  <NextIcon />
                </MinimalButton>
              </div>
            </div>
            <div
              style={{
                height: '30%',
                overflow: 'auto',
              }}
            >
              <Thumbnails
                thumbnailDirection={ThumbnailDirection.Horizontal}
                renderThumbnailItem={renderThumbnailItem}
              />
            </div>
          </div>
        </div>
      ) : !isShowModal && type === 'deckUserPreview' ? (
        <div
          id="deckUserPreview"
          className="flex flex-col gap-4 !w-full !h-full p-4 bg-mirage rounded-lg md:rounded-none justify-between"
        >
          <div
            style={{
              display: 'flex',
              height: '100%',
              width: '100%',
              flexDirection: 'column',
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: '3rem',
                transform: 'translate(0, -100%) rotate(-90deg)',
                zIndex: '1',
                background: '#fff',
                borderRadius: '4px',
              }}
            >
              <MinimalButton onClick={jumpToPreviousPage}>
                <PreviousIcon />
              </MinimalButton>
            </div>
            <div
              className="deckUserPreview"
              style={{
                height: '100%',
                position: 'relative',
              }}
            >
              <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.6.172/build/pdf.worker.min.js">
                <Viewer
                  initialPage={pageNumber - 1}
                  defaultScale={SpecialZoomLevel.PageFit}
                  scrollMode={ScrollMode.Page}
                  viewMode={ViewMode.SinglePage}
                  fileUrl={file}
                  plugins={[
                    pageNavigationPluginInstance,
                    thumbnailPluginInstance,
                  ]}
                />
              </Worker>
            </div>
            <div
              style={{
                position: 'absolute',
                top: '50%',
                right: '3rem',
                transform: 'translate(0, -100%) rotate(-90deg)',
                zIndex: '1',
                background: '#fff',
                borderRadius: '4px',
              }}
            >
              <MinimalButton onClick={jumpToNextPage}>
                <NextIcon />
              </MinimalButton>
            </div>
          </div>
        </div>
      ) : (
        <div>Something went wrong, please contact support</div>
      )}

      {type === 'deckUserPreview' && (
        <Button
          type="button"
          text="Join DeckLink"
          icon={<Logo color="white" />}
          className="bg-persimmon/25 text-white fixed bottom-4 right-[7%]  py-3 px-3"
          // backgroundColor="#F1511B"
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
