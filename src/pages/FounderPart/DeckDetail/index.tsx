import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import { Button, Logo, MainLayout } from '../../../components';
import { deckService, deckViewService } from '../../../services';
import { IDeck, IDeckView } from '../../../types/index';
import DeckAverageStats from '../../../components/FounderPart/DeckAverageStats';
import DeckIndividualStats from '@/components/FounderPart/DeckIndividualStats';
import useLoading from '@/hooks/useLoading';
import Loading from '../../../components/PreloadingScreen';
import copyIcon from '../../../assets/images/CopyIcon.svg';

import styles from './Detail.module.css';

function DeclkDetail() {
  const { enqueueSnackbar } = useSnackbar();

  const { id } = useParams();
  const navigate = useNavigate();

  const [deck, setDeck] = useState<IDeck | null>(null);
  const [deckViews, setDeckViews] = useState<IDeckView[] | null>([]);
  const [isPopupVisible, setPopupVisible] = useState(false);

  const handleError = (error: Error | string) => {
    if (axios.isAxiosError(error)) {
      enqueueSnackbar(error.response?.data?.message, {
        variant: 'error',
        autoHideDuration: 10000,
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'right',
        },
      });
    } else {
      enqueueSnackbar((error as Error).message ?? error, {
        variant: 'error',
        autoHideDuration: 10000,
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'right',
        },
      });
    }
  };

  const isLoading = useLoading(async () => {
    if (!id) {
      // TODO Handle this, maybe use Snackbar to show error
      navigate('/founder/decks');
    } else {
      try {
        const deckResponse = await deckService.getDeckById(id, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setDeck(deckResponse.data);
        const { data } = await deckViewService.getDeckViewByDeckId(id, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        if (!data.length) {
          enqueueSnackbar(`You don't have any views yet.`, {
            variant: 'info',
            autoHideDuration: 3000,
            anchorOrigin: {
              vertical: 'top',
              horizontal: 'right',
            },
          });
        }
        setDeckViews(data);
      } catch (error: any) {
        console.error('Error: ', error);
        handleError(error);
      }
    }
  });

  const onClickGoBack = () => {
    navigate('/founder/decks');
  };

  const handleMouseEnter = () => {
    setPopupVisible(true);
  };

  const handleMouseLeave = () => {
    setPopupVisible(false);
  };
  const handleCopyClick = () => {
    navigator.clipboard
      .writeText(
        `https://www.fundraisingtoolbox.io/preview/${deck?.customDeckLink}`
      )
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

  return isLoading ? (
    <Loading />
  ) : (
    <MainLayout>
      {/* Here put the top page actions new component (not yet created) */}

      <div className="w-full justify-items-center	 items-center my-12 grid grid-cols-1 md:flex md:justify-between md:content-center xl:grid-cols-3 gap-7 max-h-fit justify-center">
        <div className="flex justify-center md:justify-start gap-4 min-w-max">
          <Button
            icon={<Logo color="white" />}
            type="button"
            className="bg-persimmon -rotate-90 p-4"
            onClick={onClickGoBack}
          />
          <span className="self-center text-xl leading-normal justify-center">
            Go Back
          </span>
        </div>
        <h1 className="text-2xl leading-normal text-center break-all">
          <span className="text-persimmon text-center break-all">
            {deck?.name}{' '}
          </span>
          Detailed Information
        </h1>
        <div
          role="button"
          tabIndex={0}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className={`${styles.buttonContainer}`}
        >
          <Button
            type="button"
            text="Copy Link"
            icon={<img src={copyIcon} alt="" />}
            textColor="#F1511B"
            className="min-w-max"
            onClick={handleCopyClick}
          />
          {isPopupVisible && (
            <div
              className={`${styles.popup} right-0 left-auto`}
            >{`fundraisingtoolbox.io/preview/${deck?.customDeckLink}`}</div>
          )}
        </div>
      </div>
      <DeckAverageStats deckViews={deckViews} deck={deck} />
      <DeckIndividualStats deckViews={deckViews} deck={deck} />
    </MainLayout>
  );
}

export default DeclkDetail;
