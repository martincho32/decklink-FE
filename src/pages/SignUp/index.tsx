import { useState, useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { Logo } from '@/components/icons';
import styles from './SignUp.module.css';
import { GraphFlyingImage, GraphStandingImage } from '@/assets/images';
import { MainLayout, Button } from '@/components';
import SignUpFormData from '../../models/signup';
import RequiredSignUpInfo from './RequiredSignUpInfo';
import NotRequiredSignUpInfo from './PartlyNotRequiredSignUpInfo';
import { AuthContext } from '../../context';

function SignUp() {
  const { registerUser } = useContext(AuthContext);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const [page, setPage] = useState<number>(0);

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
  const [enternedCompanyNameTouched, setEnternedCompanyNameTouched] =
    useState<boolean>(false);

  const [formData, setFormData] = useState<SignUpFormData>({
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    confirmPassword: '',
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

  const enteredCompanyNameIsValid =
    formData.companyName.trim() !== '' && formData.companyName?.length >= 2;
  const companyNameIsInvalid =
    !enteredCompanyNameIsValid && enternedCompanyNameTouched;

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

    setEnternedCompanyNameTouched(true);

    if (
      !enteredEmailIsValid ||
      !enteredPasswordIsValid ||
      !enteredRepeatPasswordIsValid ||
      !enteredCompanyNameIsValid
    ) {
      return;
    }
    const { hasError, message } = await registerUser(
      formData.email,
      formData.password,
      formData.confirmPassword,
      formData.firstName,
      formData.lastName,
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
    navigate('/founder/decks', { state: { isSignedUp: true } });
    enqueueSnackbar('Registration succesful!', {
      variant: 'success',
      autoHideDuration: 2000,
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'right',
      },
    });
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

  const passwordInputClasses = passwordInputIsInvalid
    ? `${styles.inputBlock} ${styles.inputBlockError}`
    : styles.inputBlock;

  const repeatPasswordInputClasses = repeatPasswordInputIsInvalid
    ? `${styles.inputBlock} ${styles.inputBlockError}`
    : styles.inputBlock;

  const companyNameInputClasses = companyNameIsInvalid
    ? `${styles.inputBlock} ${styles.inputBlockError}`
    : styles.inputBlock;

  return (
    <MainLayout>
      <div className={styles.blockContainer}>
        <img
          className={styles.imgTopRight}
          src={GraphFlyingImage}
          alt="graphImageStanding"
        />
        <img
          className={styles.imgBotLeft}
          src={GraphStandingImage}
          alt="graphImageStanding"
        />
        <div className={styles.formWrapper}>
          {/* set title from props here */}
          <h1 className={styles.headingStyle}>{formTitles[page]}</h1>
          <form onSubmit={submitHandler} className={styles.form}>
            {/* <PageDisplay /> */}
            {page === 0 ? (
              <>
                <RequiredSignUpInfo
                  formData={formData}
                  setFormData={setFormData}
                  emailInputClasses={emailInputClasses}
                  emailInputIsInvalid={emailInputIsInvalid}
                  firstNameInputClasses={emailInputClasses}
                  firstNameInputIsInvalid={firstNameInputIsInvalid}
                  lastNameInputClasses={emailInputClasses}
                  lastNameInputIsInvalid={lastNameInputIsInvalid}
                  passwordInputClasses={passwordInputClasses}
                  passwordInputIsInvalid={passwordInputIsInvalid}
                  repeatPasswordInputClasses={repeatPasswordInputClasses}
                  repeatPasswordInputIsInvalid={repeatPasswordInputIsInvalid}
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
                  icon={<Logo color="var(--white-color)" />}
                  backgroundColor="var(--primary-color)"
                  textColor="var(--white-color)"
                  className="w-full"
                  // onClick={continueHandler}
                />
              </>
            ) : (
              <>
                <NotRequiredSignUpInfo
                  formData={formData}
                  setFormData={setFormData}
                  companyNameInputClasses={companyNameInputClasses}
                  companyNameIsInvalid={companyNameIsInvalid}
                  setEnternedCompanyNameTouched={setEnternedCompanyNameTouched}
                />
                <Button
                  id="signup-button"
                  type="submit"
                  text="Sign up"
                  icon={<Logo color="var(--white-color)" />}
                  backgroundColor="var(--primary-color)"
                  textColor="var(--white-color)"
                  className="w-full"
                  // onClick={submitHandler}
                />

                <Button
                  type="submit"
                  text="Continue without this information"
                  textColor="#161a2088"
                  // onClick={submitHandler}
                />

                <Button
                  type="button"
                  text="Go Back"
                  icon={<Logo color="var(--primary-color)" rotation={-135} />}
                  textColor="var(--primary-color)"
                  onClick={() => {
                    setPage((currPage) => currPage - 1);
                  }}
                />
              </>
            )}

            {/* TODO add login process via google and linkedin */}
          </form>
          <div className={styles.links}>
            <Link className={styles.link} to="/login">
              Log In To Founder Account
            </Link>
            {/* <Link className={styles.link} to="/">
              Log In To VC Account
            </Link>
            <Link className={styles.link} to="/">
              Create VC Account
            </Link> */}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default SignUp;
