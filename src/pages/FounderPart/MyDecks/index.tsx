/* eslint-disable no-extra-boolean-cast */
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MainLayout, Button } from '../../../components';
import whiteTopRightArrow from '../../../assets/images/ArrowTopRight.svg';
import styles from './MyDecks.module.css';
import Card from '../../../components/FounderPart/MyDecks/Card';
import EmptyState from '../../../components/ItemEmptyState';
import { deckService } from '../../../services';
import { Deck } from '../../../types';

function MyDecks() {
  // const [dataIsLoaded, setDataIsLoaded] = useState<boolean>(false);
  const [deckList, setDeckList] = useState<Deck[]>([]);

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
  }, []);

  return (
    <MainLayout>
      {!!deckList.length ? (
        <div className={styles.myDesksWrapper}>
          <div className={styles.pageNavigation}>
            <h2 className={styles.title}>Hi! Here is your created decks</h2>
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
              return <Card key={deck._id} deck={deck} />;
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
