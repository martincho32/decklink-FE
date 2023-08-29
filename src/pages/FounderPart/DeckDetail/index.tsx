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
      <div className="flex flex-col gap-12">
        <div className="w-full grid grid-cols-1 md:flex md:justify-between md:content-center xl:grid-cols-3 gap-7 justify-center place-items-center">
          <Button
            icon={<Logo switchHorizontal color="#161A20" />}
            type="button"
            text="Go Back"
            onClick={onClickGoBack}
            className="flex-row-reverse gap-2 font-bold"
          />
          <h1 className="text-[1.5rem] font-bold text-center">
            <span className="text-persimmon text-center break-all">
              {deck?.name}{' '}
            </span>
            Detailed Information
          </h1>
          <div className={`${styles.buttonContainer}`}>
            <Button
              type="button"
              text="Copy Link"
              icon={<img src={copyIcon} alt="" />}
              textColor="#F1511B"
              className="min-w-max"
              onClick={handleCopyClick}
            />
          </div>
        </div>
        <DeckAverageStats deckViews={deckViews} deck={deck} />
        <DeckIndividualStats deckViews={deckViews} deck={deck} />
      </div>
    </MainLayout>
  );
}

export default DeclkDetail;
