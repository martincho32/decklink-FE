import { BrandBlockImage } from '@/assets/images';
import './PreloadingScreen.css'; // Create a new CSS file for styles

export type Props = {
  small?: boolean;
};

function Preloading({ small }: Props) {
  if (small)
    return (
      <div className="fixed top-0 left-0 w-full h-full bg-persimmon flex flex-col justify-center items-center z-[10000000000]">
        <div className="loading-overlay" />
        <div className="spinner">
          {/* <img className="w-4 h-4" src={BrandBlock} alt="" /> */}
        </div>
        <div className="loading-text">Loading...</div>
      </div>
    );

  return (
    <div className="preloading-container">
      <div className="loading-overlay" />
      <div className="spinner">
        <img className="w-32 h-32" src={BrandBlockImage} alt="" />
      </div>
      <div className="loading-text">Loading...</div>
    </div>
  );
}

export default Preloading;
