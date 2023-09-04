/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import styles from './Input.module.css';
import { HideInputImage, ShowInputImage } from '@/assets/images';
import { ExplanationPopup } from '@/components';

export interface InputProps {
  required?: boolean;
  showExplanation?: boolean;
  explanationMessage?: string;
  labelColor?: React.CSSProperties;
  type?: string;
  style: 'password' | 'toggle' | 'upload' | 'default' | 'prefilled';
  placeholder?: string;
  id: string;
  label: string;
  value?: string;
  disabled?: boolean;
  onChange?: (value: any) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  inputIsInvalid?: boolean;
  errorMessage?: string;
  checked?: boolean;
  className?: string;
}

function Input({
  required = false,
  showExplanation = false,
  explanationMessage,
  labelColor,
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
  checked,
  className,
}: InputProps) {
  let inputElement: JSX.Element;

  const [isChecked, setIsChecked] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [prefilledInputHasValue, setPrefilledInputHasValue] = useState(!!value);

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

  const onPrefilledInputEntered = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (onChange) {
      onChange(event.target.value);
    }

    if (event.target.value.length > 0) {
      setPrefilledInputHasValue(!!event.target.value);
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
          <div className="flex flex-row gap-2 items-center relative">
            <label style={labelColor} htmlFor={id}>
              {label}
            </label>
            {showExplanation && (
              <ExplanationPopup
                message={explanationMessage as string}
                showIcon
              />
            )}
          </div>
          <div className={styles.defaultInputContainer}>
            <input
              required={required}
              disabled={disabled}
              id={id}
              type={showPassword ? 'text' : 'password'}
              placeholder={placeholder}
              value={value}
              onChange={onDefaultInputEntered}
              className={`${
                value ? styles.defaultInputWithValue : styles.defaultInput
              } ${className}`}
              onBlur={onBlur}
            />
            <img
              className={styles.hideInputText}
              src={showPassword ? ShowInputImage : HideInputImage}
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
          <div className="flex flex-row gap-2 items-center relative">
            <label style={labelColor} htmlFor={id}>
              {label}
            </label>
            {showExplanation && (
              <ExplanationPopup
                message={explanationMessage as string}
                showIcon
              />
            )}
          </div>
          <label
            htmlFor={id}
            className={`${styles.toggleSwitch} ${
              isChecked ? styles.checked : ''
            }`}
          >
            <input
              required={required}
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
          <div className={styles.UploadFileInputWrapper}>
            <label htmlFor={id} className={styles.fileInput}>
              {label}
              <div className={styles.uploadInput}>
                <input
                  required={required}
                  disabled={disabled}
                  id={id}
                  type="file"
                  value={value}
                  accept=".pdf"
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
          <div className="flex flex-row gap-2 items-center relative">
            <label style={labelColor} htmlFor={id}>
              {label}
            </label>
            {showExplanation && (
              <ExplanationPopup
                message={explanationMessage as string}
                showIcon
              />
            )}
          </div>
          <input
            required={required}
            disabled={disabled}
            type={type}
            id={id}
            placeholder={placeholder}
            value={value}
            onChange={onDefaultInputEntered}
            className={`${
              value ? styles.defaultInputWithValue : styles.defaultInput
            } ${className}`}
            onBlur={onBlur}
          />
          {inputIsInvalid && (
            <p className={styles.errorMessage}>{errorMessage}</p>
          )}
        </div>
      );
      break;
    case 'prefilled':
      inputElement = (
        <div className={styles.InputWrapper}>
          <div className="flex flex-row gap-2 items-center relative">
            <label style={labelColor} htmlFor={id}>
              {label}
            </label>
            {showExplanation && (
              <ExplanationPopup
                message={explanationMessage as string}
                showIcon
              />
            )}
          </div>
          <div
            className={
              prefilledInputHasValue
                ? styles.prefilledInputWrapperWithValue
                : styles.prefilledInputWrapper
            }
          >
            <label className={styles.placeholder} htmlFor={id}>
              preview/
            </label>
            <input
              required={required}
              disabled={disabled}
              type={type}
              id={id}
              value={value}
              onChange={onPrefilledInputEntered}
              placeholder="example"
              className={`${styles.prefilledInput} ${className}`}
              onBlur={onBlur}
            />
          </div>
          {inputIsInvalid && (
            <p className={styles.errorMessage}>{errorMessage}</p>
          )}
        </div>
      );
      break;
    default:
      inputElement = (
        <div className={styles.InputWrapper}>
          <div className="flex flex-row gap-2 items-center relative">
            <label style={labelColor} htmlFor={id}>
              {label}
            </label>
            {showExplanation && (
              <ExplanationPopup
                message={explanationMessage as string}
                showIcon
              />
            )}
          </div>
          <input
            required={required}
            disabled={disabled}
            type={type}
            id={id}
            placeholder={placeholder}
            value={value}
            onChange={onDefaultInputEntered}
            className={`${
              value ? styles.defaultInputWithValue : styles.defaultInput
            } ${className}`}
            onBlur={onBlur}
          />
          {inputIsInvalid && (
            <p className={styles.errorMessage}>{errorMessage}</p>
          )}
        </div>
      );
      break;
  }

  useEffect(() => {
    setIsChecked(!!checked);
    setPrefilledInputHasValue(!!value);
  }, [checked, value]);

  return <div className={styles.inputContainer}>{inputElement}</div>;
}

export { Input };
