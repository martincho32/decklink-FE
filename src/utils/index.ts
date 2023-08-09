import moment from 'moment';
import { IDeckSlidesStats, IDeckView } from '@/types';

export function timestampToFormattedDate(timestamp: Date) {
  const formattedDate = moment(timestamp).format('DD MM YY');
  return formattedDate;
}

export function milisecondsToMinutesAndSeconds(milliseconds) {
  const duration = moment.duration(milliseconds);
  const minutes = duration.minutes();
  const seconds = duration.seconds();
  return `Min: ${minutes}, Sec: ${seconds}`;
}

export const getTotalViewingTime = (
  deckSlidesStats: IDeckSlidesStats[]
): number => {
  return deckSlidesStats.reduce(
    (accumulator, currentValue) => accumulator + currentValue.viewingTime,
    0
  );
};

export function getAverageTotalTime(deckViews: IDeckView[] | null): number {
  if (deckViews?.length) {
    const numberOfViews = deckViews.length;
    let averageTotalTime = 0;
    deckViews.forEach((deckView) => {
      averageTotalTime += getTotalViewingTime(deckView.deckSlidesStats);
    });
    return Math.floor(averageTotalTime / numberOfViews / 1000);
  }
  return 0;
}
