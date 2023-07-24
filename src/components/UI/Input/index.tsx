import React, { useState } from 'react';
import styles from './Input.module.css';
import hideInputText from '../../../assets/images/HideInput.png';
import showInputText from '../../../assets/images/ShowInput.png';
import uploadFileIcon from '../../../assets/images/ArrowTopRight.svg';

export interface InputProps {
  type?: string;
  style: 'password' | 'toggle' | 'upload' | 'default';
  placeholder?: string;
  id: string;
  label: string;
  value?: string;
  onChange?: (value: string) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
}

function Input({
  style,
  type,
  placeholder,
  id,
  label,
  value,
  onChange,
  onBlur,
}: InputProps) {
  let inputElement: JSX.Element;

  const [isChecked, setIsChecked] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   if (onChange) {
  //     onChange(event.target.value);
  //   }

  const onDefaultInputEntered = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (onChange) {
      onChange(event.target.value);
    }
  };

  const onFileInputEntered = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(event.target.value);
    }
  };

  const onToggleInputEntered = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(event.target.value);
    }

    if (isChecked) {
      setIsChecked(false);
    }

    if (!isChecked) {
      setIsChecked(true);
    }

    if (onChange) {
      onChange(event.target.value);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  switch (style) {
    case 'password':
      inputElement = (
        <div className={styles.InputWrapper}>
          <label htmlFor={id}>{label}</label>
          <div className={styles.defaultInputContainer}>
            <input
              id={id}
              type={showPassword ? 'text' : 'password'}
              placeholder={placeholder}
              value={value}
              onChange={onDefaultInputEntered}
              className={
                value ? styles.defaultInputWithValue : styles.defaultInput
              }
              onBlur={onBlur}
            />
            <img
              className={styles.hideInputText}
              src={showPassword ? showInputText : hideInputText}
              alt={showPassword ? 'Hide Password' : 'Show Password'}
              onClick={togglePasswordVisibility}
            />
          </div>
        </div>
      );
      break;
    case 'toggle':
      inputElement = (
        <div className={styles.InputWrapper}>
          <label htmlFor={id}>{label}</label>
          <label
            htmlFor={id}
            className={`${styles.toggleSwitch} ${
              isChecked ? styles.checked : ''
            }`}
          >
            <input
              id={id}
              type="checkbox"
              value={value}
              onChange={onToggleInputEntered}
              checked={isChecked}
            />
            <span className={styles.toggleSlider} />
          </label>
        </div>
      );
      break;
    case 'upload':
      inputElement = (
        <div className={styles.InputWrapper}>
          <label htmlFor={id}>{label}</label>
          <div className={styles.UploadFileInputWrapper}>
            <label htmlFor={id} className={styles.fileInput}>
              Upload Deck File <img src={uploadFileIcon} alt="" />
              <div className={styles.uploadInput}>
                <input
                  id={id}
                  type="file"
                  value={value}
                  onChange={onFileInputEntered}
                />
              </div>
            </label>
          </div>
        </div>
      );
      break;
    case 'default':
      inputElement = (
        <div className={styles.InputWrapper}>
          <label htmlFor={id}>{label}</label>
          <input
            type={type}
            id={id}
            placeholder={placeholder}
            value={value}
            onChange={onDefaultInputEntered}
            className={
              value ? styles.defaultInputWithValue : styles.defaultInput
            }
            onBlur={onBlur}
          />
        </div>
      );
      break;
    default:
      inputElement = (
        <div className={styles.InputWrapper}>
          <label htmlFor={id}>{label}</label>
          <input
            type={type}
            id={id}
            placeholder={placeholder}
            value={value}
            onChange={onDefaultInputEntered}
            className={
              value ? styles.defaultInputWithValue : styles.defaultInput
            }
            onBlur={onBlur}
          />
        </div>
      );
      break;
  }

  return <div className={styles.inputContainer}>{inputElement}</div>;
}

export default Input;
