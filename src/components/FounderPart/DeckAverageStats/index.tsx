/* eslint-disable no-unsafe-optional-chaining */
import { useEffect, useState } from 'react';
import { LineChart } from '../..'; // Replace this with the correct path to your LineChart component
import { IDeck, IDeckSlidesStats, IDeckView } from '../../../types';
import './DeckAverageStats.css';

interface Props {
  deck: Partial<IDeck> | null;
  deckViews: IDeckView[] | null;
}

function DeckAverageStats({ deck, deckViews }: Props) {
  const [pdfFile, setPdfFile] = useState<string | null>(null);
  useEffect(() => {
    setPdfFile(deck?.deckUrl || null);
  }, [deck]);

  const labels = Array.from(
    new Array(deck?.slides),
    (_el, index) => `Slide ${index + 1}`
  );

  console.log(labels);

  const rawData =
    deckViews &&
    deckViews.reduce((accumulator, currentValue, currentIndex) => {
      return {
        ...accumulator,
        [currentIndex]: currentValue.deckSlidesStats,
      };
    }, {});

  console.log(rawData);

  const auxMockedData: number[] = [];
  labels?.forEach((_slideName, index) => {
    (Object.values(rawData!) as [][]).forEach((slide: IDeckSlidesStats[]) => {
      if (auxMockedData[index]) {
        auxMockedData[index] += slide[index]?.viewingTime;
      } else {
        auxMockedData[index] = slide[index]?.viewingTime;
      }
    });
  });

  console.log(auxMockedData);

  // this will be the view time in seconds of each slide
  // TODO maybe do this but in the last iteration of labels.forEach
  const data = auxMockedData.map(
    (totalMiliseconds) =>
      totalMiliseconds / 1000 / Object.values(rawData!).length
  );

  console.log(data);

  return (
    <div>
      <span className="text-xl text-mirage">
        Average time (in seconds) spent viewing each slide by all people
      </span>
      <div className="mb-16 w-full">
        <div className="w-full">
          <LineChart
            labels={labels as string[]}
            data={data}
            deck={deck}
            pdfFile={pdfFile}
          />
        </div>
      </div>
    </div>
  );
}

export default DeckAverageStats;
