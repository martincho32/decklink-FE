import { useSnackbar } from 'notistack';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useContext } from 'react';
import whiteTopRightArrow from '../../assets/images/ArrowTopRight.svg';
import { Input, Button, AuthLayout } from '../../components';
import { AuthContext } from '../../context';
import styles from './LogIn.module.css';

function LogIn() {
  const { enqueueSnackbar } = useSnackbar();
  const { loginUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

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

    const { noError, message } = await loginUser(email, password);
    if (!noError) {
      enqueueSnackbar(message, {
        variant: 'error',
        autoHideDuration: 2000,
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'right',
        },
      });
      return;
    }
    navigate('/founder/decks', {
      state: { isLoggedIn: noError },
      replace: true,
    });

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
    <AuthLayout>
      <div className="flex flex-col gap-7 my-auto items-center justify-center w-full">
        <h1 className="text-mirage text-[2.25rem] font-black">Sign In</h1>
        <form
          onSubmit={submitHandler}
          className={`${styles.form} items-center justify-center`}
          action="submit"
        >
          <div className={emailInputClasses}>
            <Input
              required
              style="default"
              type="email"
              placeholder="example@gmail.com"
              label="Your Email"
              id="email"
              value={email}
              inputIsInvalid={emailInputIsInvalid}
              errorMessage="Enter valid email"
              onChange={handleEmailChange}
              onBlur={emailInputBlur}
              className="tablet:!max-w-none"
            />
          </div>
          <div className={passwordInputClasses}>
            <Input
              required
              style="password"
              placeholder="******"
              label="Password"
              id="passwod"
              value={password}
              inputIsInvalid={passwordInputIsInvalid}
              errorMessage="Password must be 6-35 characters long"
              onChange={handlePasswordChange}
              onBlur={passwordInputBlur}
              className="tablet:!max-w-none"
            />
          </div>
          <Button
            id="login-button"
            type="submit"
            text="Sign In"
            icon={<img src={whiteTopRightArrow} alt="Arrow" />}
            backgroundColor="#F1511B"
            textColor="#FFF"
            className="w-full mobilev:!max-w-[24rem] tablet:!max-w-none"
          />
        </form>
        <div className="flex flex-col items-center gap-1">
          <p className="opacity-50">Don&apos;t have an account?</p>
          <Link className="text-persimmon" to="/signup">
            Create Now
          </Link>
        </div>

        <Link className="opacity-50" to="/forgotPassword">
          Forgot your password?
        </Link>
      </div>
    </AuthLayout>
  );
}

export default LogIn;
