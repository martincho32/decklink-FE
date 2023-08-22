import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import { Button, Logo, MainLayout } from '@/components';
import contactImg from '../../../assets/images/Contacts.png';
import copyIcon from '../../../assets/images/CopyIcon.svg';
import { AuthContext } from '@/context';
import { userService, upgradeService } from '@/services';
import { IUpgrade, IUser } from '@/types';

export default function Referral() {
  const [referralIsFull] = useState<boolean>(false);
  const { enqueueSnackbar } = useSnackbar();
  const { user } = useContext(AuthContext);
  const [userDetail, setUserDetail] = useState<IUser>({});
  const [upgradeList, setUpgradeList] = useState<IUpgrade[]>([]);
  const [refreshPage, setRefreshPage] = useState(false);

  const axiosConfig = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  };

  const handleError = (error: Error | string) => {
    if (axios.isAxiosError(error)) {
      enqueueSnackbar(error.response?.data?.message, {
        variant: 'error',
        autoHideDuration: 5000,
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'right',
        },
      });
    } else {
      enqueueSnackbar((error as Error).message ?? error, {
        variant: 'error',
        autoHideDuration: 5000,
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'right',
        },
      });
    }
  };

  const handleCopyClick = () => {
    navigator.clipboard
      .writeText(`fundraisingtoolbox.io/signup?referredBy=${user?.email}`)
      .then(
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
          enqueueSnackbar(error.message, {
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

  const handleBuyUpgradeClick = (item: IUpgrade) => {
    upgradeService
      .redeemUpgradeItem(item, axiosConfig)
      .then(() => {
        setRefreshPage(!refreshPage);
        enqueueSnackbar('Upgrade successfully redeemed!', {
          variant: 'success',
          autoHideDuration: 2000,
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'right',
          },
        });
      })
      .catch((error) => {
        handleError(error);
      });
  };

  useEffect(() => {
    if (user?._id) {
      userService
        .getUserDetail(user?._id as string, axiosConfig)
        .then(({ data }) => {
          setUserDetail(data);
        });
    }
    upgradeService
      .getAllUpgrades({
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then(({ data }) => {
        setUpgradeList(data);
      });
  }, [user, refreshPage]);

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
                  Invite Founder to sign up using your link and you’ll get
                  <span className="font-black">
                    {' '}
                    +5 free pitch deck upload
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
                  <div
                    role="button"
                    tabIndex={0}
                    onClick={handleCopyClick}
                    className="mobilev:flex-col mobileh:flex-row flex py-3 px-4 justify-between items-center gap-y-4 bg-white rounded-lg"
                  >
                    <p>fundraisingtoolbox.io/signup?referredBy={user?.email}</p>
                    <div className="flex gap-2">
                      <img src={copyIcon} alt="" />
                    </div>
                  </div>
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
            {userDetail && !!userDetail.referredUserList?.length ? (
              userDetail.referredUserList?.map((_user) => (
                <div
                  key={_user.email}
                  className="mobilev:flex-col desktop:flex-row mobilev:gap-2 flex justify-between"
                >
                  <h3 className="text-mirage text-[1rem] font-bold">
                    {_user.firstName}
                  </h3>
                  <p>{_user.email}</p>
                </div>
              ))
            ) : (
              <h3 className="font-semibold">No referred users yet</h3>
            )}
          </div>
          <div className="mobilev:w-full desktop:w-[30%] bg-white rounded-lg shadow-md flex flex-col items-center gap-1 py-10 px-10 w-[30%]">
            <h2 className="text-persimmon text-[5rem] font-black">
              {userDetail.totalTokens}
            </h2>
            <p className="max-w-[10rem] text-center">
              Upgrade tokens on your account
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="text-persimmon text-[2.25rem] font-black">Upgrades</h2>
          <div className="laptop:flex tablet:flex-row gap-5 mobilev:flex-col">
            {!!upgradeList.length &&
              upgradeList.map((upgrade) => (
                <div
                  key={upgrade.code}
                  className="mobilev:w-full desktop:w-[30%] bg-white rounded-lg shadow-md flex flex-col gap-5 py-10 px-10 w-[30%]"
                >
                  <div className="flex flex-col gap-3">
                    <h2 className="text-persimmon text-[1.75rem] font-black">
                      {upgrade.name}
                    </h2>
                    <p className="">{upgrade.description}</p>
                  </div>
                  <div className="flex mobilev:flex-col  mobilev:gap-2 tablet:flex-row tablet:justify-between">
                    <Button
                      type="button"
                      text="Buy Upgrade"
                      icon={<Logo color="#FFFFFF" width="10" height="11" />}
                      backgroundColor="#F1511B"
                      textColor="#FFF"
                      onClick={() => {
                        handleBuyUpgradeClick(upgrade);
                      }}
                      className="py-3 w-full relative z-10 max-w-max"
                    />
                    <div className="mobilev:items-start flex flex-col tablet:items-end justify-between">
                      <p className="font-bold">Price:</p>
                      <p>{upgrade.redeemPrice} referral token</p>
                    </div>
                  </div>
                </div>
              ))}
            <div className="mobilev:w-full desktop:w-[30%] bg-white rounded-lg shadow-md justify-center opacity-50 flex flex-col items-center gap-1 py-10 px-10 w-[30%]">
              <h2 className="text-persimmon text-center text-[1.75rem] font-black">
                Later we will add more upgrades!
              </h2>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
