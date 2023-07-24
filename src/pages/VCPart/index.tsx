import Button from '../../UI/Button';
import { MainLayout } from '../../components/layouts';
import whiteTopRightArrow from '../../assets/images/ArrowTopRight.svg';
import styles from './MyDesks.module.css';
import DeckCard from '../../components/VCPart/DeckCard';

function MyDecks() {
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
          {/* change keys to autofilled later */}
          <DeckCard key={1} />
          <DeckCard key={2} />
          <DeckCard key={3} />
          <DeckCard key={4} />
        </div>
      </div>
    </MainLayout>
  );
}

export default MyDecks;
