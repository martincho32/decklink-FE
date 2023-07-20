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

  const handleEmailChange = (value: string) => {
    setFormData({ ...formData, email: value });
    console.log('email: ', value);
  };

  const handlePasswordChange = (value: string) => {
    setFormData({ ...formData, password: value });
    console.log('password: ', value);
  };

  const handleRepeatPasswordChange = (value: string) => {
    setFormData({ ...formData, confirmPassword: value });
    console.log('repeat password: ', value);
  };

  return (
    <>
      <Input
        style="default"
        type="email"
        placeholder="example@gmail.com"
        label="Your Email"
        id="email"
        value={formData.email}
        onChange={handleEmailChange}
      />
      <Input
        style="password"
        placeholder="******"
        label="Password"
        id="passwod"
        value={formData.password}
        onChange={handlePasswordChange}
      />
      <Input
        style="password"
        placeholder="******"
        label="Repeat Your Password"
        id="repeat-password"
        value={formData.confirmPassword}
        onChange={handleRepeatPasswordChange}
      />
    </>
  );
}

export default RequiredSignUpInfo;
