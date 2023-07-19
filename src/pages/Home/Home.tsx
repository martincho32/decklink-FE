import styles from './home.module.css'
import Button from "../../UI/Button"
import Input from "../../UI/Input"
import Logotype from "../../assets/images/logo-on-type-bg.svg"
import whiteTopRightArrow from "../../assets/images/ArrowTopRight.svg"
import orangeTopRightArrow from "../../assets/images/OrangeArrowTopRight.svg"
import graphImageFlying from "../../assets/images/graph-image-flying.png"
import graphImageStanding from "../../assets/images/graph-image-standing.png"

function Home() {
  const handleButtonLogInToVCAccount = () => {
    console.log('test vc');
  }

  const handleButtonLogInToFounderAccount = () => {
    console.log('test founder');
  }

  const handleInputChange = () => {
    console.log('test founder');
  }

  return (
    <div className={styles.blockContainer}>
      <img className={styles.imgTopRight} src={graphImageFlying} alt="graphImageStanding" />
      <img className={styles.imgBotLeft} src={graphImageStanding} alt="graphImageStanding" />
      <div className={styles.mainContent}>
        <img className={styles.logotype} src={Logotype} alt="Logotype" />
        <h1 className={styles.h1} >Which <span className={styles.textOrange}>account</span> do you want to log in to?</h1>
        <div className={styles.buttonWrap}>
          <Button text="Log In To VC Account" icon={<img src={whiteTopRightArrow} alt="Arrow" />} backgroundColor="#F1511B" textColor="#FFF" onClick={handleButtonLogInToVCAccount}/>
          <Button text="Log In To Founder Account" icon={<img src={orangeTopRightArrow} alt="Arrow" />} borderColor="#F1511B" textColor="#F1511B" onClick={handleButtonLogInToFounderAccount} />      
        </div>
        <Input style="toggle" label="True or False" id="true-or-false" onChange={handleInputChange} />
        {/* <div>
          <Input type="default" placeholder="Enter text" label="Password" id="passwod" onChange={handleInputChange} />
          <Input type="upload" label="Upload File" id="upload" onChange={handleInputChange} />
        </div> */}
      </div>
    </div>
  );
}

export default Home;
