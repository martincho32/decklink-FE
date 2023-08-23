import * as React from 'react';
import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { v4 as uuidv4 } from 'uuid';
import {
  MainLayout,
  Button,
  DeckPreview,
  Logo,
  Carrousel,
  CarouselCard,
  AlertDialogComponent,
} from '@/components';
import whiteTopRightArrow from '../../../assets/images/ArrowTopRight.svg';
import styles from './MyDecks.module.css';
import Card from '../../../components/FounderPart/MyDecks/Card';
import EmptyState from '../../../components/ItemEmptyState';
import { deckService } from '../../../services';
import { IDeck } from '../../../types';
import Loading from '../../../components/PreloadingScreen';
import firstReview from '../../../assets/images/FirstReview.png';
import secondReview from '../../../assets/images/SecondReview.png';
import thirdReview from '../../../assets/images/ThirdReview.png';
import reviewStats from '../../../assets/images/ReviewStats.png';
import customImage from '../../../assets/images/CustromImage.png';

// Import the useLoading hook
import useLoading from '../../../hooks/useLoading';
import { AuthContext } from '@/context';
import Popup from '@/components/UI/Popup';
import CalendlyIntegration from '@/components/CalendlyIntegration';
import { useLocalStorage } from '@/hooks/useLocalStorage';

