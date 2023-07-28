import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MainLayout, Button } from '../../../components';
import whiteTopRightArrow from '../../../assets/images/ArrowTopRight.svg';
import styles from './MyDecks.module.css';
import Card from '../../../components/FounderPart/MyDecks/Card';
import EmptyState from '../../../components/ItemEmptyState';

function MyDecks() {
  const [dataIsLoaded, setDataIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    // TODO Fetch data from API here
    // Pass data as props to cards
  }, []);

  return (
    <MainLayout>
      {dataIsLoaded ? (
        <div className={styles.myDesksWrapper}>
          <div className={styles.pageNavigation}>
            <h2 className={styles.title}>
              <span>Hi Ben!</span> Here is your created decks
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
            <Card />
            <Card />
            <Card />
            <Card />
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
