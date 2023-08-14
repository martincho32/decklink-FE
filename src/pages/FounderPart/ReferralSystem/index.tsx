import { useState } from 'react';
import { useSnackbar } from 'notistack';
import { MainLayout } from '@/components';
import contactImg from '../../../assets/images/Contacts.png';
import copyIcon from '../../../assets/images/CopyIcon.svg';

export default function Referral() {
  const [referralIsFull] = useState<boolean>(true);
  const { enqueueSnackbar } = useSnackbar();

  const handleCopyClick = () => {
    navigator.clipboard.writeText(`fundraisingtoolbox.com/username`).then(
      () => {
        enqueueSnackbar('Url successfully copied!', {
          variant: 'success',
          autoHideDuration: 2000,
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'right',
          },
        });
      },
      (error) => {
        enqueueSnackbar(`Failed to copy. Please contact support. ${error}`, {
          variant: 'error',
          autoHideDuration: 2000,
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'right',
          },
        });
      }
    );
  };

  return (
    <MainLayout>
      <div className="flex flex-col my-12 gap-5">
        <div className="laptop:justify-between mobilev:justify-center mobilev:gap-4 flex py-7 px-8 items-center flex-wrap rounded-lg bg-persimmon shadow-md">
          <div className="laptop:items-start flex flex-col w-[40rem] gap-4 mobilev:items-center">
            <h1 className="laptop:text-left mobilev:text-center text-white text-left">
              {!referralIsFull
                ? 'Refer Founder. Get Free Deck'
                : 'Congratulations!'}
            </h1>
            <p className="laptop:text-left text-white text-xl max-w-[24rem] mobilev:text-center">
              {!referralIsFull ? (
                <>
                  Invite Founder to sign up using your link and You’ll get
                  <span className="font-black">
                    {' '}
                    +1 free pitch deck upload
                  </span>{' '}
                  in our app.
                </>
              ) : (
                "You've achieved referral excellence! Your contributions have made our community stronger."
              )}
            </p>
            {!referralIsFull ? (
              <>
                {' '}
                <div className="flex flex-col gap-2">
                  <div className="mobilev:flex-col mobileh:flex-row flex py-3 px-4 justify-between items-center gap-y-4 bg-white rounded-lg">
                    <p>fundraisingtoolbox.com/username</p>
                    <div
                      role="button"
                      tabIndex={0}
                      onClick={handleCopyClick}
                      className="flex gap-2"
                    >
                      Copy Link
                      <img src={copyIcon} alt="" />
                    </div>
                  </div>
                  <p className="mobilev:text-center text-white text-[12px] opacity-70">
                    Maximum You can get
                    <span className="font-bold">
                      {' '}
                      +5 FREE pitch decks uploads.{' '}
                    </span>
                    Referral Founder must sign up using your link.
                  </p>
                </div>
              </>
            ) : null}
          </div>
          <img className="max-w-[15rem]" src={contactImg} alt="Contacts" />
        </div>
        <div className="mobilev:flex-col-reverse desktop:flex-row flex gap-5">
          <div className="mobilev:w-full desktop:w-[70%] bg-white rounded-lg shadow-md flex flex-col gap-5 py-7 px-8 w-[70%]">
            <h2 className="text-persimmon text-[1.75rem] font-black">
              Your referrals
            </h2>
            <div className="mobilev:flex-col desktop:flex-row mobilev:gap-2 flex justify-between">
              <h3 className="text-mirage text-[1rem] font-bold">User Name</h3>
              <p>username@gmail.com</p>
            </div>
            <div className="mobilev:flex-col desktop:flex-row mobilev:gap-2 flex justify-between">
              <h3 className="text-mirage text-[1rem] font-bold">User Name</h3>
              <p>username@gmail.com</p>
            </div>
            <div className="mobilev:flex-col desktop:flex-row mobilev:gap-2 flex justify-between">
              <h3 className="text-mirage text-[1rem] font-bold">User Name</h3>
              <p>username@gmail.com</p>
            </div>
          </div>
          <div className="mobilev:w-full desktop:w-[30%] bg-white rounded-lg shadow-md flex flex-col items-center gap-1 py-10 px-10 w-[30%]">
            <h2 className="text-persimmon text-[2.5rem] font-black">
              <span className="text-[5rem]">3</span>/5
            </h2>
            <p className="max-w-[10rem] text-center">
              Free Pitch Decks Uploads Received
            </p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
