import { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../UI/Button';
import whiteTopRightArrow from '../../assets/images/ArrowTopRight.svg';
import styles from './SignUp.module.css';
import graphImageFlying from '../../assets/images/graph-image-flying.png';
import graphImageStanding from '../../assets/images/graph-image-standing.png';
import { MainLayout } from '../../components/layouts';
import SignUpFormData from '../../models/signup';
import RequiredSignUpInfo from './RequiredSignUpInfo';
import NotRequiredSignUpInfo from './NotRequiredSignUpInfo';
import OrangeIconBottomLeft from '../../assets/images/OrangeArrowBottomLeft.svg';

function SignUp() {
  const [page, setPage] = useState<number>(0);

  const [formData, setFormData] = useState<SignUpFormData>({
    email: '',
    password: '',
    confirmPassword: '',
    companyName: '',
    companyWebUrl: '',
    companyLinkedInUrl: '',
  });

  const formTitles = ['Sign Up', 'Additional Information'];

  // const PageDisplay = memo(() => {
  //   if (page === 0) {
  //     return (
  //       <RequiredSignUpInfo formData={formData} setFormData={setFormData} />
  //     );
  //   }
  //   return (
  //     <NotRequiredSignUpInfo formData={formData} setFormData={setFormData} />
  //   );
  // });

  const submitHandler = () => {
    console.log(formData);
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
          <h1 className={styles.headingStyle}>{formTitles[page]}</h1>
          <form className={styles.form}>
            {/* <PageDisplay /> */}
            {page === 0 ? (
              <>
                <RequiredSignUpInfo
                  formData={formData}
                  setFormData={setFormData}
                />
                <Button
                  type="button"
                  text="Continue"
                  icon={<img src={whiteTopRightArrow} alt="Arrow" />}
                  backgroundColor="#F1511B"
                  textColor="#FFF"
                  onClick={() => {
                    setPage((currPage) => currPage + 1);
                  }}
                />
              </>
            ) : (
              <>
                <NotRequiredSignUpInfo
                  formData={formData}
                  setFormData={setFormData}
                />
                <Button
                  type="button"
                  text="Sign up"
                  icon={<img src={whiteTopRightArrow} alt="Arrow" />}
                  backgroundColor="#F1511B"
                  textColor="#FFF"
                  onClick={submitHandler}
                />

                <Button
                  type="button"
                  text="Continue without this information"
                  textColor="#161a2088"
                  onClick={submitHandler}
                />

                <Button
                  type="button"
                  text="Go Back"
                  icon={<img src={OrangeIconBottomLeft} alt="Arrow" />}
                  textColor="#F1511B"
                  onClick={() => {
                    setPage((currPage) => currPage - 1);
                  }}
                />
              </>
            )}

            {/* TODO add login process via google and linkedin */}
          </form>
          <div className={styles.links}>
            <Link className={styles.link} to="/">
              Log In To Founder Account
            </Link>
            <Link className={styles.link} to="/">
              Log In To VC Account
            </Link>
            <Link className={styles.link} to="/">
              Create VC Account
            </Link>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default SignUp;
