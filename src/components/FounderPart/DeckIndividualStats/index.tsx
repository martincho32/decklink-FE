/* eslint-disable import/extensions */
import { AccordionTopContent, LineChart } from '../..';
import { IDeck, IDeckSlidesStats, IDeckView } from '../../../types';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/UI/Accordion';
import DeckThumbnail from '../DeckThumbnail';

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
                <AccordionTrigger className="md:flex-row gap-6">
                  {/* Here place the component with data from the viewing user */}
                  <AccordionTopContent
                    email={view.viewerEmail!}
                    date={view.createdAt}
                    totalViewingTime={getTotalViewingTime(view.deckSlidesStats)}
                  />
                </AccordionTrigger>
                <AccordionContent>
                  {/* Here place the LineChart component */}
                  <LineChart
                    labels={labels as string[] | undefined}
                    data={view.deckSlidesStats.map(
                      (slide) => slide.viewingTime / 1000
                    )}
                    deck={deck}
                  />
                  <DeckThumbnail deck={deck} />
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          );
        })}
    </div>
  );
}

export default DeckIndividualStats;
