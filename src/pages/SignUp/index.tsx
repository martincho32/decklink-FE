/* eslint-disable @typescript-eslint/no-shadow */
import { useSnackbar } from 'notistack';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useState, useContext } from 'react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import whiteTopRightArrow from '../../assets/images/ArrowTopRight.svg';
import { AuthLayout, Button, Logo } from '../../components';
import { AuthContext } from '../../context';
import styles from './SignUp.module.css';
import SignUpFormData from '@/models/signup';
import RequiredSignUpInfo from './RequiredSignUpInfo';
import NotRequiredSignUpInfo from './PartlyNotRequiredSignUpInfo';

function SignUp() {
  const { registerUser, sendEmailVerification } = useContext(AuthContext);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const [page, setPage] = useState<number>(0);

  // const [loginError, setSignUpError] = useState<string | null>(null);
  const [enteredEmailTouched, setEnteredEmailTouched] =
    useState<boolean>(false);
  const [enteredFirstNameTouched, setEnteredFirstNameTouched] =
    useState<boolean>(false);
  const [enteredLastNameTouched, setEnteredLastNameTouched] =
    useState<boolean>(false);
  const [enteredPasswordTouched, setEnteredPasswordTouched] =
    useState<boolean>(false);
  useState<boolean>(false);
  const [enternedRepeatPasswordTouched, setEnternedRepeatPasswordTouched] =
    useState<boolean>(false);

  const [formData, setFormData] = useState<SignUpFormData>({
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    confirmPassword: '',
    allowEmails: true,
    companyName: '',
    companyWebUrl: '',
  });

  const formTitles = ['Sign Up', 'Additional Information'];

  const enteredEmailIsValid =
    formData.email.trim() !== '' && formData.email.includes('@');
  const emailInputIsInvalid = !enteredEmailIsValid && enteredEmailTouched;

  const enteredFirstNameIsValid =
    formData.firstName.trim() !== '' && formData.firstName.length >= 1;
  const firstNameInputIsInvalid =
    !enteredFirstNameIsValid && enteredFirstNameTouched;

  const enteredLastNameIsValid =
    formData.lastName.trim() !== '' && formData.lastName.length >= 1;
  const lastNameInputIsInvalid =
    !enteredLastNameIsValid && enteredLastNameTouched;

  const enteredPasswordIsValid =
    formData.password.length >= 6 && formData.password.length <= 35;
  const passwordInputIsInvalid =
    !enteredPasswordIsValid && enteredPasswordTouched;

  const enteredRepeatPasswordIsValid =
    formData.confirmPassword.trim() !== '' &&
    formData.confirmPassword === formData.password;
  const repeatPasswordInputIsInvalid =
    !enteredRepeatPasswordIsValid && enternedRepeatPasswordTouched;

  const enteredAllowEmailsIsValid = typeof formData.allowEmails === 'boolean';
  const allowEmailsInputIsInvalid = !enteredAllowEmailsIsValid;

  const submitHandler = async (event: React.FormEvent) => {
    event.preventDefault();

    if (page === 0) {
      setEnteredEmailTouched(true);
      setEnteredPasswordTouched(true);
      setEnternedRepeatPasswordTouched(true);
      setEnteredFirstNameTouched(true);
      setEnteredLastNameTouched(true);

      if (
        !enteredEmailIsValid ||
        !enteredPasswordIsValid ||
        !enteredRepeatPasswordIsValid ||
        !enteredFirstNameIsValid ||
        !enteredLastNameIsValid
      ) {
        return;
      }

      setPage((currPage) => currPage + 1);
      return;
    }

    if (
      !enteredEmailIsValid ||
      !enteredPasswordIsValid ||
      !enteredRepeatPasswordIsValid
    ) {
      return;
    }
    const { hasError, message } = await registerUser(
      formData.email,
      formData.password,
      formData.confirmPassword,
      formData.firstName,
      formData.lastName,
      formData.allowEmails,
      formData.companyName,
      formData.companyWebUrl,
      queryParams.get('referredBy')!
    );
    if (hasError) {
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

    const sendEmailVerificationFunction = async () => {
      const { hasError, message } = await sendEmailVerification(formData.email);
      if (hasError) {
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

    sendEmailVerificationFunction().catch((error) => {
      enqueueSnackbar(error, {
        variant: 'error',
        autoHideDuration: 5000,
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'right',
        },
      });
    });
    // navigate('/founder/decks', { state: { isSignedUp: true } });
    navigate('/verify', { state: { email: formData.email } });
    // enqueueSnackbar('Registration succesful!', {
    //   variant: 'success',
    //   autoHideDuration: 2000,
    //   anchorOrigin: {
    //     vertical: 'top',
    //     horizontal: 'right',
    //   },
    // });
    formData.email = '';
    setEnteredEmailTouched(false);
    formData.password = '';
    setEnteredPasswordTouched(false);
    formData.confirmPassword = '';
    setEnternedRepeatPasswordTouched(false);
  };

  const emailInputClasses = emailInputIsInvalid
    ? `${styles.inputBlock} ${styles.inputBlockError}`
    : styles.inputBlock;

  const firstNameInputClasses = firstNameInputIsInvalid
    ? `${styles.inputBlock} ${styles.inputBlockError}`
    : styles.inputBlock;

  const lastNameInputClasses = lastNameInputIsInvalid
    ? `${styles.inputBlock} ${styles.inputBlockError}`
    : styles.inputBlock;

  const passwordInputClasses = passwordInputIsInvalid
    ? `${styles.inputBlock} ${styles.inputBlockError}`
    : styles.inputBlock;

  const repeatPasswordInputClasses = repeatPasswordInputIsInvalid
    ? `${styles.inputBlock} ${styles.inputBlockError}`
    : styles.inputBlock;

  const allowEmailsInputClasses = allowEmailsInputIsInvalid
    ? `${styles.inputBlock} ${styles.inputBlockError}`
    : styles.inputBlock;

  const { isLoggedIn } = useContext(AuthContext);

  return (
    <AuthLayout>
      {!isLoggedIn ? (
        <div className="flex py-12 flex-col gap-7 my-auto items-center justify-center w-full">
          {page === 1 && (
            <Button
              type="button"
              text="Go Back"
              icon={<Logo color="#161A20" topLeft width="12" height="11" />}
              textColor="#161A20"
              className="flex-row-reverse"
              onClick={() => {
                setPage((currPage) => currPage - 1);
              }}
            />
          )}
          <h1 className="text-mirage text-[2.25rem] font-black">
            {formTitles[page]}
          </h1>
          <p className="text-mirage text-[0.875rem] opacity-40">
            * - required fileds
          </p>
          <form
            onSubmit={submitHandler}
            className={`${styles.form} items-center justify-center`}
          >
            {page === 0 ? (
              <>
                <RequiredSignUpInfo
                  formData={formData}
                  setFormData={setFormData}
                  emailInputClasses={emailInputClasses}
                  emailInputIsInvalid={emailInputIsInvalid}
                  firstNameInputClasses={firstNameInputClasses}
                  firstNameInputIsInvalid={firstNameInputIsInvalid}
                  lastNameInputClasses={lastNameInputClasses}
                  lastNameInputIsInvalid={lastNameInputIsInvalid}
                  passwordInputClasses={passwordInputClasses}
                  passwordInputIsInvalid={passwordInputIsInvalid}
                  repeatPasswordInputClasses={repeatPasswordInputClasses}
                  repeatPasswordInputIsInvalid={repeatPasswordInputIsInvalid}
                  allowEmailsInputClasses={allowEmailsInputClasses}
                  setEnteredEmailTouched={setEnteredEmailTouched}
                  setEnteredFirstNameTouched={setEnteredFirstNameTouched}
                  setEnteredLastNameTouched={setEnteredLastNameTouched}
                  setEnteredPasswordTouched={setEnteredPasswordTouched}
                  setEnteredRepeatPasswordTouched={
                    setEnternedRepeatPasswordTouched
                  }
                />
                <Button
                  id="continue-button"
                  type="submit"
                  text="Continue"
                  icon={<img src={whiteTopRightArrow} alt="Arrow" />}
                  backgroundColor="#F1511B"
                  textColor="#FFF"
                  className="w-full mobilev:!max-w-[24rem] tablet:!max-w-none"
                  // onClick={continueHandler}
                />
              </>
            ) : (
              <>
                <NotRequiredSignUpInfo
                  formData={formData}
                  setFormData={setFormData}
                />
                <Button
                  id="signup-button"
                  type="submit"
                  text="Sign up"
                  icon={<img src={whiteTopRightArrow} alt="Arrow" />}
                  backgroundColor="#F1511B"
                  textColor="#FFF"
                  className="w-full mobilev:!max-w-[24rem] tablet:!max-w-none"
                />
              </>
            )}
          </form>
          <div className="flex flex-col items-center gap-1">
            <p className="opacity-50">Already have an account?</p>
            <Link className="text-persimmon" to="/login">
              Sign In Now
            </Link>
          </div>
        </div>
      ) : (
        <Navigate to="/founder/decks" />
      )}
    </AuthLayout>
  );
}

export default SignUp;
