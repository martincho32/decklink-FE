import { useNavigate } from 'react-router-dom';
import styles from './landing.module.css';
import Logotype from '../../assets/images/logo-on-type-bg.svg';
import orangeTopRightArrow from '../../assets/images/OrangeArrowTopRight.svg';
import graphImageFlying from '../../assets/images/graph-image-flying.png';
import graphImageStanding from '../../assets/images/graph-image-standing.png';
import { MainLayout, Button, Input } from '../../components';

function Landing() {
  const navigate = useNavigate();

  // const handleButtonLogInToVCAccount = () => {
  //   console.log('test vc');
  // };

  const handleButtonLogInToFounderAccount = () => {
    navigate('/login');
  };

  const handleInputChange = () => {};

  return (
    <MainLayout>
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
            Which <span className={styles.textOrange}>account</span> do you want
            to log in to?
          </h1>
          <div className={styles.buttonWrap}>
            {/* <Button
              type="button"
              text="Log In To VC Account"
              icon={<img src={whiteTopRightArrow} alt="Arrow" />}
              backgroundColor="#F1511B"
              textColor="#FFF"
              onClick={handleButtonLogInToVCAccount}
            /> */}
            <Button
              type="button"
              text="Log In To Founder Account"
              icon={<img src={orangeTopRightArrow} alt="Arrow" />}
              borderColor="#F1511B"
              textColor="#F1511B"
              onClick={handleButtonLogInToFounderAccount}
            />
          </div>
          <Input
            style="toggle"
            label="True or False"
            id="true-or-false"
            onChange={handleInputChange}
          />
          {/* <div>
            <Input type="default" placeholder="Enter text" label="Password" id="passwod" onChange={handleInputChange} />
            <Input type="upload" label="Upload File" id="upload" onChange={handleInputChange} />
          </div> */}
        </div>
      </div>
    </MainLayout>
  );
}

export default Landing;
