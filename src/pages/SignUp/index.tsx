import { useSnackbar } from 'notistack';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState, useContext } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

import whiteTopRightArrow from '../../assets/images/ArrowTopRight.svg';
import { Button, Logo } from '../../components';
import { AuthContext } from '../../context';
import getAnalyticOnYourDeck from '../../assets/images/GetAnalyticOnYourDeck.png';
import freePitchDeck from '../../assets/images/10FreePitchDecks.png';
import collectEmails from '../../assets/images/CollectEmails.png';
import customLink from '../../assets/images/CustomLink.png';
import previewCard from '../../assets/images/PreviewCard.png';
import styles from './SignUp.module.css';
import SignUpFormData from '@/models/signup';
import RequiredSignUpInfo from './RequiredSignUpInfo';
import NotRequiredSignUpInfo from './PartlyNotRequiredSignUpInfo';

function SignUp() {
  const { registerUser } = useContext(AuthContext);
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

  return (
    // <AuthLayout>
    <div className="h-screen w-screen overflow-hidden flex">
      <div className="w-[43.75%]">
        <div className="w-full h-full desktop:pl-16 tablet:pl-8 mobileh:pl-5 mobilev:pl-4">
          <div className="flex flex-col h-full items-center py-16 px-20 ml-auto w-full max-w-custom overflow-auto">
            <div className="flex flex-col gap-7 my-auto items-center justify-center w-full">
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
              <form onSubmit={submitHandler} className={styles.form}>
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
                      repeatPasswordInputIsInvalid={
                        repeatPasswordInputIsInvalid
                      }
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
                      className="w-full"
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
                      className="w-full"
                    />

                    <Button
                      type="submit"
                      text="Continue without this information"
                      textColor="#161a2088"
                    />
                  </>
                )}
              </form>
              <div className="flex gap-1">
                <p className="opacity-50">Already have an account?</p>
                <Link className="text-persimmon" to="/login">
                  Sign In Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-[56.25%] bg-persimmon rounded-bl-[24px] rounded-tl-[24px]">
        <div className="w-full desktop:px-16 tablet:px-8 mobileh:px-5 mobilev:px-4 h-full">
          <div className="desktop:pt-8 tablet:pt-6 pt-2 mx-auto w-full max-w-custom h-full flex items-center">
            <Swiper
              spaceBetween={30}
              centeredSlides
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
              }}
              // pagination={{
              //   clickable: true,
              //   renderBullet: (_index, className) => {
              //     return `<span class="${className} !bg-white !top-10"></span>`;
              //   },
              //   // el: 'top-10',
              // }}
              modules={[Autoplay, Pagination, Navigation]}
            >
              <SwiperSlide>
                <div className="flex flex-col gap-4 items-center">
                  <img src={getAnalyticOnYourDeck} alt="" />
                  <div className="flex flex-col gap-4 max-w-[30rem]">
                    <h2 className="text-white text-center text-[2rem] font-bold">
                      Get analytic on Your Deck
                    </h2>
                    <p className="text-white text-center font-[NeuePlak]">
                      Gain valuable analytics to optimize your content and
                      engage your audience like never before.
                    </p>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="flex flex-col gap-4 items-center">
                  <img src={freePitchDeck} alt="" />
                  <div className="flex flex-col gap-4 max-w-[30rem]">
                    <h2 className="text-white text-center text-[2rem] font-bold">
                      Share up to 10 FREE Decks
                    </h2>
                    <p className="text-white text-center font-[NeuePlak]">
                      Create up to 10 FREE decks on our resource and unlock
                      endless possibilities to organize, manage, and share your
                      content effortlessly.
                    </p>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="flex flex-col gap-4 items-center">
                  <img src={collectEmails} alt="" />
                  <div className="flex flex-col gap-4 max-w-[30rem]">
                    <h2 className="text-white text-center text-[2rem] font-bold">
                      Collect Emails
                    </h2>
                    <p className="text-white text-center font-[NeuePlak]">
                      Expand your reach and build a strong network by capturing
                      valuable leads with ease.
                    </p>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="flex flex-col gap-4 items-center">
                  <img src={customLink} alt="" />
                  <div className="flex flex-col gap-4 max-w-[30rem]">
                    <h2 className="text-white text-center text-[2rem] font-bold">
                      Create Custom Links
                    </h2>
                    <p className="text-white text-center font-[NeuePlak]">
                      Personalize your links for each deck, making it convenient
                      and memorable for your audience to access your content.
                    </p>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="flex flex-col gap-4 items-center">
                  <img src={previewCard} alt="" />
                  <div className="flex flex-col gap-4 max-w-[30rem]">
                    <h2 className="text-white text-center text-[2rem] font-bold">
                      Share Link With Preview Card
                    </h2>
                    <p className="text-white text-center font-[NeuePlak]">
                      Engage your audience with a personalized preview that
                      showcases the essence of your content before they even
                      click the link.
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
