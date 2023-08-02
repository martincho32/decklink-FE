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
    <div className="flex-1 grow-2.5 lg:pr-5">
      <div className="flex flex-col gap-4 md:gap-0 md:flex-row justify-between">
        <div className="flex md:flex-col justify-between grow">
          <span className="text-gray-600 md:border-solid md:border-b md:border-mirage md:pb-4 font-normal">
            User Email
          </span>
          <span className="md:pt-4">{email}</span>
        </div>
        <div className="flex md:flex-col justify-between grow">
          <span className="text-gray-600 md:border-solid md:border-b md:border-mirage md:pb-4 font-normal">
            Date of View
          </span>
          <span className="md:pt-4">{timestampToFormattedDate(date)}</span>
        </div>
        <div className="flex md:flex-col justify-between grow">
          <span className="text-gray-600 md:border-solid md:border-b md:border-mirage md:pb-4 font-normal text-end">
            Total Viewing time
          </span>
          <span className="md:pt-4 text-end">
            {milisecondsToMinutesAndSeconds(totalViewingTime)}
          </span>
        </div>
      </div>
    </div>
  );
}

export default AccordionTopContent;
