/* eslint-disable @typescript-eslint/dot-notation */

import { LineChart } from '../..';
import { IDeck, IDeckSlidesStats, IDeckView } from '../../../types';
import DeckThumbnail from '../DeckThumbnail';

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

  return (
    <div className="mb-16">
      <span className="text-xl text-mirage">
        Average time (in seconds) spent viewing each slide by all people
      </span>
      <LineChart
        labels={labels as string[] | undefined}
        data={data}
        deck={deck}
      />
      <DeckThumbnail deck={deck} />
    </div>
  );
}

export default DeckAverageStats;