function MyDecks() {
  const navigate = useNavigate();

  const { getItem, setItem } = useLocalStorage();
  const [previewPickDeckSlide, setPreviewPickDeckSlide] = useState(false);
  const [pageIndex, setPageIndex] = useState(0);
  const [showFreePitchDeckModal, setShowFreePitchDeckModal] =
    useState<boolean>(false);
  const [showCalendly, setShowCalendly] = useState<boolean>(false);
  const [showReferralAlert, setShowReferralAlert] = useState(false);

  const handleOnClosePitchDeckSlidePreview = () => {
    document.body.style.overflow = 'auto';
    setPreviewPickDeckSlide(false);
  };

  const { user } = useContext(AuthContext);
  const { enqueueSnackbar } = useSnackbar();

  const [deckList, setDeckList] = useState<IDeck[]>([]);

  const handleClickDelete = async (id) => {
    try {
      const { data } = await deckService.deleteDeck(id, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (data) {
        const updatedDeckList = deckList.filter((item) => item._id !== id);
        setDeckList(updatedDeckList);
      } else {
        throw new Error('Deck not found! Please contact support.');
      }
    } catch (error: any) {
      enqueueSnackbar(`Couldn't delete the deck. Please contact support.`, {
        variant: 'error',
        autoHideDuration: 5000,
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'right',
        },
      });
    }
  };

  function checkIfShowFreePitchDeckModal() {
    const localStorageShowModal = JSON.parse(
      getItem('showFreePitchDeckModal')! ?? true
    );
    if (!!localStorageShowModal && !!deckList.length) {
      setShowFreePitchDeckModal(true);
    } else {
      setShowFreePitchDeckModal(false);
    }
  }

  function handleOnCloseModal() {
    document.body.style.overflow = 'auto';
    setShowFreePitchDeckModal(false);
    setShowCalendly(false);
    setItem('showFreePitchDeckModal', JSON.stringify(false));
  }

  function onClickGoToReferral() {
    navigate('/founder/referrals');
  }

  // Use the useLoading hook with the actual backend request function
  const isLoading = useLoading(() => {
    return deckService
      .getDecksByUserId({
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then(({ data }) => {
        setDeckList(data);
        checkIfShowFreePitchDeckModal();
      })
      .catch(() => {
        enqueueSnackbar(`Couldn't load decks. Please contact support.`, {
          variant: 'error',
          autoHideDuration: 5000,
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'right',
          },
        });
      });
  });

  useEffect(() => {
    if (showFreePitchDeckModal) {
      document.body.style.overflow = 'hidden';
    }
    document.body.style.overflow = 'auto';
  }, [showFreePitchDeckModal, showCalendly]);

  useEffect(() => {
    if ((user?.maxDecksStorageSize ?? 5) <= deckList.length) {
      setShowReferralAlert(true);
    }
  });

  useEffect(() => {
    checkIfShowFreePitchDeckModal();
  }, [deckList]);

  const cards = [
    {
      key: uuidv4(),
      content: <CarouselCard image={firstReview} />,
    },
    {
      key: uuidv4(),
      content: <CarouselCard image={secondReview} />,
    },
    {
      key: uuidv4(),
      content: <CarouselCard image={thirdReview} />,
    },
  ];

  return isLoading ? (
    <Loading />
  ) : (
    <>
      {showFreePitchDeckModal && (
        <Popup
          isOpen
          onClose={() => {
            handleOnCloseModal();
          }}
        >
          <div className="flex flex-col gap-6">
            <h2 className="mobilev:leading-normal mobilev:text-[14px] mobileh:text-[16px] tablet:text-[20px] desktop:text-[24px] desktopxl:text-[32px] desktopxl:w-[50rem] mobileh:w-[35rem] text-mirage desktop:w-[40rem] mt-[-1rem] mobilev:mt-[-0.5rem]">
              Not getting as much
              <br />
              <span className="text-white p-2 mobilev:p-1 bg-persimmon">
                VC meetings as you want?
              </span>
            </h2>
            <div className="flex flex-col gap-[-2rem]">
              <div className="flex justify-between items-start">
                <img
                  src={reviewStats}
                  className="mobilev:max-h-[3rem] mobileh:max-h-[4rem] tablet:max-h-[5rem] laptop:max-h-[6rem] desktopxl:max-h-[7rem]"
                  alt="Review Stats"
                />
                <img
                  src={customImage}
                  className="mobilev:max-h-[7rem] mobileh:max-h-[10rem] tablet:max-h-[12rem] desktop:max-h-[14rem] desktopxl:max-h-[17rem]"
                  aria-hidden
                  alt="Custom Image"
                />
              </div>

              <div className="mobilev:h-auto mobileh:h-[9rem] laptop:h-[9rem] desktopxl:h-[11rem]">
                <Carrousel
                  cards={cards}
                  height="5rem"
                  width="100%"
                  margin="0 auto"
                  offset={2}
                />
              </div>
            </div>
            <Button
              type="button"
              text="Get Free Pitch Deck Review"
              icon={<Logo color="#FFFFFF" width="10" height="11" />}
              backgroundColor="#F1511B"
              textColor="#FFF"
              onClick={() => {
                setShowFreePitchDeckModal(false);
                setShowCalendly(true);
              }}
              className="py-3 w-full mx-auto relative z-10"
            />
          </div>
        </Popup>
      )}
      <div className={`${showCalendly ? 'block' : 'hidden'}`}>
        <Popup
          isOpen={showCalendly}
          onClose={() => {
            handleOnCloseModal();
          }}
        >
          <div className="">
            <CalendlyIntegration />
          </div>
        </Popup>
      </div>
      <MainLayout>
        {/* Display the loading screen if the backend request is still loading */}
        {!!deckList.length ? (
          <div className={styles.myDesksWrapper}>
            <div className={styles.pageNavigation}>
              <h2 className={styles.title}>
                Hi {user?.firstName}! Here is your created decks
              </h2>
              {!showReferralAlert ? (
                <Link
                  className={`${styles.link} hover:no-underline`}
                  to="/founder/deck/create"
                  state={{
                    deckListLength: deckList.length,
                  }}
                >
                  <Button
                    type="button"
                    text="Create New Deck"
                    icon={<img src={whiteTopRightArrow} alt="Arrow" />}
                    backgroundColor="#F1511B"
                    textColor="#FFF"
                  />
                </Link>
              ) : (
                <AlertDialogComponent
                  alertTitle="Can't create more decks"
                  alertDescription="You need to redeem an upgrade to unlock more decks storage. Go to Referral System page and refer a new user to unlock."
                  action={() => onClickGoToReferral()}
                >
                  <Button
                    type="button"
                    text="Create New Deck"
                    icon={<img src={whiteTopRightArrow} alt="Arrow" />}
                    backgroundColor="#F1511B"
                    textColor="#FFF"
                  />
                </AlertDialogComponent>
              )}
            </div>
            <div className={styles.decksBlock}>
              {deckList.map((deck) => (
                <React.Fragment key={deck._id}>
                  <Card
                    onClick={(event: React.MouseEvent<HTMLDivElement>) => {
                      if (event.target instanceof HTMLDivElement) {
                        document.body.style.overflow = 'hidden';
                        setPreviewPickDeckSlide(true);
                      }
                    }}
                    deck={deck}
                    handleClickDelete={() => handleClickDelete(deck._id)}
                  />
                  {previewPickDeckSlide && (
                    <DeckPreview
                      type="deckCreationPreview"
                      onClose={handleOnClosePitchDeckSlidePreview}
                      pageIndex={pageIndex}
                      file={deck.deckUrl}
                      numPages={deck.slides}
                      deckId={null}
                      setPageIndex={setPageIndex}
                    />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        ) : (
          <EmptyState
            title="Zero pitchdecks at the moment."
            subtitle="Why not be the first to create one and kickstart the fun?"
            button={
              <Link
                className={`${styles.link} hover:no-underline`}
                to="/founder/deck/create"
                state={{
                  deckListLength: deckList.length,
                }}
              >
                <Button
                  type="button"
                  text="Create New Deck"
                  icon={<img src={whiteTopRightArrow} alt="Arrow" />}
                  backgroundColor="#F1511B"
                  textColor="#FFF"
                />
              </Link>
            }
          />
        )}
      </MainLayout>
    </>
  );
}

export default MyDecks;
