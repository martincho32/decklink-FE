import { useSnackbar } from 'notistack';
import { Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import whiteTopRightArrow from '../../assets/images/ArrowTopRight.svg';
import { Input, Button, AuthLayout } from '../../components';
import styles from './ForgotPassword.module.css';
import { AuthContext } from '@/context';

function ForgotPassword() {
  const { enqueueSnackbar } = useSnackbar();

  const { forgotPassword } = useContext(AuthContext);

  const [email, setEmail] = useState<string>('');

  const [enteredEmailTouched, setEnteredEmailTouched] =
    useState<boolean>(false);

  const enteredEmailIsValid =
    email.trim() !== '' && email.includes('@') && email.includes('.');
  const emailInputIsInvalid = !enteredEmailIsValid && enteredEmailTouched;

  const handleEmailChange = (value: string) => {
    setEmail(value);
  };

  const emailInputBlur = () => {
    setEnteredEmailTouched(true);
  };

  const submitHandler = async (event: React.FormEvent) => {
    event.preventDefault();

    setEnteredEmailTouched(true);

    if (!enteredEmailIsValid) {
      return;
    }

    const { hasError, message } = await forgotPassword(email);
    if (!hasError) {
      enqueueSnackbar(message, {
        variant: 'success',
        autoHideDuration: 5000,
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'right',
        },
      });

      setEmail('');
      setEnteredEmailTouched(false);
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

  const emailInputClasses = emailInputIsInvalid
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
          <Button
            id="login-button"
            type="submit"
            text="Sent Email"
            icon={<img src={whiteTopRightArrow} alt="Arrow" />}
            backgroundColor="#F1511B"
            textColor="#FFF"
            className="w-full mobilev:!max-w-[24rem] tablet:!max-w-none"
          />
        </form>
        <div className="flex flex-col items-center gap-1">
          <p className="opacity-50">Remembered your password?</p>
          <Link className="text-persimmon" to="/login">
            Sign In Now
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
}

export default ForgotPassword;
