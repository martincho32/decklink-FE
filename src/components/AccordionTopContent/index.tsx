import {
  milisecondsToMinutesAndSeconds,
  timestampToFormattedDate,
} from '../../utils';

interface Props {
  email: string;
  date: any;
  totalViewingTime: any;
}
function AccordionTopContent({ email, date, totalViewingTime }: Props) {
  return (
    <div className="flex-1">
      <div className="flex justify-between">
        <div className="flex flex-col">
          <span className="text-gray-600 mb-2">User Email</span>
          <span>{email}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-gray-600 mb-2">Date of View</span>
          <span>{timestampToFormattedDate(date)}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-gray-600 mb-2">Total Viewing time</span>
          <span>{milisecondsToMinutesAndSeconds(totalViewingTime)}</span>
        </div>
      </div>
    </div>
  );
}

export default AccordionTopContent;
