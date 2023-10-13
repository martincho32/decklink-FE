/* eslint-disable react/button-has-type */
import React from 'react';
import styles from './Button.module.css';

interface ButtonProps {
  id?: string;
  type: 'button' | 'submit' | 'reset' | undefined;
  text?: string;
  leftIcon?: React.ReactNode;
  icon?: React.ReactNode;
  backgroundColor?: string;
  borderColor?: string;
  textColor?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  onMouserEnter?;
  onMouserLeave?;
  className?: string;
  disabled?: boolean;
}

function Button({
  id,
  type,
  text,
  leftIcon,
  icon,
  backgroundColor,
  borderColor,
  textColor,
  onClick,
  onMouserEnter,
  onMouserLeave,
  className,
  disabled,
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
      id={id}
      type={type}
      className={`${buttonStyles} ${className}`}
      style={{ backgroundColor, borderColor, color: textColor }}
      onClick={onClick || undefined}
      onMouseEnter={onMouserEnter}
      onMouseLeave={onMouserLeave}
      disabled={disabled}
    >
      {leftIcon && <span className={`${styles.icon} mr-2`}>{leftIcon}</span>}
      {text}
      {icon && <span className={styles.icon}>{icon}</span>}
    </button>
  );
}

export { Button };
