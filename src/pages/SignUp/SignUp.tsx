import Input from '../../UI/Input';
import Button from '../../UI/Button';
import whiteTopRightArrow from '../../assets/images/ArrowTopRight.svg';
import { Link } from 'react-router-dom';
import styles from './SignUp.module.css';
import graphImageFlying from '../../assets/images/graph-image-flying.png';
import graphImageStanding from '../../assets/images/graph-image-standing.png';
import { useRef } from 'react';

import useSignUpFormContext from '../../hooks/useSignUpFormContext';

const SignUp: React.FC<{ title: string }> = ({ title }) => {
  const signUpInputsRef = useRef<HTMLInputElement>(null);

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();

    const enteredData = signUpInputsRef.current?.value;
  };

  const handleInputChange = () => {
    console.log('testing');
  };

  const handleButtonLogInToVCAccount = () => {
    console.log('testing');
  };

  return (
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
        <h1 className={styles.headingStyle}>Sign Up To VC Account</h1>
        <form onSubmit={submitHandler} className={styles.form} action="submit">
          <Input
            ref={signUpInputsRef}
            style="default"
            type="email"
            placeholder="example@gmail.com"
            label="Your Email"
            id="email"
            onChange={handleInputChange}
          />
          <Input
            ref={signUpInputsRef}
            style="password"
            placeholder="******"
            label="Password"
            id="passwod"
            onChange={handleInputChange}
          />
          <Input
            ref={signUpInputsRef}
            style="password"
            placeholder="******"
            label="Repeat Your Password"
            id="repeat-password"
            onChange={handleInputChange}
          />
          <Button
            text="Continue"
            icon={<img src={whiteTopRightArrow} alt="Arrow" />}
            backgroundColor="#F1511B"
            textColor="#FFF"
            onClick={handleButtonLogInToVCAccount}
          />

          {/* TODO add login process via google and linkedin */}
        </form>
        <div className={styles.links}>
          <Link className={styles.link} to="/">
            Log In To Founder Account
          </Link>
          <Link className={styles.link} to="/">
            Log In To VC Account
          </Link>
          <Link className={styles.link} to="/">
            Create VC Account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
