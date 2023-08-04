/* eslint-disable no-extra-boolean-cast */
import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { MainLayout, Button } from '../../../components';
import whiteTopRightArrow from '../../../assets/images/ArrowTopRight.svg';
import styles from './MyDecks.module.css';
import Card from '../../../components/FounderPart/MyDecks/Card';
import EmptyState from '../../../components/ItemEmptyState';
import { deckService } from '../../../services';
import { IDeck } from '../../../types';
import { AuthContext } from '@/context';

function MyDecks() {
  const { user } = useContext(AuthContext);
  const { enqueueSnackbar } = useSnackbar();

  const [deckList, setDeckList] = useState<IDeck[]>([]);
  const [refresh, setRefresh] = useState(true);

  const handleClickDelete = async (id) => {
    try {
      const { data } = await deckService.deleteDeck(id);
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

  useEffect(() => {
    deckService
      .getDecksByUserId()
      .then(({ data }) => {
        setDeckList(data);
      })
      .catch((error) => {
        console.error('Error getting decks: ', error);
        // TODO handle error;
      });
  }, [refresh]);

  return (
    <MainLayout>
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
            {deckList.map((deck) => {
              return (
                <Card
                  handleClickDelete={() => handleClickDelete(deck._id)}
                  key={deck._id}
                  deck={deck}
                />
              );
            })}
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
