import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import whiteTopRightArrow from '../../assets/images/ArrowTopRight.svg';
import styles from './LogIn.module.css';
import graphImageFlying from '../../assets/images/graph-image-flying.png';
import graphImageStanding from '../../assets/images/graph-image-standing.png';
import { MainLayout, Input, Button, SuccessBanner } from '../../components';
import { useAuth } from '../../hooks/useAuth';

function LogIn() {
  const location = useLocation();

  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loginError, setLoginError] = useState<string | null>(null);

  const [enteredEmailTouched, setEnteredEmailTouched] =
    useState<boolean>(false);
  const [enteredPasswordTouched, setEnteredPasswordTouched] =
    useState<boolean>(false);

  const enteredEmailIsValid =
    email.trim() !== '' && email.includes('@') && email.includes('.');
  const emailInputIsInvalid = !enteredEmailIsValid && enteredEmailTouched;

  const enteredPasswordIsValid = password.length >= 6 && password.length <= 35;
  const passwordInputIsInvalid =
    !enteredPasswordIsValid && enteredPasswordTouched;

  const handleEmailChange = (value: string) => {
    setEmail(value);
    setLoginError(null);
  };

  const emailInputBlur = () => {
    setEnteredEmailTouched(true);
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
  };

  const passwordInputBlur = () => {
    setEnteredPasswordTouched(true);
  };

  const submitHandler = async (event: React.FormEvent) => {
    event.preventDefault();

    setEnteredEmailTouched(true);
    setEnteredPasswordTouched(true);

    if (!enteredEmailIsValid || !enteredPasswordIsValid) {
      return;
    }

    // Call login service and handle response
    const response = await login({ email, password });
    console.log('isLogin: ', response);
    if (typeof response === 'boolean') {
      navigate('/founder/decks', { state: { isLoggedIn: response } });
    } else {
      const errorMessage =
        response.response.status === 401
          ? 'Whoops! Incorrect email or password.'
          : 'Whoops! Looks like something went wrong, please contact support.';
      setLoginError(errorMessage);
    }
    setEmail('');
    setEnteredEmailTouched(false);
    setPassword('');
    setEnteredPasswordTouched(false);
  };

  const emailInputClasses = emailInputIsInvalid
    ? `${styles.inputBlock} ${styles.inputBlockError}`
    : styles.inputBlock;

  const passwordInputClasses = passwordInputIsInvalid
    ? `${styles.inputBlock} ${styles.inputBlockError}`
    : styles.inputBlock;

  return (
    <MainLayout>
      {location.state.isSignedUp && (
        <SuccessBanner message="You succesfully signed up! Now you just need to log in" />
      )}
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
          <h1 className={styles.headingStyle}>Log In</h1>
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
            {loginError && (
              <span className={`${styles.errorMessage} text-2xl`}>
                {loginError}
              </span>
            )}
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
            {/* <Link className={styles.link} to="/">
              Create VC Account
            </Link>
            <Link className={styles.link} to="/">
              Log In To Founder Account
            </Link> */}
            <Link className={styles.link} to="/signup">
              Create Founder Account
            </Link>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default LogIn;
