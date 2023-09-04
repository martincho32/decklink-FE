import { Input } from '@/components/UI';
import SignUpFormData from '../../models/signup';

export interface RequiredSignUpInfoProps {
  formData: SignUpFormData;
  setFormData: ({
    email,
    password,
    confirmPassword,
    companyName,
    companyWebUrl,
  }: SignUpFormData) => void;
  companyNameInputClasses;
  companyNameIsInvalid;
  setEnternedCompanyNameTouched;
}

function RequiredSignUpInfo({
  formData,
  setFormData,
  companyNameInputClasses,
  companyNameIsInvalid,
  setEnternedCompanyNameTouched,
}: RequiredSignUpInfoProps) {
  const handleCompanyNameChange = (value: string) => {
    setFormData({ ...formData, companyName: value });
  };

  const companyNameInputBlur = () => {
    setEnternedCompanyNameTouched(true);
  };

  const handleCompanyWebsiteChange = (value: string) => {
    setFormData({ ...formData, companyWebUrl: value });
  };

  // const handleCompanyLinkedinChange = (value: string) => {
  //   setFormData({ ...formData, companyLinkedInUrl: value });
  // };

  return (
    <>
      <div className={companyNameInputClasses}>
        <Input
          required
          style="default"
          type="text"
          placeholder="Apple"
          label="Your Company Name"
          id="your-company-name"
          value={formData.companyName}
          inputIsInvalid={companyNameIsInvalid}
          errorMessage="Company name must be at least 2 characters long"
          onChange={handleCompanyNameChange}
          onBlur={companyNameInputBlur}
        />
      </div>
      <Input
        required
        style="default"
        type="text"
        placeholder="apple.com"
        label="Your Company Website"
        id="your-company-website"
        value={formData.companyWebUrl}
        onChange={handleCompanyWebsiteChange}
      />
      {/* <Input
        required
        style="default"
        type="text"
        placeholder="linkedin.com/apple"
        label="Your Comapny Linkedin"
        id="your-company-linkedin"
        value={formData.companyLinkedInUrl}
        onChange={handleCompanyLinkedinChange}
      /> */}
    </>
  );
}

export default RequiredSignUpInfo;
