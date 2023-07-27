import { useState } from 'react';
import { MainLayout, Button } from '../../../components';
import whiteTopRightArrow from '../../../assets/images/ArrowTopRight.svg';
import styles from './MyDecks.module.css';
import Card from '../../../components/FounderPart/MyDecks/Card';
import EmptyState from '../../../components/ItemEmptyState';

function MyDecks() {
  const [dataIsLoaded, setDataIsLoaded] = useState<boolean>(false);

  return (
    <MainLayout>
      {dataIsLoaded ? (
        <div className={styles.myDesksWrapper}>
          <div className={styles.pageNavigation}>
            <h2 className={styles.title}>
              <span>Hi Ben!</span> Here is your created decks
            </h2>
            <Button
              type="button"
              text="Create New Deck"
              icon={<img src={whiteTopRightArrow} alt="Arrow" />}
              backgroundColor="#F1511B"
              textColor="#FFF"
            />
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
            <Button
              type="button"
              text="Create New Deck"
              icon={<img src={whiteTopRightArrow} alt="Arrow" />}
              backgroundColor="#F1511B"
              textColor="#FFF"
            />
          }
        />
      )}
    </MainLayout>
  );
}

export default MyDecks;
