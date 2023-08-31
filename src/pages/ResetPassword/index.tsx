import { useSnackbar } from 'notistack';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useContext, useState } from 'react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import whiteTopRightArrow from '../../assets/images/ArrowTopRight.svg';
import { Input, Button, AuthLayout } from '../../components';
import styles from './ResetPassword.module.css';
// import { loginService } from '@/services';
import { AuthContext } from '@/context';

function ResetPassword() {
  const { loginUser, resetPassword } = useContext(AuthContext);
  const navigate = useNavigate();

  const params = useParams();
  const { enqueueSnackbar } = useSnackbar();

  const [password, setPassword] = useState<string>('');
  const [repeatPassword, setRepeatPassword] = useState<string>('');

  const [enteredPasswordTouched, setEnteredPasswordTouched] =
    useState<boolean>(false);
  const [enteredRepeatPasswordTouched, setEnteredRepeatPasswordTouched] =
    useState<boolean>(false);

  const enteredPasswordIsValid = password.length >= 6 && password.length <= 35;
  const passwordInputIsInvalid =
    !enteredPasswordIsValid && enteredPasswordTouched;

  const enteredRepeatPasswordIsValid = repeatPassword === password;
  const repeatPasswordInputIsInvalid =
    !enteredRepeatPasswordIsValid && enteredRepeatPasswordTouched;

  const handlePasswordChange = (value: string) => {
    setPassword(value);
  };

  const passwordInputBlur = () => {
    setEnteredPasswordTouched(true);
  };

  const handleRepeatPasswordChange = (value: string) => {
    setRepeatPassword(value);
  };

  const repeatPasswordInputBlur = () => {
    setEnteredRepeatPasswordTouched(true);
  };

  const submitHandler = async (event: React.FormEvent) => {
    event.preventDefault();

    setEnteredRepeatPasswordTouched(true);
    setEnteredPasswordTouched(true);

    if (!enteredRepeatPasswordIsValid || !enteredPasswordIsValid) {
      return;
    }

    const { hasError, message, email } = await resetPassword(
      params.token as string,
      password,
      repeatPassword
    );

    if (!hasError) {
      enqueueSnackbar(message, {
        variant: 'success',
        autoHideDuration: 5000,
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'right',
        },
      });

      const isvalidLogin = await loginUser(email as string, password);
      navigate('/founder/decks', {
        state: { isLoggedIn: isvalidLogin },
        replace: true,
      });

      setRepeatPassword('');
      setEnteredRepeatPasswordTouched(false);
      setPassword('');
      setEnteredPasswordTouched(false);
    } else {
      enqueueSnackbar(message, {
        variant: 'error',
        autoHideDuration: 5000,
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'right',
        },
      });
    }
  };

  const passwordInputClasses = passwordInputIsInvalid
    ? `${styles.inputBlock} ${styles.inputBlockError}`
    : styles.inputBlock;

  const repeatPasswordInputClasses = repeatPasswordInputIsInvalid
    ? `${styles.inputBlock} ${styles.inputBlockError}`
    : styles.inputBlock;

  return (
    <AuthLayout>
      <div className="flex flex-col gap-7 my-auto items-center justify-center w-full">
        <h1 className="text-mirage text-[2.25rem] font-black">
          Reset Password
        </h1>
        <form
          onSubmit={submitHandler}
          className={`${styles.form} items-center justify-center`}
          action="submit"
        >
          <div className={passwordInputClasses}>
            <Input
              required
              style="password"
              placeholder="******"
              label="Your New Password"
              id="password"
              value={password}
              inputIsInvalid={passwordInputIsInvalid}
              errorMessage="Password must be 6-35 characters long"
              onChange={handlePasswordChange}
              onBlur={passwordInputBlur}
              className="tablet:!max-w-none"
            />
          </div>
          <div className={repeatPasswordInputClasses}>
            <Input
              required
              style="password"
              placeholder="******"
              label="Repeat Your New Password"
              id="repeat-password"
              value={repeatPassword}
              inputIsInvalid={repeatPasswordInputIsInvalid}
              errorMessage="Repeat password must match to the new password"
              onChange={handleRepeatPasswordChange}
              onBlur={repeatPasswordInputBlur}
              className="tablet:!max-w-none"
            />
          </div>
          <Button
            id="login-button"
            type="submit"
            text="Reset Password"
            icon={<img src={whiteTopRightArrow} alt="Arrow" />}
            backgroundColor="#F1511B"
            textColor="#FFF"
            className="w-full mobilev:!max-w-[24rem] tablet:!max-w-none"
          />
        </form>
        <div className="flex flex-col items-center gap-1">
          <p className="opacity-50">Remember your password?</p>
          <Link className="text-persimmon" to="/login">
            Sign In Now
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
}

export default ResetPassword;
