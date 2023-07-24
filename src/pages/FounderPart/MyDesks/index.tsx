import { MainLayout, Button } from '../../../components';
import whiteTopRightArrow from '../../../assets/images/ArrowTopRight.svg';
import styles from './MyDesks.module.css';
import Card from '../../../components/FounderPart/MyDecks/Card';

function MyDesks() {
  return (
    <MainLayout>
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
    </MainLayout>
  );
}

export default MyDesks;
