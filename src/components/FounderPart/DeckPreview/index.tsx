/* eslint-disable react/no-unused-prop-types */
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
  PageChangeEvent,
  OpenFile,
} from '@react-pdf-viewer/core';
import {
  RenderThumbnailItemProps,
  ThumbnailDirection,
  thumbnailPlugin,
} from '@react-pdf-viewer/thumbnail';
import { pageNavigationPlugin } from '@react-pdf-viewer/page-navigation';
import { getFilePlugin, RenderDownloadProps } from '@react-pdf-viewer/get-file';

import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/page-navigation/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import '@react-pdf-viewer/thumbnail/lib/styles/index.css';
import axios from 'axios';
import { enqueueSnackbar } from 'notistack';
// import { Helmet } from 'react-helmet-async';
import './DeckPreview.css';
import Button from '../../UI/Button';
import { CloseIcon } from '../..';
import AskEmailPassword from '../../AskEmailPassword';
import { UIContext } from '@/context';
import { deckService, deckViewService } from '@/services';
import { IDeckSlidesStats } from '@/types';
import arrowBottom from '../../../assets/images/ArrowBottom.svg';
import { ExplanationIcon } from '@/components/icons/Explanation';
import { DownloadIcon } from '@/components/icons/Download';
import ExplanationPopup from '@/components/ExplanationPopup';
// import Loading from '../../PreloadingScreen';

// import { milisecondsToMinutesAndSeconds } from '@/utils';

interface KeyboardEvent {
  key: string;
}

export interface Props {
  type: 'deckCreationPreview' | 'deckUserPreview';
  onClose: () => void;
  pageIndex: number;
  file;
  numPages?;
  setPageIndex?;
  deckId: string | null;
  deckSlidesNumber?: number | null;
  userId?: string | null;
  deckDownloadUrl?: string | null;
}

