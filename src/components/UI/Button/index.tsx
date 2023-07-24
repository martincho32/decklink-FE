/* eslint-disable react/button-has-type */
import React from 'react';
import styles from './Button.module.css';

export interface ButtonProps {
  type: 'button' | 'submit' | 'reset' | undefined;
  text?: string;
  icon?: React.ReactNode;
  backgroundColor?: string;
  borderColor?: string;
  textColor?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
}

function Button({
  type,
  text,
  icon,
  backgroundColor,
  borderColor,
  textColor,
  onClick,
  className,
}: ButtonProps) {
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
    <button
      type={type}
      className={`${buttonStyles} ${className}`}
      style={{ backgroundColor, borderColor, color: textColor }}
      onClick={onClick || undefined}
    >
      {text}
      {icon && <span className={styles.icon}>{icon}</span>}
    </button>
  );
}

export default Button;

// Using of Different Button Styles
{
  /* 
<Button text="Log In To VC Account" icon={<img src={whiteTopRightArrow} alt="Arrow" />} backgroundColor="#F1511B" textColor="#FFF" onClick={handleButtonLogInToVCAccount}/>
<Button text="Log In To Founder Account" icon={<img src={orangeTopRightArrow} alt="Arrow" />} borderColor="#F1511B" textColor="#F1511B" onClick={handleButtonLogInToFounderAccount} />      
<Button text="Button 3" icon={<img src={orangeTopRightArrow} alt="Arrow" />} textColor="#F1511B" onClick={handleButtonLogInToFounderAccount} />        
<Button icon={<img src={orangeTopRightArrow} alt="Arrow" />} backgroundColor="black" onClick={handleButtonLogInToFounderAccount} /> 
*/
}
