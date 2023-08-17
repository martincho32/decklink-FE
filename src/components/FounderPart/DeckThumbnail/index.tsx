import { useEffect, useState } from 'react';
import { Document, Thumbnail, pdfjs } from 'react-pdf';
import type { PDFDocumentProxy } from 'pdfjs-dist';
import EmptyDeckPreview from '../DeckPreview/EmptyDeckPreview';

import { IDeck } from '@/types';

type PDFFile = string | File | null;

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url
).toString();

const options = {
  cMapUrl: 'cmaps/',
  standardFontDataUrl: 'standard_fonts/',
};

interface Props {
  deck: Partial<IDeck> | null;
}

function DeckThumbnail({ deck }: Props) {
  const [deckFile, setDeckFile] = useState<PDFFile | string>(null);
  const [numPages, setNumPages] = useState<number>(0);

  const onDocumentLoadSuccess = ({
    numPages: nextNumPages,
  }: PDFDocumentProxy): void => {
    setNumPages(nextNumPages);
  };

  useEffect(() => {
    setDeckFile(deck?.deckUrl as PDFFile);
  }, [deck]);

  return (
    <div className="Example ">
      <div className="Example__container">
        <div className="Example__container__document">
          <Document
            file={deckFile}
            onLoadSuccess={onDocumentLoadSuccess}
            options={options}
            noData={<EmptyDeckPreview />}
          >
            <div className="flex gap-3 overflow-x-auto my-6 p-2">
              {Array.from(new Array(numPages), (_el, index) => (
                <Thumbnail key={`page_${index + 1}`} pageNumber={index + 1} />
              ))}
            </div>
          </Document>
        </div>
      </div>
    </div>
  );
}

export default DeckThumbnail;
