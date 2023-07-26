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
  disabled?: boolean;
  onChange?: (value: any) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  inputIsInvalid?: boolean;
  errorMessage?: string;
}

function Input({
  style,
  type,
  placeholder,
  id,
  label,
  value,
  disabled,
  onChange,
  onBlur,
  inputIsInvalid,
  errorMessage,
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
      onChange(event.target);
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
              disabled={disabled}
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
          {inputIsInvalid && (
            <p className={styles.errorMessage}>{errorMessage}</p>
          )}
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
              disabled={disabled}
              id={id}
              type="checkbox"
              value={value}
              onChange={onToggleInputEntered}
              checked={isChecked}
            />
            <span className={styles.toggleSlider} />
          </label>
          {inputIsInvalid && (
            <p className={styles.errorMessage}>{errorMessage}</p>
          )}
        </div>
      );
      break;
    case 'upload':
      inputElement = (
        <div className={styles.InputWrapper}>
          <label htmlFor={id}>{label}</label>
          <div className={styles.UploadFileInputWrapper}>
            <label htmlFor={id} className={styles.fileInput}>
              {label} <img src={uploadFileIcon} alt="" />
              <div className={styles.uploadInput}>
                <input
                  disabled={disabled}
                  id={id}
                  type="file"
                  value={value}
                  onChange={onFileInputEntered}
                />
              </div>
            </label>
          </div>
          {inputIsInvalid && (
            <p className={styles.errorMessage}>{errorMessage}</p>
          )}
        </div>
      );
      break;
    case 'default':
      inputElement = (
        <div className={styles.InputWrapper}>
          <label htmlFor={id}>{label}</label>
          <input
            disabled={disabled}
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
          {inputIsInvalid && (
            <p className={styles.errorMessage}>{errorMessage}</p>
          )}
        </div>
      );
      break;
    default:
      inputElement = (
        <div className={styles.InputWrapper}>
          <label htmlFor={id}>{label}</label>
          <input
            disabled={disabled}
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
          {inputIsInvalid && (
            <p className={styles.errorMessage}>{errorMessage}</p>
          )}
        </div>
      );
      break;
  }

  return <div className={styles.inputContainer}>{inputElement}</div>;
}

export default Input;
