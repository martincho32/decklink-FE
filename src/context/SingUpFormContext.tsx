import { createContext, useState } from 'react';
import SignUp from '../models/signup';

const SignUpFormContext = createContext({});

interface Props {
  children: JSX.Element;
}

export function SignUpFormProvider({ children }: Props) {
  const pageTitle = {
    0: 'Create Account 1',
    1: 'Create Account 2',
  };

  const [page, setPage] = useState(0);

  const [signUpFormData, setSignUpFormData] = useState<SignUp>({
    email: '',
    password: '',
    confirmPassword: '',
    companyName: '',
    companyWebUrl: '',
    companyLinkedInUrl: '',
  });

  const { companyName, companyWebUrl, companyLinkedInUrl, ...requiredInputs } =
    signUpFormData;

  const canSubmit =
    [...Object.values(requiredInputs)].every(Boolean) &&
    page === Object.keys(title).length - 1;

  return (
    <SignUpFormContext.Provider
      value={{
        pageTitle,
        page,
        setPage,
        signUpFormData,
        setSignUpFormData,
        canSubmit,
      }}
    >
      {children}
    </SignUpFormContext.Provider>
  );
}

export default SignUpFormContext;
