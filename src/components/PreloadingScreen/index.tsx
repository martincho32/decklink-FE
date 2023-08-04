import BrandBlock from '../../assets/images/BrandBlock.png';
import './PreloadingScreen.css'; // Create a new CSS file for styles

function Preloading() {
  return (
    <div className="preloading-container">
      <div className="loading-overlay" />
      <div className="spinner">
        <img className="w-32 h-32" src={BrandBlock} alt="" />
      </div>
      <div className="loading-text">Loading...</div>
    </div>
  );
}

export default Preloading;
