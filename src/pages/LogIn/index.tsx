import { Link } from 'react-router-dom';
import { useState } from 'react';
import Input from '../../UI/Input';
import Button from '../../UI/Button';
import whiteTopRightArrow from '../../assets/images/ArrowTopRight.svg';
import styles from './LogIn.module.css';
import graphImageFlying from '../../assets/images/graph-image-flying.png';
import graphImageStanding from '../../assets/images/graph-image-standing.png';
import { MainLayout } from '../../components/layouts';

function LogIn({ title }: { title: string }) {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [repeatPassword, setRepeatPassword] = useState<string>('');

  console.log('title: ', title);

  const handleEmailChange = (value: string) => {
    setEmail(value);
    console.log('email: ', value);
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    console.log('password: ', value);
  };

  const handleRepeatPasswordChange = (value: string) => {
    setRepeatPassword(value);
    console.log('repeat password: ', value);
  };

  const submitHandler = () => {
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('Repeat Password:', repeatPassword);
  };

  return (
    <MainLayout>
      <div className={styles.blockContainer}>
        <img
          className={styles.imgTopRight}
          src={graphImageFlying}
          alt="graphImageStanding"
        />
        <img
          className={styles.imgBotLeft}
          src={graphImageStanding}
          alt="graphImageStanding"
        />
        <div className={styles.formWrapper}>
          {/* set title from props here */}
          <h1 className={styles.headingStyle}>Log In To VC Account</h1>
          <form
            onSubmit={submitHandler}
            className={styles.form}
            action="submit"
          >
            <Input
              style="default"
              type="email"
              placeholder="example@gmail.com"
              label="Your Email"
              id="email"
              value={email}
              onChange={handleEmailChange}
            />
            <Input
              style="password"
              placeholder="******"
              label="Password"
              id="passwod"
              value={password}
              onChange={handlePasswordChange}
            />
            <Input
              style="password"
              placeholder="******"
              label="Repeat Your Password"
              id="repeat-password"
              value={repeatPassword}
              onChange={handleRepeatPasswordChange}
            />
            <Button
              type="submit"
              text="Log In"
              icon={<img src={whiteTopRightArrow} alt="Arrow" />}
              backgroundColor="#F1511B"
              textColor="#FFF"
            />

            {/* TODO add login process via google and linkedin */}
          </form>
          <div className={styles.links}>
            <Link className={styles.link} to="/">
              Create VC Account
            </Link>
            <Link className={styles.link} to="/">
              Log In To Founder Account
            </Link>
            <Link className={styles.link} to="/">
              Create Founder Account
            </Link>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default LogIn;
