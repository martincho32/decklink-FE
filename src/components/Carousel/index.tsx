import Carousel from 'react-spring-3d-carousel';
import { useState, useEffect } from 'react';
import { config } from 'react-spring';

function Carrousel({ cards, offset, width, height, margin }) {
  const [offsetRadius, setOffsetRadius] = useState(1);
  const [showArrows, setShowArrows] = useState(false);
  const [goToSlide, setGoToSlide] = useState(null);

  const table = cards.map((element, index) => {
    return { ...element, onClick: () => setGoToSlide(index) };
  });

  const [cards1] = useState(table);

  useEffect(() => {
    setOffsetRadius(offset);
    setShowArrows(showArrows);
  }, [offset, showArrows]);

  return (
    <div style={{ width, height, margin }}>
      <Carousel
        slides={cards1}
        goToSlide={goToSlide!}
        offsetRadius={offsetRadius}
        showNavigation={showArrows}
        animationConfig={config.gentle}
        offsetFn={(offsetFromCenter) => ({
          opacity: 1 - Math.abs(offsetFromCenter) / 4,
        })}
      />
    </div>
  );
}

export default Carrousel;
