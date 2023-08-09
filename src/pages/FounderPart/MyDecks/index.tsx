import * as React from 'react';
import { useContext, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import Carousel from 'react-spring-3d-carousel'; // packages
import { config } from 'react-spring'; // packages
import { MainLayout, Button, DeckPreview, Logo } from '../../../components';
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

const options = {
  cMapUrl: 'cmaps/',
  standardFontDataUrl: 'standard_fonts/',
};

function MyDecks() {
  const location = useLocation();
  const isFirstDeck = location.state?.isFirstDeck;
  const [previewPickDeckSlide, setPreviewPickDeckSlide] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [showFirstTimeModal, setShowFirstTimeModal] =
    useState<boolean>(isFirstDeck);
  const [showCalendly, setShowCalendly] = useState<boolean>(false);

  const handleOnClosePitchDeckSlidePreview = () => {
    document.body.style.overflow = 'auto';
    setPreviewPickDeckSlide(false);
  };

  const { user } = useContext(AuthContext);
  const { enqueueSnackbar } = useSnackbar();

  const [deckList, setDeckList] = useState<IDeck[]>([]);
  const [refresh, setRefresh] = useState(true);

  const handleClickDelete = async (id) => {
    try {
      const { data } = await deckService.deleteDeck(id, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (data) {
        setRefresh(!refresh);
      } else {
        throw new Error('Deck not found! Please contact support.');
      }
    } catch (error: any) {
      enqueueSnackbar(`Couldn't delete the deck. Please contact support.`, {
        variant: 'error',
        autoHideDuration: 10000,
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'right',
        },
      });
    }
  };

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
      })
      .catch(() => {
        enqueueSnackbar(`Couldn't load decks. Please contact support.`, {
          variant: 'error',
          autoHideDuration: 10000,
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'right',
          },
        });
      });
  });

  useEffect(() => {
    if (showFirstTimeModal) {
      document.body.style.overflow = 'hidden';
    }
    document.body.style.overflow = 'auto';
  }, [showFirstTimeModal]);

  const slides = [
    {
      key: 'firstReview',
      content: <img src={firstReview} alt="1" />,
    },
    {
      key: 'secondReview',
      content: <img src={secondReview} alt="2" />,
    },
    {
      key: 'thirdReview',
      content: <img src={thirdReview} alt="3" />,
    },
    {
      key: '2',
      content: <img src={thirdReview} alt="3" />,
    },
    {
      key: '3',
      content: <img src={thirdReview} alt="3" />,
    },
  ];

  const [offsetRadius, setOffsetRadius] = useState(1.5);
  const [showArrows, setShowArrows] = useState(false);
  const [goToSlide, setGoToSlide] = useState(1);

  const table = slides.map((element, index: any) => {
    return { ...element, onClick: () => setGoToSlide(index) };
  });

  const [cards] = useState(table);

  useEffect(() => {
    setOffsetRadius(1);
    setShowArrows(false);
  }, []);

  return isLoading ? (
    <Loading />
  ) : (
    <>
      {showFirstTimeModal && (
        <Popup
          isOpen
          onClose={() => {
            document.body.style.overflow = 'auto';
            setShowFirstTimeModal(false);
          }}
        >
          <div className="">
            <h2 className="mobilev:leading-normal desktopxl:text-5xl desktopxl:w-[50rem] desktopxl:leading-normal mobileh:text-2xl mobileh:w-[35rem] mobileh:leading-normal desktop:text-4xl desktop:leading-normal text-mirage desktop:w-[40rem] mb-8 mt-[-1rem] mobilev:mt-[-0.5rem]">
              Not getting as much
              <br />
              <span className="text-white p-2 mobilev:p-1 bg-persimmon">
                VC meetings as you want?
              </span>
            </h2>
            <div className="flex justify-between mobileh:mb-[-7rem] mobilev:mb-[-3rem] items-start mb-[-10rem]">
              <img
                src={reviewStats}
                className="desktopxl:max-h-[7rem] mobileh:max-h-[4rem] mobilev:max-h-[3rem] max-h-[5rem] h-auto"
                alt="Review Stats"
              />
              <img
                src={customImage}
                className="desktopxl:max-h-[17rem] mobileh:max-h-[10rem] mobilev:max-h-[7rem] max-h-[15rem] h-auto"
                aria-hidden
                alt="Custom Image"
              />
            </div>

            <div className="desktopxl:h-[20rem] mobilev:h-[6rem] mobileh:h-[15rem] w-full h-[15rem] mx-auto">
              <Carousel
                goToSlide={goToSlide !== null ? goToSlide : undefined}
                offsetRadius={offsetRadius}
                showNavigation={showArrows}
                animationConfig={config.gentle}
                slides={cards}
              />
            </div>

            <Button
              type="button"
              text="Free Pitch Deck Review"
              icon={<Logo color="#FFFFFF" width="10" height="11" />}
              backgroundColor="#F1511B"
              textColor="#FFF"
              onClick={() => {
                setShowFirstTimeModal(false);
                setShowCalendly(true);
              }}
              className="py-3 w-full mx-auto z-10"
            />
          </div>
        </Popup>
      )}
      {showCalendly && (
        <Popup
          isOpen
          onClose={() => {
            document.body.style.overflow = 'auto';
            setShowCalendly(false);
          }}
        >
          <div className="">
            <CalendlyIntegration />
          </div>
        </Popup>
      )}
      <MainLayout>
        {/* Display the loading screen if the backend request is still loading */}
        {!!deckList.length ? (
          <div className={styles.myDesksWrapper}>
            <div className={styles.pageNavigation}>
              <h2 className={styles.title}>
                Hi {user?.firstName}! Here is your created decks
              </h2>
              <Link
                className={`${styles.link} hover:no-underline`}
                to="/founder/deck/create"
              >
                <Button
                  type="button"
                  text="Create New Deck"
                  icon={<img src={whiteTopRightArrow} alt="Arrow" />}
                  backgroundColor="#F1511B"
                  textColor="#FFF"
                />
              </Link>
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
                      pageNumber={pageNumber}
                      file={deck.deckUrl}
                      options={options}
                      numPages={deck.slides}
                      setPreviewPickDeckSlide={setPreviewPickDeckSlide}
                      setPageNumber={setPageNumber}
                      deckId={null}
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
