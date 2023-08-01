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
        <div className="flex flex-col grow">
          <span
            style={{ borderBottom: '1px solid' }}
            className="text-gray-600 border-mirage pb-4"
          >
            User Email
          </span>
          <span className="pt-4">{email}</span>
        </div>
        <div className="flex flex-col grow">
          <span
            style={{ borderBottom: '1px solid' }}
            className="text-gray-600 border-mirage pb-4"
          >
            Date of View
          </span>
          <span className="pt-4">{timestampToFormattedDate(date)}</span>
        </div>
        <div className="flex flex-col grow">
          <span
            style={{ borderBottom: '1px solid' }}
            className="text-gray-600 border-mirage pb-4"
          >
            Total Viewing time
          </span>
          <span className="pt-4">
            {milisecondsToMinutesAndSeconds(totalViewingTime)}
          </span>
        </div>
      </div>
    </div>
  );
}

export default AccordionTopContent;
