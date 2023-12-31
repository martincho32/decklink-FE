import { useContext } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import styles from './landing.module.css';
import Logotype from '../../assets/images/logo-on-type-bg.svg';
import orangeTopRightArrow from '../../assets/images/OrangeArrowTopRight.svg';
import graphImageFlying from '../../assets/images/graph-image-flying.png';
import graphImageStanding from '../../assets/images/graph-image-standing.png';
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
            src={graphImageFlying}
            alt="graphImageStanding"
          />
          <img
            className={styles.imgBotLeft}
            src={graphImageStanding}
            alt="graphImageStanding"
          />
          <div className={styles.mainContent}>
            <img className={styles.logotype} src={Logotype} alt="Logotype" />
            <h1 className={styles.h1}>
              Which <span className={styles.textOrange}>account</span> do you
              want to log in to?
            </h1>
            <div className={styles.buttonWrap}>
              <Button
                type="button"
                text="Log In To Founder Account"
                icon={<img src={orangeTopRightArrow} alt="Arrow" />}
                borderColor="#F1511B"
                textColor="#F1511B"
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
