import { useContext } from 'react';
import axios from 'axios';
import { Page, Document, Thumbnail } from 'react-pdf'; /** File library */
import { enqueueSnackbar } from 'notistack';
import './DeckPreview.css';
import Button from '../../UI/Button';
import { CloseIcon, Logo } from '../..';
import AskEmailPassword from '../../AskEmailPassword';
import { UIContext } from '@/context';
import { deckService } from '@/services';

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
}: Props) {
  const { isShowModal, setShowModal, hasPasswordRequired } =
    useContext(UIContext);

  const handleOnClose = (event) => {
    if (event.target.id === 'container') {
      onClose();
    }
  };

  const onSaveDeck = () => {
    console.log('testing save');
  };

  const onPrev = () => {
    setPageNumber(pageNumber - 1);
  };

  const onNext = () => {
    setPageNumber(pageNumber + 1);
  };

  // const handleOnCloseFormClose = (event) => {
  //   console.log(event.target);
  //   if (event.target.id === 'containerClose') {
  //     // setShowModal(false);
  //   }
  // };

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

  const handleModalSubmit = async (email: string, password?: string) => {
    try {
      if (hasPasswordRequired) {
        await deckService.validateDeck({
          _id: deckId as string,
          password,
        });
      }
      // TODO Here call deck-view service to create a new deck view, this will be updated later but is created now

      setShowModal(false);
    } catch (error: any) {
      handleError(error);
    }
  };

  return (
    <div
      id="container"
      role="button"
      tabIndex={0}
      onClick={handleOnClose}
      className={`fixedContainer fixed overflow-y-scroll h-screen inset-0 bg-black bg-opacity-80 backdrop-blur-sm ${
        type === 'deckUserPreview' ? 'p-4' : ''
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
              type === 'deckUserPreview' ? ' w-full h-auto' : ''
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
              {Array.from(new Array(numPages), (el, index) => (
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
