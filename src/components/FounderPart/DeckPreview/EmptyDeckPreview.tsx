import slide1 from '../../../assets/images/First Dummy Slide.svg';
import slide2 from '../../../assets/images/Second Dummy Slide.svg';
import slide3 from '../../../assets/images/Third Dummy Slide.svg';
import slide4 from '../../../assets/images/Forth Dummy Slide.svg';
import slide5 from '../../../assets/images/Fifth Dummy Slide.svg';
import styles from './EmptyDeckPreview.module.css';

function EmptyDeckPreview() {
  return (
    <div className={styles.dummySlidesWrapper}>
      <img className={styles.dummyImg} src={slide1} alt="Dummy Slide 1" />
      <img className={styles.dummyImg} src={slide2} alt="Dummy Slide 2" />
      <img className={styles.dummyImg} src={slide3} alt="Dummy Slide 3" />
      <img className={styles.dummyImg} src={slide4} alt="Dummy Slide 4" />
      <img className={styles.dummyImg} src={slide5} alt="Dummy Slide 5" />
    </div>
  );
}

export default EmptyDeckPreview;
