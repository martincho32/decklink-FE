import { Page, Document, Thumbnail } from 'react-pdf'; /** File library */
import iconTopRight from '../../../assets/images/ArrowTopRight.svg';
import './DeckPreview.css';
import Button from '../../UI/Button';
import { Logo } from '../..';

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
  const handleOnClose = (event) => {
    if (event.target.id === 'container') {
      onClose();
    }
  };

  const onSaveDeck = () => {
    console.log('testing save');
  };

  if (!visible) return null;

  if (type === 'deckCreationPreview') {
    return (
      <div
        id="container"
        role="button"
        tabIndex={0}
        onClick={handleOnClose}
        className="fixedContainer fixed overflow-y-scroll h-screen inset-0 bg-black bg-opacity-80 backdrop-blur-sm p-4"
      >
        <Document
          file={file}
          onLoadSuccess={onDocumentLoadSuccess}
          options={options}
          noData={<h4 className="">No file selected</h4>}
          className="document h-screen p-4 bg-mirage rounded-lg"
        >
          <Page
            renderTextLayer={false}
            renderAnnotationLayer={false}
            className="pageWrapper"
            pageNumber={pageNumber}
          />
          {/* Thumbnails */}
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
        </Document>

        <button
          className="buttonClose fixed top-12 right-12 p-2 bg-persimmon rounded-md"
          onClick={onClose}
          type="button"
        >
          <img className="buttonCloseIcon w-4 h-4" src={iconTopRight} alt="" />
        </button>
      </div>
    );
  }

  if (type === 'deckUserPreview') {
    return (
      <div
        id="container"
        role="button"
        tabIndex={0}
        onClick={handleOnClose}
        className="fixed overflow-y-scroll h-screen inset-0 bg-black bg-opacity-80 backdrop-blur-sm p-4"
      >
        <Document
          file={file}
          onLoadSuccess={onDocumentLoadSuccess}
          options={options}
          noData={<h4 className="">No file selected</h4>}
          className="document h-screen p-4 bg-mirage rounded-lg"
        >
          {/* Thumbnails */}
          <div className="bigSizePreivew">
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
        </Document>

        {/* <Button
          icon={<Logo color="white" />}
          type="submit"
          className="bg-persimmon text-white h-auto fixed bottom-12 right-auto left-auto"
          text="Save This Deck"
        /> */}

        <Button
          type="button"
          text="Save This Deck"
          icon={<Logo color="white" />}
          className="bg-persimmon text-white fixed bottom-12 left-1/2 -translate-x-1/2"
          backgroundColor="#F1511B"
          textColor="#FFF"
          onClick={onSaveDeck}
        />

        <button
          className="buttonClose fixed top-12 right-12 p-2 bg-persimmon rounded-md"
          onClick={onClose}
          type="button"
        >
          <img className="buttonCloseIcon w-4 h-4" src={iconTopRight} alt="" />
        </button>
      </div>
    );
  }
}

export default DeckPreview;
