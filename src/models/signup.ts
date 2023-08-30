class SignUpFormData {
  email: string;

  firstName: string;

  lastName: string;

  password: string;

  confirmPassword: string;

  allowEmails: boolean;

  companyName: string;

  companyWebUrl: string;

  constructor(
    email: string,
    firstName: string,
    lastName: string,
    password: string,
    confirmPassword: string,
    allowEmails: boolean,
    comapnyName: string,
    companyWebUrl: string
  ) {
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.password = password;
    this.confirmPassword = confirmPassword;
    this.allowEmails = allowEmails;
    this.companyName = comapnyName;
    this.companyWebUrl = companyWebUrl;
  }
}

export default SignUpFormData;
