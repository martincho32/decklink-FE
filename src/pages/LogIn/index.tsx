import { Link } from 'react-router-dom';
import { useState } from 'react';
import Input from '../../UI/Input';
import Button from '../../UI/Button';
import whiteTopRightArrow from '../../assets/images/ArrowTopRight.svg';
import styles from './LogIn.module.css';
import graphImageFlying from '../../assets/images/graph-image-flying.png';
import graphImageStanding from '../../assets/images/graph-image-standing.png';
import { MainLayout } from '../../components/layouts';

function LogIn() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [repeatPassword, setRepeatPassword] = useState<string>('');

  const [enteredEmailTouched, setEnteredEmailTouched] =
    useState<boolean>(false);
  const [enteredPasswordTouched, setEnteredPasswordTouched] =
    useState<boolean>(false);
  const [enternedRepeatPasswordTouched, setEnternedRepeatPasswordTouched] =
    useState<boolean>(false);

  const enteredEmailIsValid = email.trim() !== '' && email.includes('@');
  const emailInputIsInvalid = !enteredEmailIsValid && enteredEmailTouched;

  const enteredPasswordIsValid = password.length >= 6 && password.length <= 35;
  const passwordInputIsInvalid =
    !enteredPasswordIsValid && enteredPasswordTouched;

  const enteredRepeatPasswordIsValid =
    repeatPassword.trim() !== '' && repeatPassword === password;
  const repeatPasswordInputIsInvalid =
    !enteredRepeatPasswordIsValid && enternedRepeatPasswordTouched;

  const handleEmailChange = (value: string) => {
    setEmail(value);
  };

  const emailInputBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    setEnteredEmailTouched(true);
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
  };

  const passwordInputBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    setEnteredPasswordTouched(true);
  };

  const handleRepeatPasswordChange = (value: string) => {
    setRepeatPassword(value);
  };

  const repeatPasswordInputBlur = (
    event: React.FocusEvent<HTMLInputElement>
  ) => {
    setEnternedRepeatPasswordTouched(true);
  };

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();

    setEnteredEmailTouched(true);
    setEnteredPasswordTouched(true);
    setEnternedRepeatPasswordTouched(true);

    if (
      !enteredEmailIsValid ||
      !enteredPasswordIsValid ||
      !enteredRepeatPasswordIsValid
    ) {
      return;
    }
    console.log(email, password);

    setEmail('');
    setEnteredEmailTouched(false);
    setPassword('');
    setEnteredPasswordTouched(false);
    setRepeatPassword('');
    setEnternedRepeatPasswordTouched(false);
  };

  const emailInputClasses = emailInputIsInvalid
    ? `${styles.inputBlock} ${styles.inputBlockError}`
    : styles.inputBlock;

  const passwordInputClasses = passwordInputIsInvalid
    ? `${styles.inputBlock} ${styles.inputBlockError}`
    : styles.inputBlock;

  const repeatPasswordInputClasses = repeatPasswordInputIsInvalid
    ? `${styles.inputBlock} ${styles.inputBlockError}`
    : styles.inputBlock;

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
          <form
            onSubmit={submitHandler}
            className={styles.form}
            action="submit"
          >
            <div className={emailInputClasses}>
              <Input
                style="default"
                type="email"
                placeholder="example@gmail.com"
                label="Your Email"
                id="email"
                value={email}
                onChange={handleEmailChange}
                onBlur={emailInputBlur}
              />
              {emailInputIsInvalid && (
                <p className={styles.errorMessage}>Enter valid email</p>
              )}
            </div>
            <div className={passwordInputClasses}>
              <Input
                style="password"
                placeholder="******"
                label="Password"
                id="passwod"
                value={password}
                onChange={handlePasswordChange}
                onBlur={passwordInputBlur}
              />
              {passwordInputIsInvalid && (
                <p className={styles.errorMessage}>
                  Password must be 6-35 characters long
                </p>
              )}
            </div>
            <div className={repeatPasswordInputClasses}>
              <Input
                style="password"
                placeholder="******"
                label="Repeat Your Password"
                id="repeat-password"
                value={repeatPassword}
                onChange={handleRepeatPasswordChange}
                onBlur={repeatPasswordInputBlur}
              />
              {repeatPasswordInputIsInvalid && (
                <p className={styles.errorMessage}>Passwords do not match</p>
              )}
            </div>
            <Button
              type="submit"
              text="Log In"
              icon={<img src={whiteTopRightArrow} alt="Arrow" />}
              backgroundColor="#F1511B"
              textColor="#FFF"
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
