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
        <div className="md:items-start  flex flex-col items-center gap-2 justify-between grow">
          <span className="text-gray-600 md:border-solid md:border-b md:border-mirage md:pb-2 font-normal">
            User Email
          </span>
          <span className="">{email}</span>
        </div>
        <div className="md:items-start  flex flex-col items-center gap-2 justify-between grow">
          <span className="text-gray-600 md:border-solid md:border-b md:border-mirage md:pb-2 font-normal">
            Date of View
          </span>
          <span className="">{timestampToFormattedDate(date)}</span>
        </div>
        <div className="md:items-end  flex flex-col items-center gap-2 justify-between grow">
          <span className="md:text-end text-start text-gray-600 md:border-solid md:border-b md:border-mirage md:pb-2 font-normal">
            Total Viewing time
          </span>
          <span className="text-end">
            {milisecondsToMinutesAndSeconds(totalViewingTime)}
          </span>
        </div>
      </div>
    </div>
  );
}

export default AccordionTopContent;
