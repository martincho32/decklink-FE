import { useContext, useEffect, useState } from 'react';
import {
  Icon,
  MinimalButton,
  Position,
  SpecialZoomLevel,
  Tooltip,
  Viewer,
  Worker,
  ScrollMode,
} from '@react-pdf-viewer/core';
import {
  pageNavigationPlugin,
  RenderGoToPageProps,
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
import disableScrollPlugin from './disableScrollPlugin';

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
  const disableScrollPluginInstance = disableScrollPlugin();
  const pageNavigationPluginInstance = pageNavigationPlugin();
  const { GoToNextPage, GoToPreviousPage } = pageNavigationPluginInstance;
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

  return (
    <div
      id="container"
      role="button"
      tabIndex={0}
      onClick={handleOnClose}
      className="fixed !h-full inset-0 bg-black bg-opacity-80 backdrop-blur-sm p-2"
    >
      <AskEmailPassword onSubmit={handleModalSubmit} />
      {!isShowModal && (
        <div className="flex flex-col gap-4 !w-full !h-full p-4 bg-mirage rounded-lg md:rounded-none justify-between">
          <div
            style={{
              left: 0,
              position: 'absolute',
              top: '50%',
              transform: 'translate(24px, -50%)',
              zIndex: 1,
            }}
          >
            <GoToPreviousPage>
              {(props: RenderGoToPageProps) => (
                <Tooltip
                  position={Position.BottomCenter}
                  target={
                    <MinimalButton onClick={props.onClick}>
                      <Icon size={16}>
                        <path d="M18.4.5,5.825,11.626a.5.5,0,0,0,0,.748L18.4,23.5" />
                      </Icon>
                    </MinimalButton>
                  }
                  content={() => 'Previous page'}
                  offset={{ left: 0, top: 8 }}
                />
              )}
            </GoToPreviousPage>
          </div>

          <div
            style={{
              position: 'absolute',
              right: 0,
              top: '50%',
              transform: 'translate(-24px, -50%)',
              zIndex: 1,
            }}
          >
            <GoToNextPage>
              {(props: RenderGoToPageProps) => (
                <Tooltip
                  position={Position.BottomCenter}
                  target={
                    <MinimalButton onClick={props.onClick}>
                      <Icon size={16}>
                        <path d="M5.651,23.5,18.227,12.374a.5.5,0,0,0,0-.748L5.651.5" />
                      </Icon>
                    </MinimalButton>
                  }
                  content={() => 'Next page'}
                  offset={{ left: 0, top: 8 }}
                />
              )}
            </GoToNextPage>
          </div>

          <div className="flex-none h-[70%]">
            <Viewer
              fileUrl={URL.createObjectURL(new Blob([file]))} // Pass the PDF file URL to Viewer
              plugins={[
                disableScrollPluginInstance,
                pageNavigationPluginInstance,
              ]}
              defaultScale={SpecialZoomLevel.PageFit}
              scrollMode={ScrollMode.Horizontal}
            />
          </div>
          {type === 'deckCreationPreview' && (
            <div className="flex-grow">
              <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.6.172/build/pdf.worker.min.js">
                <Viewer
                  scrollMode={ScrollMode.Horizontal}
                  fileUrl={URL.createObjectURL(new Blob([file]))} // Pass the PDF file URL to Viewer
                  initialPage={pageNumber - 1} // Subtract 1 to convert to zero-based index
                  enableSmoothScroll={false}
                  defaultScale={0.13}
                  characterMap={{
                    isCompressed: true,
                    url: 'https://unpkg.com/pdfjs-dist@3.6.172/build/pdf.worker.min.js',
                  }}
                  pageLayout={{
                    transformSize: ({ size }) => ({
                      height: size.height,
                      width: size.width + 5,
                    }),
                  }}
                />
              </Worker>
            </div>
          )}
        </div>
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
