import { Page, Document, Thumbnail } from 'react-pdf'; /** File library */
import iconTopRight from '../../../assets/images/ArrowTopRight.svg';
import './DeckPreview.css';

function DeckPreview({
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

  if (!visible) return null;

  return (
    <div
      id="container"
      role="button"
      tabIndex={0}
      onClick={handleOnClose}
      className="fixed h-screen inset-0 bg-black bg-opacity-80 backdrop-blur-sm p-4"
    >
      <Document
        file={file}
        onLoadSuccess={onDocumentLoadSuccess}
        options={options}
        noData={<h4 className="">No file selected</h4>}
        className="document h-screen p-4 bg-mirage rounded-lg"
      >
        <Page className="pageWrapper" pageNumber={pageNumber} />
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

export default DeckPreview;
