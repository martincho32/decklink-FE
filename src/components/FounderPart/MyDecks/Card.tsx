import { Page, Document } from 'react-pdf'; /** File library */
import { Link } from 'react-router-dom';
import { Button } from '../..';
import whiteTopRightArrow from '../../../assets/images/ArrowTopRight.svg';
import styles from './Card.module.css';
import { Logo } from '../../icons';
import viewIcon from '../../../assets/images/views.png';
import AverageTimeIcon from '../../../assets/images/AverageTime.png';
import orangeTopRightArrow from '../../../assets/images/OrangeArrowTopRight.svg';
import deleteIcon from '../../../assets/images/Delete.png';
import { IDeck } from '../../../types';

interface Props {
  deck: IDeck;
  handleClickDelete: (id: string) => Promise<void>;
}

function Card({ deck, handleClickDelete }: Props) {
  return (
    <div className={styles.deckBlock}>
      <Document
        file={deck.deckUrl}
        // onLoadSuccess={onDocumentLoadSuccess}
        // options={options}
        // noData={<h4 className="">No file selected</h4>}
        // className=""
      >
        <Page
          renderTextLayer={false}
          renderAnnotationLayer={false}
          className={styles.previewImage}
          pageNumber={1}
        />
      </Document>
      <div className={styles.deckMainContentWrapper}>
        <div className={styles.deckFirstRow}>
          <div className={styles.deckTitleWrapper}>
            <h3 className={styles.deckTitle}>{deck.name}</h3>
            {/* <p className={styles.subtitle}>Published</p> */}
          </div>
          <Button
            type="button"
            text="Copy Link"
            icon={<Logo color="#161A20" />}
            textColor="#161A20"
          />
        </div>
        <div className={styles.deckMainInfoAndButtons}>
          <div className={styles.deckMainInfo}>
            <div className={styles.deckMainInfoItem}>
              <div className={styles.deckTitleAndIcon}>
                <img
                  className={styles.deckMainInfoItemDataIcon}
                  src={viewIcon}
                  alt="view-icon"
                />
                <p className={styles.deckMainInfoItemTitle}>Number of views:</p>
              </div>
              <div className={styles.dashedLine} />
              <p className={styles.deckMainInfoItemData}>10</p>
            </div>
            <div className={styles.deckMainInfoItem}>
              <div className={styles.deckTitleAndIcon}>
                <img
                  className={styles.deckMainInfoItemDataIcon}
                  src={AverageTimeIcon}
                  alt="average-time-icon"
                />
                <p className={styles.deckMainInfoItemTitle}>
                  Average spent time:
                </p>
              </div>
              <div className={styles.dashedLine} />
              <p className={styles.deckMainInfoItemData}>10</p>
            </div>
          </div>
        </div>
        <div className={styles.buttons}>
          <Link className="hover:no-underline" to={`/founder/deck/${deck._id}`}>
            <Button
              type="button"
              text="See Detailed Info"
              icon={<img src={whiteTopRightArrow} alt="Arrow" />}
              backgroundColor="#F1511B"
              textColor="#FFF"
            />
          </Link>
          <div className={styles.secondaryButtonsWrapper}>
            <Link
              className="hover:no-underline"
              to={`/founder/deck/edit/${deck._id}`}
            >
              <Button
                type="button"
                text="Edit"
                icon={<img src={orangeTopRightArrow} alt="Arrow" />}
                borderColor="#F1511B"
                textColor="#F1511B"
              />
            </Link>
            <Button
              type="button"
              icon={<img src={deleteIcon} alt="delete" />}
              backgroundColor="#161A20"
              onClick={() => handleClickDelete(deck._id)}
            />
            <div className={styles.secondaryButtonsWrapper}>
              <Link
                className={styles.editButton}
                to={`/founder/deck/edit/${deck._id}`}
              >
                <Button
                  type="button"
                  text="Edit"
                  icon={<img src={orangeTopRightArrow} alt="Arrow" />}
                  borderColor="#F1511B"
                  textColor="#F1511B"
                />
              </Link>
              <Button
                type="button"
                icon={<img src={deleteIcon} alt="delete" />}
                backgroundColor="#161A20"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
