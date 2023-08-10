import { useState } from 'react';
import { useSpring, animated } from 'react-spring';
import Styles from './Card.module.css';

function CarouselCard({ image }) {
  const [show, setShown] = useState(false);

  const props3 = useSpring({
    transform: show ? 'scale(1.03)' : 'scale(1)',
    boxShadow: show
      ? '0 20px 25px rgb(0 0 0 / 25%)'
      : '0 2px 10px rgb(0 0 0 / 8%)',
  });
  return (
    <animated.div
      id="animated"
      className={Styles.card}
      style={props3}
      onMouseEnter={() => setShown(true)}
      onMouseLeave={() => setShown(false)}
    >
      <img src={image} alt="" />
    </animated.div>
  );
}

export default CarouselCard;
