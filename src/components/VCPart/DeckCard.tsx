import { useState } from 'react';
import Button from '../../UI/Button';
import whiteTopRightArrow from '../../assets/images/ArrowTopRight.svg';
import styles from './DeckCard.module.css';
import image from '../../assets/images/Rectangle 1.png';
import orangeTopRightArrow from '../../assets/images/OrangeArrowTopRight.svg';
import deleteIcon from '../../assets/images/Delete.png';
import emailIcon from '../../assets/images/email.png';
import websiteIcon from '../../assets/images/website.png';
import linkedinIcon from '../../assets/images/linkedinpng.png';
import blackTopRightIcon from '../../assets/images/ArrowTopRightBlack.svg';
import blackBottomLeftIcon from '../../assets/images/ArrowBottomLeftBlack.svg';
import { Logo } from '../icons';

function DeckPart() {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleExpandClick = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={styles.deckBlock}>
      <img src={image} alt="test" />
      <div className={styles.deckMainContentWrapper}>
        <div className={styles.deckFirstRow}>
          <div className={styles.deckTitleWrapper}>
            <h3 className={styles.deckTitle}>Minds</h3>
            <p className={styles.subtitle}>Published</p>
          </div>
          <Button
            type="button"
            text="Copy Link"
            icon={<Logo />}
            textColor="#F1511B"
          />
        </div>
        <div className={styles.buttons}>
          <Button
            type="button"
            text="View Presentation"
            icon={<img src={whiteTopRightArrow} alt="Arrow" />}
            backgroundColor="#F1511B"
            textColor="#FFF"
          />
          <div className={styles.secondaryButtonsWrapper}>
            <Button
              type="button"
              text="Download"
              icon={<img src={orangeTopRightArrow} alt="Arrow" />}
              borderColor="#F1511B"
              textColor="#F1511B"
            />
            <Button
              type="button"
              icon={<img src={deleteIcon} alt="delete" />}
              backgroundColor="#161A20"
            />
          </div>
        </div>
        <button
          type="button"
          className={styles.expandMoreInfoButton}
          onClick={handleExpandClick}
        >
          {isExpanded ? (
            <div className={styles.expandButtonWrapper}>
              <p className={styles.exapndButtonText}>More Information</p>
              <img src={blackTopRightIcon} alt="arrow" />
            </div>
          ) : (
            <div className={styles.expandButtonWrapper}>
              <p className={styles.exapndButtonText}>More Information</p>
              <img src={blackBottomLeftIcon} alt="arrow" />
            </div>
          )}
        </button>
        {isExpanded && (
          <div className={styles.moreInformation}>
            <div className={styles.moreInformationItem}>
              <div className={styles.itemTitle}>
                <img
                  className={styles.deckMainInfoItemDataIcon}
                  src={emailIcon}
                  alt="email"
                />
                <p className={styles.deckMainInfoItemTitle}>Founder Email:</p>
              </div>
              <p className={styles.itemInfoParagraph}>exmaple@gmail.com</p>
            </div>
            <div className={styles.moreInformationItem}>
              <div className={styles.itemTitle}>
                <img
                  className={styles.deckMainInfoItemDataIcon}
                  src={websiteIcon}
                  alt="website"
                />
                <p className={styles.deckMainInfoItemTitle}>
                  Company Website::
                </p>
              </div>
              <p className={styles.itemInfoParagraph}>example.com</p>
            </div>
            <div className={styles.moreInformationItem}>
              <div className={styles.itemTitle}>
                <img
                  className={styles.deckMainInfoItemDataIcon}
                  src={linkedinIcon}
                  alt="linkedin"
                />
                <p className={styles.deckMainInfoItemTitle}>
                  Company LinkedIn:
                </p>
              </div>
              <p className={styles.itemInfoParagraph}>linkedin.com/example</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default DeckPart;