function DeckPreview({
  type,
  onClose,
  pageIndex,
  file,
  numPages,
  setPageIndex,
  deckId,
  deckSlidesNumber,
  userId,
  deckDownloadUrl,
}: Props) {
  const pageNavigationPluginInstance = pageNavigationPlugin();
  const { jumpToNextPage, jumpToPreviousPage } = pageNavigationPluginInstance;
  const thumbnailPluginInstance = thumbnailPlugin({
    thumbnailWidth: 200,
  });
  const { Thumbnails } = thumbnailPluginInstance;

  const { isShowModal, setShowModal, hasPasswordRequired, hasEmailRequired } =
    useContext(UIContext);
  const [currentSlideStartTime, setCurrentSlideStartTime] = useState(
    Date.now()
  );
  const [isPageActive, setIsPageActive] = useState(true);
  const [slidesStats, setSlidesStats] = useState<IDeckSlidesStats[]>([]);
  const [deckViewId, setDeckViewId] = useState<string | null>(null);

  const urlParts = window.location.pathname.split('/');
  const deckName = urlParts[urlParts.length - 1];

  const getFilePluginInstance = getFilePlugin({
    fileNameGenerator: (pdfFile: OpenFile) => {
      return deckName ?? pdfFile;
    },
  });
  const { Download } = getFilePluginInstance;

  const handleError = (error: Error | string) => {
    if (axios.isAxiosError(error)) {
      enqueueSnackbar(error.response?.data?.message, {
        variant: 'error',
        autoHideDuration: 5000,
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'right',
        },
      });
    } else {
      enqueueSnackbar((error as Error).message ?? error, {
        variant: 'error',
        autoHideDuration: 5000,
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
        auxSlidesStats[pageIndex].viewingTime += elapsedTime;
        if (auxSlidesStats[pageIndex]?.viewingTime >= 180000) {
          auxSlidesStats[pageIndex].viewingTime = 180000;
        } // Set the limit in 3 minutes

        setSlidesStats([...auxSlidesStats]);
        sessionStorage.setItem(
          'slidesStats',
          JSON.stringify([...auxSlidesStats])
        );
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
    const websiteUrl = 'https://tally.so/r/w2a4dM';
    window.open(websiteUrl, '_blank');
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      updateSlideTime();
      jumpToPreviousPage();
    }
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
      updateSlideTime();
      jumpToNextPage();
    }
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
        enqueueSnackbar(
          'There is no deck with such id. Please contact support.',
          {
            variant: 'error',
            autoHideDuration: 2000,
            anchorOrigin: {
              vertical: 'top',
              horizontal: 'right',
            },
          }
        );
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
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [pageIndex]);

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

  useEffect(() => {
    const intervalId = setInterval(() => {
      updateSlideTime();
    }, 5000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  // useEffect(() => {
  //   if (type === 'deckUserPreview') {
  //     document.title = deckName;
  //   }

  //   // Cleanup function to reset the document title when the component unmounts
  //   return () => {
  //     document.title = 'Fundraisingtoolbox'; // Replace with default tab name
  //   };
  // }, [type]);

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

  const handlePageChange = (e: PageChangeEvent) => {
    setPageIndex(e.currentPage);
    updateSlideTime();
  };

  return (
    <div
      id="container"
      role="button"
      tabIndex={0}
      onClick={handleOnClose}
      className="fixed !h-full inset-0 bg-black bg-opacity-80 backdrop-blur-sm p-2 z-10 cursor-default"
    >
      <AskEmailPassword onSubmit={handleModalSubmit} />
      {!isShowModal && type === 'deckCreationPreview' ? (
        <div className="flex cursor-default flex-col gap-4 !w-full !h-full p-4 bg-mirage rounded-lg md:rounded-none justify-between">
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
              <div className="absolute bg-persimmon  rounded-lg z-10 bottom-0 flex gap-2 left-[50%] -translate-x-1/2 ">
                <div className="flex">
                  <div
                    className="prev"
                    style={{
                      zIndex: '1',
                      background: '#F1511B',
                      borderRadius: '4px',
                    }}
                  >
                    <MinimalButton onClick={jumpToPreviousPage}>
                      <img src={arrowBottom} className="rotate-180" alt="" />
                    </MinimalButton>
                  </div>
                  <div className="text-white p-2 text-[12px]">
                    {pageIndex + 1}/{numPages}
                  </div>
                  <div
                    className="next"
                    style={{
                      zIndex: '1',
                      background: '#F1511B',
                      borderRadius: '4px',
                    }}
                  >
                    <MinimalButton onClick={jumpToNextPage}>
                      <img src={arrowBottom} alt="" />
                    </MinimalButton>
                  </div>
                </div>
              </div>
              <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.6.172/build/pdf.worker.min.js">
                <Viewer
                  onPageChange={handlePageChange}
                  defaultScale={SpecialZoomLevel.PageFit}
                  initialPage={pageIndex}
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
          <div className="flex h-full w-full flex-col">
            <div className="absolute flex gap-1 bottom-4 left-[50%] -translate-x-1/2 z-10">
              <div className="bg-persimmon  rounded-lg flex gap-2">
                <div className="flex">
                  <div className="prev z-[1] bg-persimmon rounded">
                    <MinimalButton onClick={jumpToPreviousPage}>
                      <img src={arrowBottom} className="rotate-180" alt="" />
                    </MinimalButton>
                  </div>
                  <div className="text-white p-2 text-[12px]">
                    {pageIndex + 1}/{deckSlidesNumber}
                  </div>
                  <div className="next z-[1] bg-persimmon rounded">
                    <MinimalButton onClick={jumpToNextPage}>
                      <img src={arrowBottom} alt="" />
                    </MinimalButton>
                  </div>
                </div>
              </div>
              {type === 'deckUserPreview' && deckDownloadUrl && (
                <Download>
                  {(props: RenderDownloadProps) => (
                    <Button
                      type="button"
                      icon={
                        <DownloadIcon color="white" width="16" height="16" />
                      }
                      className="bg-persimmon"
                      textColor="#FFF"
                      onClick={props.onClick}
                    />
                  )}
                </Download>
              )}
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
                  onPageChange={handlePageChange}
                  initialPage={pageIndex}
                  defaultScale={SpecialZoomLevel.PageFit}
                  scrollMode={ScrollMode.Page}
                  viewMode={ViewMode.SinglePage}
                  fileUrl={file}
                  plugins={[
                    pageNavigationPluginInstance,
                    thumbnailPluginInstance,
                    getFilePluginInstance,
                  ]}
                />
              </Worker>
            </div>
          </div>
        </div>
      ) : (
        <div>Something went wrong, please contact support</div>
      )}
      {type === 'deckUserPreview' && (
        <div
          tabIndex={0}
          role="button"
          onClick={onSaveDeck}
          className="absolute bottom-6 left-6"
        >
          <ExplanationPopup
            message="How to join DeckLink?"
            showIcon={false}
            className="!w-max"
          >
            <ExplanationIcon width="24" height="24" color="white" />
          </ExplanationPopup>
        </div>
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
