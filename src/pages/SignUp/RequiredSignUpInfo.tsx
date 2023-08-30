import { useState } from 'react';
import { Input } from '../../components';
import SignUpFormData from '../../models/signup';

export interface RequiredSignUpInfoProps {
  formData: SignUpFormData;
  setFormData: ({
    email,
    firstName,
    lastName,
    password,
    confirmPassword,
    companyName,
    companyWebUrl,
  }: SignUpFormData) => void;
  emailInputClasses: string;
  emailInputIsInvalid: boolean;
  firstNameInputClasses: string;
  firstNameInputIsInvalid: boolean;
  lastNameInputClasses: string;
  lastNameInputIsInvalid: boolean;
  passwordInputClasses: string;
  passwordInputIsInvalid: boolean;
  repeatPasswordInputClasses: string;
  repeatPasswordInputIsInvalid: boolean;
  allowEmailsInputClasses: string;
  setEnteredEmailTouched;
  setEnteredFirstNameTouched;
  setEnteredLastNameTouched;
  setEnteredPasswordTouched;
  setEnteredRepeatPasswordTouched;
}

function RequiredSignUpInfo({
  formData,
  setFormData,
  emailInputClasses,
  emailInputIsInvalid,
  firstNameInputClasses,
  firstNameInputIsInvalid,
  lastNameInputClasses,
  lastNameInputIsInvalid,
  passwordInputClasses,
  passwordInputIsInvalid,
  repeatPasswordInputClasses,
  repeatPasswordInputIsInvalid,
  allowEmailsInputClasses,
  setEnteredEmailTouched,
  setEnteredFirstNameTouched,
  setEnteredLastNameTouched,
  setEnteredPasswordTouched,
  setEnteredRepeatPasswordTouched,
}: RequiredSignUpInfoProps) {
  const [allowEmailsToogleChecked, setAllowEmailsToogleChecked] =
    useState<boolean>(true);

  const handleEmailChange = (value: string) => {
    setFormData({ ...formData, email: value });
  };

  const emailInputBlur = () => {
    setEnteredEmailTouched(true);
  };

  const handleFirstNameChange = (value: string) => {
    setFormData({ ...formData, firstName: value });
  };

  const firstNameInputBlur = () => {
    setEnteredFirstNameTouched(true);
  };

  const handleLastNameChange = (value: string) => {
    setFormData({ ...formData, lastName: value });
  };

  const lastNameInputBlur = () => {
    setEnteredLastNameTouched(true);
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

  const handleAllowEmailsChange = () => {
    setFormData({
      ...formData,
      allowEmails: !allowEmailsToogleChecked,
    });
    setAllowEmailsToogleChecked(!allowEmailsToogleChecked);
  };

  return (
    <>
      <div className={emailInputClasses}>
        <Input
          required
          style="default"
          type="email"
          placeholder="example@gmail.com"
          label="Your Email *"
          id="email"
          value={formData.email}
          inputIsInvalid={emailInputIsInvalid}
          errorMessage="Enter valid email address"
          onChange={handleEmailChange}
          onBlur={emailInputBlur}
          className="tablet:!max-w-none"
        />
      </div>
      <div className={firstNameInputClasses}>
        <Input
          required
          style="default"
          type="text"
          placeholder="Jhon"
          label="Your First Name *"
          id="firstName"
          value={formData.firstName}
          inputIsInvalid={firstNameInputIsInvalid}
          errorMessage="First name must be at least 1 characters long"
          onChange={handleFirstNameChange}
          onBlur={firstNameInputBlur}
          className="tablet:!max-w-none"
        />
      </div>
      <div className={lastNameInputClasses}>
        <Input
          required
          style="default"
          type="text"
          placeholder="Kullo"
          label="Your Last Name *"
          id="lastName"
          value={formData.lastName}
          inputIsInvalid={lastNameInputIsInvalid}
          errorMessage="Last name must be at least 1 characters long"
          onChange={handleLastNameChange}
          onBlur={lastNameInputBlur}
          className="tablet:!max-w-none"
        />
      </div>
      <div className={passwordInputClasses}>
        <Input
          required
          style="password"
          placeholder="******"
          label="Password *"
          id="passwod"
          value={formData.password}
          inputIsInvalid={passwordInputIsInvalid}
          errorMessage="Password must be 6-35 characters long"
          onChange={handlePasswordChange}
          onBlur={passwordInputBlur}
          className="tablet:!max-w-none"
        />
      </div>
      <div className={repeatPasswordInputClasses}>
        <Input
          required
          style="password"
          placeholder="******"
          label="Repeat Your Password *"
          id="repeat-password"
          value={formData.confirmPassword}
          inputIsInvalid={repeatPasswordInputIsInvalid}
          errorMessage="Passwords do not match"
          onChange={handleRepeatPasswordChange}
          onBlur={repeatPasswordInputBlur}
          className="tablet:!max-w-none"
        />
      </div>
      <div className={allowEmailsInputClasses}>
        <Input
          showExplanation
          explanationMessage="Allow us to send you weekly updates of your pitch decks and notifications that someone is viewing your pitch deck to your email. No spam messages. "
          style="toggle"
          label="Allow sending update emails *"
          id="allowEmails"
          checked={allowEmailsToogleChecked}
          onChange={handleAllowEmailsChange}
          className="tablet:!max-w-none"
        />
      </div>
    </>
  );
}

export default RequiredSignUpInfo;
