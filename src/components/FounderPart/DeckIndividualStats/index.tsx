import { AccordionTopContent, LineChart } from '../..';
import { IDeck, IDeckView } from '../../../types';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/UI/Accordion';
import './DeckIndividualStats.css';
import { getTotalViewingTime } from '@/utils';
import Button from '../../UI/Button';

interface Props {
  deck: Partial<IDeck> | null;
  deckViews: IDeckView[] | null;
}

interface IDeckViewNew extends IDeckView {
  repeated?: number;
}

function DeckIndividualStats({ deck, deckViews }: Props) {
  // Step 1: Group objects by viewerEmail
  const groupedData: Map<string | null | undefined, IDeckViewNew[]> = new Map();
  const combinedData: IDeckViewNew[] = [];
  const emailCountMap: Map<string, number> = new Map(); // To keep track of email counts

  deckViews?.forEach((obj) => {
    const { viewerEmail } = obj;
    if (viewerEmail) {
      if (!groupedData.has(viewerEmail)) {
        groupedData.set(viewerEmail, []);
      }
      groupedData.get(viewerEmail)?.push(obj);

      // Increment email count
      if (!emailCountMap.has(viewerEmail)) {
        emailCountMap.set(viewerEmail, 1);
      } else {
        emailCountMap.set(viewerEmail, emailCountMap.get(viewerEmail)! + 1);
      }
    } else {
      combinedData.push(obj);
    }
  });

  // Step 2 and 3: Combine and sum viewingTime for each slide
  groupedData.forEach((group, viewerEmail) => {
    const combinedObject: IDeckViewNew = {
      ...group[0], // You can copy other properties from the first object in the group
      deckSlidesStats: group[0].deckSlidesStats.map((slide, index) => {
        const combinedSlide = {
          ...slide,
          viewingTime: group.reduce(
            (total, obj) => total + obj.deckSlidesStats[index].viewingTime,
            0
          ),
        };
        return combinedSlide;
      }),
      repeated: emailCountMap.get(viewerEmail as string) || 1, // Add the Repeated property
    };
    combinedData.push(combinedObject);
  });

  const labels = Array.from(
    new Array(deck?.slides),
    (_el, index) => `Slide ${index + 1}`
  );

  const downloadWiewersEmail = () => {
    try {
      const viewersEmailsArray: string[] = [];
      groupedData.forEach((_group, viewerEmail) => {
        viewersEmailsArray.push(viewerEmail!);
      });
      const blob = new Blob([viewersEmailsArray.join('\n')], {
        type: 'text/plain',
      });
      const url = URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = url;
      a.download = 'viewers-email.txt';
      a.click();

      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error while downloading viewers email');
    }
  };

  return (
    <>
      <div className="flex justify-center mobileh:justify-start">
        <Button
          id="download-btn"
          type="button"
          text="Download viewers email"
          className="bg-persimmon p-2 rounded text-white"
          onClick={downloadWiewersEmail}
        />
      </div>
      <div
        className={`flex flex-col items-center ${
          !!combinedData?.length ? 'block' : 'hidden'
        }`}
      >
        <h3 className="text-2xl leading-normal text-center">
          <span className="text-persimmon text-center">{deck?.name} </span>
          Detailed Information
        </h3>
        <span className="text-mirage">For each view</span>
      </div>
      {!!combinedData?.length &&
        combinedData.map((view) => {
          return (
            <div key={view._id} className="mb-16">
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
                      totalViewingTime={getTotalViewingTime(
                        view.deckSlidesStats
                      )}
                      repeated={view.repeated}
                    />
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="mb-16 w-full">
                      <div className="w-full">
                        <LineChart
                          labels={labels as string[] | undefined}
                          data={view.deckSlidesStats.map(
                            (slide) => slide.viewingTime / 1000
                          )}
                          deck={deck}
                          pdfFile={deck?.deckUrl}
                        />
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          );
        })}
    </>
  );
}

export default DeckIndividualStats;
