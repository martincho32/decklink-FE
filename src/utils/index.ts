import moment from 'moment';

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
