import Input from '../../UI/Input/index';
import SignUpFormData from '../../models/signup';

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
}

function RequiredSignUpInfo({
  formData,
  setFormData,
}: RequiredSignUpInfoProps) {
  const handleCompanyNameChange = (value: string) => {
    setFormData({ ...formData, companyName: value });
  };

  const handleCompanyWebsiteChange = (value: string) => {
    setFormData({ ...formData, companyWebUrl: value });
  };

  const handleCompanyLinkedinChange = (value: string) => {
    setFormData({ ...formData, companyLinkedInUrl: value });
  };

  return (
    <>
      <Input
        style="default"
        type="text"
        placeholder="Apple"
        label="Your Company Name"
        id="your-company-name"
        value={formData.companyName}
        onChange={handleCompanyNameChange}
      />
      <Input
        style="default"
        type="text"
        placeholder="apple.com"
        label="Your Company Website"
        id="your-company-website"
        value={formData.companyWebUrl}
        onChange={handleCompanyWebsiteChange}
      />
      <Input
        style="default"
        type="text"
        placeholder="linkedin.com/apple"
        label="Your Comapny Linkedin"
        id="your-company-linkedin"
        value={formData.companyLinkedInUrl}
        onChange={handleCompanyLinkedinChange}
      />
    </>
  );
}

export default RequiredSignUpInfo;
