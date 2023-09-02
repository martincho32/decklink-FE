import React, { useContext, useState } from 'react';
import styles from './AskEmailPassword.module.css';
import { Input, Button } from '@/components/UI';
import { Logo } from '@/components/icons';
import { UIContext } from '@/context';

export interface AskEmailPasswordProps {
  // onClose: (event) => void;
  onSubmit: (email: string, password?: string) => void;
}

function AskEmailPassword({ onSubmit }: AskEmailPasswordProps) {
  const { isShowModal, hasEmailRequired, hasPasswordRequired } =
    useContext(UIContext);

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

  const isFormInvalid = (): boolean => {
    if (hasEmailRequired && hasPasswordRequired) {
      return passwordInputIsInvalid || emailInputIsInvalid;
    }
    if (hasEmailRequired && !hasPasswordRequired) {
      return emailInputIsInvalid;
    }
    return passwordInputIsInvalid;
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setEnteredEmailTouched(true);
    setEnteredPasswordTouched(true);

    onSubmit(
      hasEmailRequired ? email : '',
      hasPasswordRequired ? password : ''
    );
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
        display: isShowModal ? 'block' : 'none',
        overflowY: 'hidden',
      }}
    >
      <div
        role="button"
        tabIndex={0}
        // onClick={onClose}
        id="containerClose"
        className={styles.modal}
      >
        <div className={styles.modalContent}>
          <form onSubmit={handleFormSubmit}>
            {hasPasswordRequired && hasEmailRequired && (
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
            )}
            {hasEmailRequired && !hasPasswordRequired && (
              <div className={styles.infoTextWrapper}>
                <p className={styles.infoText}>
                  For this presentation, you need to enter your email
                </p>
              </div>
            )}
            {hasPasswordRequired && !hasEmailRequired && (
              <div className={styles.infoTextWrapper}>
                <p className={styles.infoText}>
                  For this presentation, you need to enter your password
                </p>
                <p className={styles.infoText}>
                  If you do not know the password to the presentation - ask the
                  person who gave you the link to this presentation
                </p>
              </div>
            )}

            {hasEmailRequired && (
              <div className={emailInputClasses}>
                <Input
                  required
                  labelColor={{ color: 'var(--white-color)' }}
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
            )}
            {hasPasswordRequired && (
              <div className={passwordInputClasses}>
                <Input
                  required
                  labelColor={{ color: 'var(--white-color)' }}
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
            )}
            <Button
              disabled={isFormInvalid()}
              type="submit"
              text="Continue"
              icon={<Logo color="var(--white-color)" />}
              backgroundColor="var(--primary-color)"
              textColor="var(--white-color)"
              className="w-full"
            />
          </form>
        </div>
      </div>
    </div>
  );
}

export default AskEmailPassword;
