import {
  FirstDummyPitchDeckSlide,
  SecondDummyPitchDeckSlide,
  ThirdDummyPitchDeckSlide,
  ForthDummyPitchDeckSlide,
  FifthDummyPitchDeckSlide,
} from '@/components/icons';
import styles from './EmptyDeckPreview.module.css';

function EmptyDeckPreview() {
  return (
    <div className={styles.dummySlidesWrapper}>
      <FirstDummyPitchDeckSlide />
      <SecondDummyPitchDeckSlide />
      <ThirdDummyPitchDeckSlide />
      <ForthDummyPitchDeckSlide />
      <FifthDummyPitchDeckSlide />
    </div>
  );
}

export default EmptyDeckPreview;
