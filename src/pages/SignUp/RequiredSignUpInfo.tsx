import { Input } from '../../components';
import SignUpFormData from '../../models/signup';
import styles from './SignUp.module.css';

export interface RequiredSignUpInfoProps {
  formData: SignUpFormData;
  setFormData: ({
    email,
    password,
    confirmPassword,
    companyName,
    companyWebUrl,
    companyLinkedInUrl,
  }: SignUpFormData) => void;
  emailInputClasses: string;
  emailInputIsInvalid: boolean;
  passwordInputClasses: string;
  passwordInputIsInvalid: boolean;
  repeatPasswordInputClasses: string;
  repeatPasswordInputIsInvalid: boolean;
  setEnteredEmailTouched;
  setEnteredPasswordTouched;
  setEnteredRepeatPasswordTouched;
}

function RequiredSignUpInfo({
  formData,
  setFormData,
  emailInputClasses,
  emailInputIsInvalid,
  passwordInputClasses,
  passwordInputIsInvalid,
  repeatPasswordInputClasses,
  repeatPasswordInputIsInvalid,
  setEnteredEmailTouched,
  setEnteredPasswordTouched,
  setEnteredRepeatPasswordTouched,
}: RequiredSignUpInfoProps) {
  const handleEmailChange = (value: string) => {
    setFormData({ ...formData, email: value });
  };

  const emailInputBlur = () => {
    setEnteredEmailTouched(true);
  };

  const handlePasswordChange = (value: string) => {
    setFormData({ ...formData, password: value });
  };

  const passwordInputBlur = () => {
    setEnteredPasswordTouched(true);
  };

  const handleRepeatPasswordChange = (value: string) => {
    setFormData({ ...formData, confirmPassword: value });
  };

  const repeatPasswordInputBlur = () => {
    setEnteredRepeatPasswordTouched(true);
  };

  return (
    <>
      <div className={emailInputClasses}>
        <Input
          style="default"
          type="email"
          placeholder="example@gmail.com"
          label="Your Email"
          id="email"
          value={formData.email}
          onChange={handleEmailChange}
          onBlur={emailInputBlur}
        />
        {emailInputIsInvalid && (
          <p className={styles.errorMessage}>Enter valid email address</p>
        )}
      </div>
      <div className={passwordInputClasses}>
        <Input
          style="password"
          placeholder="******"
          label="Password"
          id="passwod"
          value={formData.password}
          onChange={handlePasswordChange}
          onBlur={passwordInputBlur}
        />
        {passwordInputIsInvalid && (
          <p className={styles.errorMessage}>
            Password must be 6-35 characters long
          </p>
        )}
      </div>
      <div className={repeatPasswordInputClasses}>
        <Input
          style="password"
          placeholder="******"
          label="Repeat Your Password"
          id="repeat-password"
          value={formData.confirmPassword}
          onChange={handleRepeatPasswordChange}
          onBlur={repeatPasswordInputBlur}
        />
        {repeatPasswordInputIsInvalid && (
          <p className={styles.errorMessage}>Passwords do not match</p>
        )}
      </div>
    </>
  );
}

export default RequiredSignUpInfo;
