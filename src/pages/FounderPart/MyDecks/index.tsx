/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-extra-boolean-cast */
import * as React from 'react';
import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSnackbar } from 'notistack';
// import { Carousel } from 'react-responsive-carousel';
// import 'react-responsive-carousel/lib/styles/carousel.min.css';
// import { v4 as uuidv4 } from 'uuid';
// import Carousel from 'react-spring-3d-carousel';
// import { config } from 'react-spring';

import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  EffectCoverflow,
} from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

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

// Import the useLoading hook
import useLoading from '../../../hooks/useLoading';
import { AuthContext } from '@/context';
import Popup from '@/components/UI/Popup';

const options = {
  cMapUrl: 'cmaps/',
  standardFontDataUrl: 'standard_fonts/',
};

function MyDecks() {
  const [previewPickDeckSlide, setPreviewPickDeckSlide] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [showFirstTimeModal, setShowFirstTimeModal] = useState<boolean>(true);

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

  // const slides = [
  //   {
  //     key: 'firstReview',
  //     content: <img src={firstReview} alt="1" />,
  //   },
  //   {
  //     key: 'secondReview',
  //     content: <img src={secondReview} alt="2" />,
  //   },
  //   {
  //     key: 'thirdReview',
  //     content: <img src={thirdReview} alt="3" />,
  //   },
  // ];

  // const [offsetRadius, setOffsetRadius] = useState(4);
  // const [showArrows, setShowArrows] = useState(false);
  // const [goToSlide, setGoToSlide] = useState(null);

  // const table = slides.map((element, index: any) => {
  //   return { ...element, onClick: () => setGoToSlide(index) };
  // });

  // const [cards] = useState(table);

  // useEffect(() => {
  //   setOffsetRadius(4);
  //   setShowArrows(false);
  // });

  // eslint-disable-next-line no-nested-ternary
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
          <div className="p-6 w-[50rem]">
            <h2 className="text-4xl leading-normal text-mirage w-[40rem]">
              Not getting as much
              <br />
              <span className="text-white p-2 bg-persimmon">
                VC meetings as you want?
              </span>
            </h2>
            <Swiper
              effect="coverflow"
              spaceBetween={50}
              slidesPerView={3}
              grabCursor
              centeredSlides
              coverflowEffect={{
                rotate: 0,
                stretch: 0,
                depth: 200,
                modifier: 5,
              }}
              modules={[EffectCoverflow, Pagination, Navigation]}
              className="swiper_container"
            >
              <SwiperSlide>
                <img src={firstReview} alt="slide_image" />
              </SwiperSlide>
              <SwiperSlide>
                <img src={secondReview} alt="slide_image" />
              </SwiperSlide>
              <SwiperSlide>
                <img src={thirdReview} alt="slide_image" />
              </SwiperSlide>
            </Swiper>
            {/* <img src="#" alt="" /> */}
            {/* <div
              className=""
              style={{
                width: '100%',
                height: '20rem',
              }}
            > */}
            {/* <Carousel
                goToSlide={goToSlide}
                offsetRadius={offsetRadius}
                showNavigation={showArrows}
                animationConfig={config.gentle}
                slides={cards}
              /> */}
            {/* </div> */}
            <Button
              type="button"
              text="Free Pitch Deck Review"
              icon={<Logo color="#FFFFFF" width="10" height="11" />}
              backgroundColor="#F1511B"
              textColor="#FFF"
              onClick={() => {
                console.log('test');
              }}
              className="py-3 w-32 z-10"
            />
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
