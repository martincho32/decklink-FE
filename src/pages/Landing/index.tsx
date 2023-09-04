import { useContext } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import styles from './landing.module.css';
import { Logo, LogoAndWordmarkIcon } from '@/components/icons';
import { GraphFlyingImage, GraphStandingImage } from '@/assets/images';
import { MainLayout, Button } from '../../components';
import { AuthContext } from '../../context';

function Landing() {
  const navigate = useNavigate();

  const { isLoggedIn } = useContext(AuthContext);

  const handleButtonLogInToFounderAccount = () => {
    navigate('/login');
  };

  return (
    <MainLayout>
      {!isLoggedIn ? (
        <div className={styles.blockContainer}>
          <img
            className={styles.imgTopRight}
            src={GraphFlyingImage}
            alt="graphImageStanding"
          />
          <img
            className={styles.imgBotLeft}
            src={GraphStandingImage}
            alt="graphImageStanding"
          />
          <div className={styles.mainContent}>
            <LogoAndWordmarkIcon />
            <h1 className={styles.h1}>
              Which <span className={styles.textOrange}>account</span> do you
              want to log in to?
            </h1>
            <div className={styles.buttonWrap}>
              <Button
                type="button"
                text="Log In To Founder Account"
                icon={<Logo color="var(--primary-color)" />}
                borderColor="var(--primary-color)"
                textColor="var(--white-color)"
                onClick={handleButtonLogInToFounderAccount}
              />
            </div>
          </div>
        </div>
      ) : (
        <Navigate to="/founder/decks" />
      )}
    </MainLayout>
  );
}

export default Landing;
