/* eslint-disable @typescript-eslint/dot-notation */

import { LineChart } from '../..';
import { IDeck, IDeckSlidesStats, IDeckView } from '../../../types';

interface Props {
  deck: Partial<IDeck> | null;
  deckViews: IDeckView[] | null;
}

function DeckAverageStats({ deck, deckViews }: Props) {
  const labels =
    deckViews &&
    deckViews[0].deckSlidesStats.map((slide) => {
      return `Slide ${slide.slideNumber}`;
    });

  const data =
    deckViews &&
    deckViews.reduce((accumulator, currentValue, currentIndex) => {
      return {
        ...accumulator,
        [currentIndex]: currentValue.deckSlidesStats,
      };
    }, {});

  const auxMockedData: number[] = [];
  labels?.forEach((_slideName, index) => {
    (Object.values(data!) as [][]).forEach((slide: IDeckSlidesStats[]) => {
      if (auxMockedData[index]) {
        auxMockedData[index] += slide[index].viewingTime;
      } else {
        auxMockedData[index] = slide[index].viewingTime;
      }
    });
  });
  // this will be the view time in seconds of each slide
  // TODO maybe do this but in the last iteration of labels.forEach
  const mockedData = auxMockedData.map(
    (totalMiliseconds) => totalMiliseconds / 1000 / Object.values(data!).length
  );

  return (
    <>
      <span className="text-xl text-mirage">
        Average time spent viewing each slide by all people
      </span>
      <LineChart
        labels={labels as string[] | undefined}
        mockedData={mockedData}
        deck={deck}
      />
      {/* Here put list of deck-view cards for each user that viewed the deck */}
    </>
  );
}

export default DeckAverageStats;
