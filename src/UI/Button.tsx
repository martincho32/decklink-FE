import React from 'react';
import styles from './Button.module.css';

interface ButtonProps {
  text?: string;
  icon?: React.ReactNode;
  backgroundColor?: string;
  borderColor?: string;
  textColor?: string;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({
  text,
  icon,
  backgroundColor,
  borderColor,
  textColor,
  onClick,
}) => {
  let buttonStyles = styles.button;

  if (backgroundColor) {
    buttonStyles += ` ${styles.backgroundColor}`;
  }

  if (borderColor) {
    buttonStyles += ` ${styles.borderColor}`;
  }

  if (icon && !text) {
    buttonStyles += ` ${styles.onlyIcon}`;
  }

  return (
    <button className={buttonStyles} style={{ backgroundColor, borderColor, color: textColor }} onClick={onClick}>
      {text}
      {icon && <span className={styles.icon}>{icon}</span>}
    </button>
  );
};

export default Button;



// Using of Different Button Styles
{/* 
<Button text="Log In To VC Account" icon={<img src={whiteTopRightArrow} alt="Arrow" />} backgroundColor="#F1511B" textColor="#FFF" onClick={handleButtonLogInToVCAccount}/>
<Button text="Log In To Founder Account" icon={<img src={orangeTopRightArrow} alt="Arrow" />} borderColor="#F1511B" textColor="#F1511B" onClick={handleButtonLogInToFounderAccount} />      
<Button text="Button 3" icon={<img src={orangeTopRightArrow} alt="Arrow" />} textColor="#F1511B" onClick={handleButtonLogInToFounderAccount} />        
<Button icon={<img src={orangeTopRightArrow} alt="Arrow" />} backgroundColor="black" onClick={handleButtonLogInToFounderAccount} /> 
*/}
