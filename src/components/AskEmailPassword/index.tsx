import React, { useState } from 'react';
import styles from './AskEmailPassword.module.css';
import Input from '../UI/Input';
import Button from '../UI/Button';
import whiteTopRightArrow from '../../assets/images/ArrowTopRight.svg';

// Props interface for the component
export interface AskEmailPasswordProps {
  show: boolean;
  onClose: (event) => void;
  onSubmit: (email: string, password?: string) => void;
  showPasswordInput?: boolean;
}

function AskEmailPassword({
  show,
  onClose,
  onSubmit,
  showPasswordInput = false,
}: AskEmailPasswordProps) {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const [enteredEmailTouched, setEnteredEmailTouched] =
    useState<boolean>(false);
  const [enteredPasswordTouched, setEnteredPasswordTouched] =
    useState<boolean>(false);

  const enteredEmailIsValid =
    email.trim() !== '' && email.includes('@') && email.includes('.');
  const emailInputIsInvalid = !enteredEmailIsValid && enteredEmailTouched;

  const enteredPasswordIsValid = password.length >= 6 && password.length <= 35;
  const passwordInputIsInvalid =
    !enteredPasswordIsValid && enteredPasswordTouched;

  const handleEmailChange = (value: string) => {
    setEmail(value);
  };

  const emailInputBlur = () => {
    setEnteredEmailTouched(true);
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
  };

  const passwordInputBlur = () => {
    setEnteredPasswordTouched(true);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setEnteredEmailTouched(true);
    setEnteredPasswordTouched(true);

    if (!enteredEmailIsValid || !enteredPasswordIsValid) {
      return;
    }

    onSubmit(email, showPasswordInput ? password : '');
  };

  const emailInputClasses = emailInputIsInvalid
    ? `${styles.inputBlock} ${styles.inputBlockError}`
    : styles.inputBlock;

  const passwordInputClasses = passwordInputIsInvalid
    ? `${styles.inputBlock} ${styles.inputBlockError}`
    : styles.inputBlock;

  return (
    <div
      style={{
        display: show ? 'block' : 'none',
        overflowY: 'hidden',
      }}
    >
      <div
        role="button"
        tabIndex={0}
        onClick={onClose}
        id="containerClose"
        className={styles.modal}
      >
        <div className={styles.modalContent}>
          <form onSubmit={handleFormSubmit}>
            {showPasswordInput ? (
              <div className={styles.infoTextWrapper}>
                <p className={styles.infoText}>
                  For this presentation, you need to enter your email and
                  password
                </p>
                <p className={styles.infoText}>
                  If you do not know the password to the presentation - ask the
                  person who gave you the link to this presentation
                </p>
              </div>
            ) : (
              <div className={styles.infoTextWrapper}>
                <p className={styles.infoText}>
                  For this presentation, you need to enter your email
                </p>
              </div>
            )}

            <div className={emailInputClasses}>
              <Input
                required
                labelColor={{ color: '#fff' }}
                style="default"
                type="email"
                placeholder="example@gmail.com"
                label="Your Email"
                id="email"
                value={email}
                inputIsInvalid={emailInputIsInvalid}
                errorMessage="Enter valid email"
                onChange={handleEmailChange}
                onBlur={emailInputBlur}
                className="w-full"
              />
            </div>
            {showPasswordInput ? (
              <div className={passwordInputClasses}>
                <Input
                  required
                  labelColor={{ color: '#fff' }}
                  style="password"
                  placeholder="******"
                  label="Password"
                  id="passwod"
                  value={password}
                  inputIsInvalid={passwordInputIsInvalid}
                  errorMessage="Password must be 6-35 characters long"
                  onChange={handlePasswordChange}
                  onBlur={passwordInputBlur}
                  className="w-full"
                />
              </div>
            ) : null}
            <Button
              type="submit"
              text="Continue"
              icon={<img src={whiteTopRightArrow} alt="Arrow" />}
              backgroundColor="#F1511B"
              textColor="#FFF"
              className="w-full"
            />
          </form>
        </div>
      </div>
    </div>
  );
}

export default AskEmailPassword;
