import React, { useState } from 'react';
import styles from './Input.module.css';
import hideInputText from '../assets/images/HideInput.png';
import showInputText from '../assets/images/ShowInput.png';
import uploadFileIcon from '../assets/images/ArrowTopRight.svg';

interface InputProps {
  type?,
  style: 'password' | 'toggle' | 'upload' | 'default';
  placeholder?: string;
  id: string;
  label: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({
  style,
  type,
  placeholder,
  id,
  label,
  onChange,
}) => {
  let inputElement: JSX.Element;

  const [inputValue, setInputValue] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onInputEntered = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
    if (onChange) {
      onChange(event);
    }
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
              onChange={onInputEntered}
              className={inputValue ? styles.defaultInputWithValue : styles.defaultInput}
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
            className={`${styles.toggleSwitch} ${
              isChecked ? styles.checked : ''
            }`}
          >
            <input
              id={id}
              type="checkbox"
              onChange={handleInputChange}
              checked={isChecked}
            />
            <span className={styles.toggleSlider}></span>
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
            </label>
            <div className={styles.uploadInput}>
              <input id={id} type="file" onChange={onChange} />
            </div>
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
            onChange={onInputEntered}
            className={inputValue ? styles.defaultInputWithValue : styles.defaultInput}
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
            onChange={onInputEntered}
            className={inputValue ? styles.defaultInputWithValue : styles.defaultInput}
            />
        </div>
      );
      break;
  }

  return <div className={styles.inputContainer}>{inputElement}</div>;
};

export default Input;


{/* <Input type="password" placeholder="Enter text" label="Password" id="passwod" onChange={handleInputChange} />
<Input type="toggle" label="True or False" id="true-or-false" onChange={handleInputChange} />
<Input type="upload" label="Upload File" id="upload" onChange={handleInputChange} /> */}
