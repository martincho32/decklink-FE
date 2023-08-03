import React, { useEffect, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { LineChart } from '../..'; // Replace this with the correct path to your LineChart component
import { IDeck, IDeckSlidesStats, IDeckView } from '../../../types';
import DeckThumbnail from '../DeckThumbnail';
import './DeckAverageStats.css';

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
  deckViews: IDeckView[] | null;
}

function DeckAverageStats({ deck, deckViews }: Props) {
  const [numPages, setNumPages] = useState<number>(0);
  const [pdfFile, setPdfFile] = useState<string | null>(null);

  useEffect(() => {
    setPdfFile(deck?.deckUrl || null);
  }, [deck]);

  const labels =
    deckViews &&
    deckViews[0].deckSlidesStats.map((slide) => {
      return `Slide ${slide.slideNumber}`;
    });

  const rawData =
    deckViews &&
    deckViews.reduce((accumulator, currentValue, currentIndex) => {
      return {
        ...accumulator,
        [currentIndex]: currentValue.deckSlidesStats,
      };
    }, {});

  const auxMockedData: number[] = [];
  labels?.forEach((_slideName, index) => {
    (Object.values(rawData!) as [][]).forEach((slide: IDeckSlidesStats[]) => {
      if (auxMockedData[index]) {
        auxMockedData[index] += slide[index].viewingTime;
      } else {
        auxMockedData[index] = slide[index].viewingTime;
      }
    });
  });

  // this will be the view time in seconds of each slide
  // TODO maybe do this but in the last iteration of labels.forEach
  const data = auxMockedData.map(
    (totalMiliseconds) =>
      totalMiliseconds / 1000 / Object.values(rawData!).length
  );

  const onDocumentLoadSuccess = ({
    numPages: nextNumPages,
  }: pdfjs.PDFDocumentProxy) => {
    setNumPages(nextNumPages);
  };

  return (
    <div>
      <span className="text-xl text-mirage">
        Average time (in seconds) spent viewing each slide by all people
      </span>
      <div className="mb-16 w-full overflow-x-auto">
        <div className="min-w-min">
          <LineChart
            labels={labels as string[] | undefined}
            data={data}
            deck={deck}
          />
          <Document
            file={pdfFile}
            onLoadSuccess={onDocumentLoadSuccess}
            options={options}
            noData={<DeckThumbnail deck={deck} />}
            className="averageStatsPreview w-full"
          >
            <div className="flex gap-2 overflow-hidden my-6 p-2 w-full">
              {Array.from(new Array(numPages), (_el, index) => (
                <Page
                  renderTextLayer={false}
                  renderAnnotationLayer={false}
                  key={`page_${index + 1}`}
                  pageNumber={index + 1}
                  className="slidesPreview"
                />
              ))}
            </div>
          </Document>
        </div>
      </div>
    </div>
  );
}

export default DeckAverageStats;
