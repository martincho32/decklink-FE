import { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import whiteTopRightArrow from '../../assets/images/ArrowTopRight.svg';
import styles from './SignUp.module.css';
import graphImageFlying from '../../assets/images/graph-image-flying.png';
import graphImageStanding from '../../assets/images/graph-image-standing.png';
import { MainLayout, Button } from '../../components';
import SignUpFormData from '../../models/signup';
import RequiredSignUpInfo from './RequiredSignUpInfo';
import NotRequiredSignUpInfo from './PartlyNotRequiredSignUpInfo';
import OrangeIconBottomLeft from '../../assets/images/OrangeArrowBottomLeft.svg';
import { AuthContext } from '../../context';

function SignUp() {
  const { registerUser } = useContext(AuthContext);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

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

  const continueHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
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
  };

  const submitHandler = async (event: React.FormEvent) => {
    event.preventDefault();

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
      formData.companyWebUrl
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

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        if (page === 0) {
          document.getElementById('continue-button')?.click();
        } else {
          document.getElementById('signup-button')?.click();
        }
      }
    };

    document.addEventListener('keydown', handleKeyPress);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [page]);

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
          <h1 className={styles.headingStyle}>{formTitles[page]}</h1>
          <form className={styles.form}>
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
                  type="button"
                  text="Continue"
                  icon={<img src={whiteTopRightArrow} alt="Arrow" />}
                  backgroundColor="#F1511B"
                  textColor="#FFF"
                  className="w-full"
                  onClick={continueHandler}
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
                  type="button"
                  text="Sign up"
                  icon={<img src={whiteTopRightArrow} alt="Arrow" />}
                  backgroundColor="#F1511B"
                  textColor="#FFF"
                  className="w-full"
                  onClick={submitHandler}
                />

                <Button
                  type="button"
                  text="Continue without this information"
                  textColor="#161a2088"
                  onClick={submitHandler}
                />

                <Button
                  type="button"
                  text="Go Back"
                  icon={<img src={OrangeIconBottomLeft} alt="Arrow" />}
                  textColor="#F1511B"
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
