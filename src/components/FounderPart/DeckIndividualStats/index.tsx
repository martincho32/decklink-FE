import { Document, Page, pdfjs } from 'react-pdf';
import { AccordionTopContent, LineChart } from '../..';
import { IDeck, IDeckSlidesStats, IDeckView } from '../../../types';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/UI/Accordion';
import DeckThumbnail from '../DeckThumbnail';
import './DeckIndividualStats.css';

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

function DeckIndividualStats({ deck, deckViews }: Props) {
  const labels =
    deckViews &&
    deckViews[0].deckSlidesStats.map((slide) => {
      return `Slide ${slide.slideNumber}`;
    });

  const getTotalViewingTime = (deckSlidesStats: IDeckSlidesStats[]): any => {
    return deckSlidesStats.reduce(
      (accumulator, currentValue) => accumulator + currentValue.viewingTime,
      0
    );
  };

  return (
    <div className="mb-16">
      {deckViews &&
        deckViews.map((view) => {
          return (
            <Accordion
              key={view._id}
              type="single"
              collapsible
              className="my-6"
            >
              <AccordionItem
                value="item-1"
                className="border-solid rounded border-mirage p-5"
              >
                <AccordionTrigger className="md:flex-row gap-6 justify-center lg:justify-end border-t border-t-persimmon border-solid mt-4 pt-4 lg:mt-0 lg:pt-0 lg:border-none">
                  <AccordionTopContent
                    email={view.viewerEmail!}
                    date={view.createdAt}
                    totalViewingTime={getTotalViewingTime(view.deckSlidesStats)}
                  />
                </AccordionTrigger>
                <AccordionContent>
                  <div className="mb-16 w-full overflow-x-auto">
                    <div className="min-w-min">
                      <LineChart
                        labels={labels as string[] | undefined}
                        data={view.deckSlidesStats.map(
                          (slide) => slide.viewingTime / 1000
                        )}
                        deck={deck}
                      />
                      <Document
                        file={deck?.deckUrl}
                        // onLoadSuccess={onDocumentLoadSuccess}
                        options={options}
                        noData={<DeckThumbnail deck={deck} />}
                        className="averageStatsPreview w-full"
                      >
                        <div className="flex gap-2 overflow-hidden my-6 p-2 w-full">
                          {Array.from(new Array(deck?.slides), (_el, index) => (
                            <Page
                              renderTextLayer={false}
                              renderAnnotationLayer={false}
                              key={`page_${index + 1}`}
                              pageNumber={index + 1}
                              className="previewSlides"
                            />
                          ))}
                        </div>
                      </Document>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          );
        })}
    </div>
  );
}

export default DeckIndividualStats;
