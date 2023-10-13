import { Link } from 'react-router-dom';
import { Button, Logo, MainLayout } from '../../components';
import styles from './NotFound.module.css';
import { Error404Image } from '@/assets/images';

export default function ErrorPage() {
  return (
    <MainLayout>
      <div id="error-page" className={styles.errorWrapper}>
        <img className={styles.errorImg} src={Error404Image} alt="" />
        <div className={styles.errorTextAndButtonWrapper}>
          <div className={styles.errorTextWrapper}>
            <h1 className={styles.errorTitle}>
              You lost in the Bermuda Triangle of the Internet!
            </h1>
            <h2 className={styles.errorSubtitle}>
              Well, this is awkward, the page you were trying to view does not
              exist.
            </h2>
          </div>
          <Link className={styles.button} to="/founder/decks">
            <Button
              type="button"
              text="Get yourself home"
              icon={<Logo />}
              textColor="var(--primary-color)"
            />
          </Link>
        </div>
      </div>
    </MainLayout>
  );
}
