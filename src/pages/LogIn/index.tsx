import { Link } from 'react-router-dom';
import Input from '../../UI/Input';
import Button from '../../UI/Button';
import whiteTopRightArrow from '../../assets/images/ArrowTopRight.svg';
import styles from './LogIn.module.css';
import graphImageFlying from '../../assets/images/graph-image-flying.png';
import graphImageStanding from '../../assets/images/graph-image-standing.png';
import { MainLayout } from '../../components/layouts';

function LogIn({ title }: { title: string }) {
  console.log('title: ', title);
  const handleInputChange = () => {
    console.log('testing');
  };

  const handleButtonLogInToVCAccount = () => {
    console.log('testing');
  };

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
        <div className={styles.formWrapper}>
          {/* set title from props here */}
          <h1 className={styles.headingStyle}>Log In To VC Account</h1>
          <form className={styles.form} action="submit">
            <Input
              style="default"
              type="email"
              placeholder="example@gmail.com"
              label="Your Email"
              id="email"
              onChange={handleInputChange}
            />
            <Input
              style="password"
              placeholder="******"
              label="Password"
              id="passwod"
              onChange={handleInputChange}
            />
            <Input
              style="password"
              placeholder="******"
              label="Repeat Your Password"
              id="repeat-password"
              onChange={handleInputChange}
            />
            <Button
              text="Log In"
              icon={<img src={whiteTopRightArrow} alt="Arrow" />}
              backgroundColor="#F1511B"
              textColor="#FFF"
              onClick={handleButtonLogInToVCAccount}
            />

            {/* TODO add login process via google and linkedin */}
          </form>
          <div className={styles.links}>
            <Link className={styles.link} to="/">
              Create VC Account
            </Link>
            <Link className={styles.link} to="/">
              Log In To Founder Account
            </Link>
            <Link className={styles.link} to="/">
              Create Founder Account
            </Link>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default LogIn;
