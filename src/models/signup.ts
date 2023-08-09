class SignUpFormData {
  email: string;

  firstName: string;

  lastName: string;

  password: string;

  confirmPassword: string;

  companyName: string;

  companyWebUrl: string;

  constructor(
    email: string,
    firstName: string,
    lastName: string,
    password: string,
    confirmPassword: string,
    comapnyName: string,
    companyWebUrl: string
  ) {
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.password = password;
    this.confirmPassword = confirmPassword;
    this.companyName = comapnyName;
    this.companyWebUrl = companyWebUrl;
  }
}

export default SignUpFormData;
