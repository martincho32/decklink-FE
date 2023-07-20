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
  // const [email, setEmail] = useState<string>('');
  // const [password, setPassword] = useState<string>('');
  // const [repeatPassword, setRepeatPassword] = useState<string>('');

  const handleCompanyNameChange = (value: string) => {
    setFormData({ ...formData, companyName: value });
    console.log('company name: ', value);
  };

  const handleCompanyWebsiteChange = (value: string) => {
    setFormData({ ...formData, companyWebUrl: value });
    console.log('company website: ', value);
  };

  const handleCompanyLinkedinChange = (value: string) => {
    setFormData({ ...formData, companyLinkedInUrl: value });
    console.log('company linkedin: ', value);
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
