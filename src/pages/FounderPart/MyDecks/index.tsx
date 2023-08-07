/* eslint-disable no-extra-boolean-cast */
import * as React from 'react';
import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { MainLayout, Button, DeckPreview } from '../../../components';
import whiteTopRightArrow from '../../../assets/images/ArrowTopRight.svg';
import styles from './MyDecks.module.css';
import Card from '../../../components/FounderPart/MyDecks/Card';
import EmptyState from '../../../components/ItemEmptyState';
import { deckService } from '../../../services';
import { IDeck } from '../../../types';
import Loading from '../../../components/PreloadingScreen';

// Import the useLoading hook
import useLoading from '../../../hooks/useLoading';
import { AuthContext } from '@/context';

const options = {
  cMapUrl: 'cmaps/',
  standardFontDataUrl: 'standard_fonts/',
};

function MyDecks() {
  const [previewPickDeckSlide, setPreviewPickDeckSlide] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);

  const handleOnClosePitchDeckSlidePreview = () => {
    document.body.style.overflow = 'auto';
    setPreviewPickDeckSlide(false);
  };

  const { user } = useContext(AuthContext);
  const { enqueueSnackbar } = useSnackbar();

  const [deckList, setDeckList] = useState<IDeck[]>([]);
  const [refresh, setRefresh] = useState(true);

  const handleClickDelete = async (id) => {
    try {
      const { data } = await deckService.deleteDeck(id, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (data) {
        setRefresh(!refresh);
      } else {
        throw new Error('Deck not found! Please contact support.');
      }
    } catch (error: any) {
      console.error('Error deleting deck: ', error);
      enqueueSnackbar(`Error deleting deck: Error: ${error.message}`, {
        variant: 'error',
        autoHideDuration: 10000,
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'right',
        },
      });
    }
  };

  // Use the useLoading hook with the actual backend request function
  const isLoading = useLoading(() => {
    return deckService
      .getDecksByUserId({
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then(({ data }) => {
        setDeckList(data);
      })
      .catch((error) => {
        console.error('Error getting decks: ', error);
        // TODO handle error;
      });
  });

  return isLoading ? (
    <Loading />
  ) : (
    <MainLayout>
      {/* Display the loading screen if the backend request is still loading */}
      {!!deckList.length ? (
        <div className={styles.myDesksWrapper}>
          <div className={styles.pageNavigation}>
            <h2 className={styles.title}>
              Hi {user?.firstName}! Here is your created decks
            </h2>
            <Link
              className={`${styles.link} hover:no-underline`}
              to="/founder/deck/create"
            >
              <Button
                type="button"
                text="Create New Deck"
                icon={<img src={whiteTopRightArrow} alt="Arrow" />}
                backgroundColor="#F1511B"
                textColor="#FFF"
              />
            </Link>
          </div>
          <div className={styles.decksBlock}>
            {deckList.map((deck) => (
              <React.Fragment key={deck._id}>
                <Card
                  onClick={(event: React.MouseEvent<HTMLDivElement>) => {
                    if (event.target instanceof HTMLDivElement) {
                      document.body.style.overflow = 'hidden';
                      setPreviewPickDeckSlide(true);
                    }
                  }}
                  deck={deck}
                  handleClickDelete={() => handleClickDelete(deck._id)}
                />
                {previewPickDeckSlide && (
                  <DeckPreview
                    type="deckUserPreview"
                    onClose={handleOnClosePitchDeckSlidePreview}
                    pageNumber={pageNumber}
                    file={deck.deckUrl}
                    options={options}
                    numPages={deck.slides}
                    setPreviewPickDeckSlide={setPreviewPickDeckSlide}
                    setPageNumber={setPageNumber}
                    deckId={null}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      ) : (
        <EmptyState
          title="Zero pitchdecks at the moment."
          subtitle="Why not be the first to create one and kickstart the fun?"
          button={
            <Link
              className={`${styles.link} hover:no-underline`}
              to="/founder/deck/create"
            >
              <Button
                type="button"
                text="Create New Deck"
                icon={<img src={whiteTopRightArrow} alt="Arrow" />}
                backgroundColor="#F1511B"
                textColor="#FFF"
              />
            </Link>
          }
        />
      )}
    </MainLayout>
  );
}

export default MyDecks;
