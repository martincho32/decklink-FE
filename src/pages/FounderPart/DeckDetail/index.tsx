import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { Button, Logo, MainLayout } from '../../../components';
import { deckService, deckViewService } from '../../../services';
import { IDeck, IDeckView } from '../../../types/index';
import DeckAverageStats from '../../../components/FounderPart/DeckAverageStats';
import DeckIndividualStats from '@/components/FounderPart/DeckIndividualStats';
import useLoading from '@/hooks/useLoading';
import Loading from '../../../components/PreloadingScreen';

function DeclkDetail() {
  const { enqueueSnackbar } = useSnackbar();

  const { id } = useParams();
  const navigate = useNavigate();

  const [deck, setDeck] = useState<IDeck | null>(null);
  const [deckViews, setDeckViews] = useState<IDeckView[] | null>(null);

  const isLoading = useLoading(async () => {
    if (!id) {
      // TODO Handle this, maybe use Snackbar to show error
      console.error('Error: There is no deck id to get.');
      navigate('/founder/decks');
    } else {
      try {
        const deckResponse = await deckService.getDeckById(id, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setDeck(deckResponse.data);
        const deckViewsResponse = await deckViewService.getDeckViewByDeckId(
          id,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );
        setDeckViews(deckViewsResponse.data);
      } catch (error: any) {
        console.error('Error: ', error.message);
      }
    }
  });

  const onClickGoBack = () => {
    navigate('/founder/decks');
  };

  const onClickCopyDeckLink = () => {
    navigator.clipboard
      .writeText(`https://www.fundraisingtoolbox.io/${deck?.customDeckLink}`)
      .then(
        () => {
          /* Resolved - text copied to clipboard successfully */
          enqueueSnackbar('You copied link', {
            variant: 'success',
            autoHideDuration: 2000,
            anchorOrigin: {
              vertical: 'top',
              horizontal: 'right',
            },
          });
        },
        (error) => {
          console.error('Failed to copy: ', error);
        }
      );
  };

  return isLoading ? (
    <Loading />
  ) : (
    <MainLayout>
      {/* Here put the top page actions new component (not yet created) */}

      <div className="w-full justify-items-center	 items-center my-12 grid grid-cols-1 md:flex md:justify-between md:content-center xl:grid-cols-3 gap-7 max-h-fit justify-center">
        <div className="flex justify-center md:justify-start gap-6">
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
        <h1 className="text-2xl leading-normal text-center">
          <span className="text-persimmon text-center">{deck?.name} </span>
          Detailed Information
        </h1>
        <Button
          type="button"
          text="Copy Link"
          icon={<Logo />}
          textColor="#F1511B"
          onClick={onClickCopyDeckLink}
        />
      </div>
      {/* One component for global deck viewing statistics */}
      <DeckAverageStats deckViews={deckViews} deck={deck} />
      {/* One component for individual deck viewing statistics */}
      <div className="flex flex-col items-center">
        <h3 className="text-2xl leading-normal text-center">
          <span className="text-persimmon text-center">{deck?.name} </span>
          Detailed Information
        </h3>
        <span className="text-mirage">For each view</span>
      </div>
      <DeckIndividualStats deckViews={deckViews} deck={deck} />
    </MainLayout>
  );
}

export default DeclkDetail;
