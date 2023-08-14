import Lottie from 'lottie-react';
import animationData from '../../assets/animatedIcons/animated-loader.json';

function AnimatedLoader() {
  return <Lottie style={{ height: 45 }} animationData={animationData} />;
}

export default AnimatedLoader;
