import { useState } from 'react';
import { Page, Document, Thumbnail } from 'react-pdf'; /** File library */
import './DeckPreview.css';
import Button from '../../UI/Button';
import { CloseIcon, Logo } from '../..';
import AskEmailPassword from '../../AskEmailPassword';

function DeckPreview({
  type,
  visible,
  onClose,
  pageNumber,
  file,
  onDocumentLoadSuccess,
  options,
  numPages,
  setPreviewPickDeckSlide,
  setPageNumber,
}: {
  type: 'deckCreationPreview' | 'deckUserPreview';
  visible: boolean;
  onClose: () => void;
  pageNumber: number;
  file;
  onDocumentLoadSuccess;
  options;
  numPages;
  setPreviewPickDeckSlide;
  setPageNumber;
}) {
  const [showModal, setShowModal] = useState(false);
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

  if (!visible) return null;

  const handleOnCloseFormClose = (event) => {
    if (event.target.id === 'containerClose') {
      setShowModal(false);
    }
  };

  const handleModalSubmit = (email: string, password?: string) => {
    console.log('Submitted Email:', email);
    if (password !== '') {
      console.log('Submitted Password:', password);
    }
    setShowModal(false);
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
      {type === 'deckUserPreview' && (
        <button
          type="button"
          className="hidden"
          onClick={() => {
            setShowModal(true);
            document.body.style.overflow = 'hidden';
          }}
        >
          Open Modal
        </button>
      )}
      <AskEmailPassword
        show={showModal}
        onClose={handleOnCloseFormClose}
        onSubmit={handleModalSubmit}
        // showPasswordInput // You can change this to false if you only want an email input.
      />
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
          className={`flex gap-4 justify-center ${
            type === 'deckUserPreview' && 'w-full h-auto'
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
              <Logo color={pageNumber === numPages ? '#f1511b2e' : '#F1511B'} />
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
                onItemClick={(args) => {
                  setPreviewPickDeckSlide(true);
                  console.log('args: ', args);
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

      {/* <button
        className="buttonClose fixed w-8 h-8 top-8 right-8 p-2 bg-persimmon rounded-md"
        onClick={onClose}
        type="button"
      >
        <CloseIcon width="16" height="16" color="#FFFFFF" />
      </button> */}
      <Button
        type="button"
        icon={<CloseIcon width="16" height="16" color="#FFFFFF" />}
        className="buttonClose fixed w-8 h-8 top-8 right-8 p-2 bg-persimmon rounded-md"
        onClick={onClose}
      />
    </div>
  );
}

export default DeckPreview;
