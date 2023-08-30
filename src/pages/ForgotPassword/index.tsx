import { useSnackbar } from 'notistack';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

import whiteTopRightArrow from '../../assets/images/ArrowTopRight.svg';
import { Input, Button } from '../../components';
import getAnalyticOnYourDeck from '../../assets/images/GetAnalyticOnYourDeck.png';
import freePitchDeck from '../../assets/images/10FreePitchDecks.png';
import collectEmails from '../../assets/images/CollectEmails.png';
import customLink from '../../assets/images/CustomLink.png';
import previewCard from '../../assets/images/PreviewCard.png';
import styles from './ForgotPassword.module.css';
import { loginService } from '@/services';

function ForgotPassword() {
  const { enqueueSnackbar } = useSnackbar();

  // const navigate = useNavigate();

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

    try {
      const { data } = await loginService.forgotPassword(email);
      if (data.status === 'success') {
        enqueueSnackbar(data.message, {
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
        enqueueSnackbar(data.message, {
          variant: 'error',
          autoHideDuration: 5000,
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'right',
          },
        });
      }
    } catch (error: any) {
      console.log(error);
      enqueueSnackbar(error.response.data.message, {
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
    <div className="h-screen w-screen overflow-hidden flex">
      <div className="mobilev:w-full tablet:w-[43.75%]">
        <div className="w-full h-full desktop:pl-16 tablet:pl-8 mobilex:pl-5 mobilev:px-4">
          <div className="flex flex-col h-full items-center desktop:px-20 mobilev:px-0 tablet:px-4 ml-auto w-full max-w-custom">
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
          </div>
        </div>
      </div>
      <div className="mobilev:hidden tablet:block tablet:w-[56.25%] bg-persimmon rounded-bl-[24px] rounded-tl-[24px]">
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
                    <h2 className="text-white text-center tablet:text-[1.25rem] laptop:text-[2rem] font-bold">
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
                    <h2 className="text-white text-center tablet:text-[1.25rem] laptop:text-[2rem] font-bold">
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
                    <h2 className="text-white text-center tablet:text-[1.25rem] laptop:text-[2rem] font-bold">
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
                    <h2 className="text-white text-center tablet:text-[1.25rem] laptop:text-[2rem] font-bold">
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
                    <h2 className="text-white text-center tablet:text-[1.25rem] laptop:text-[2rem] font-bold">
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

export default ForgotPassword;
