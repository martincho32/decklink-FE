import Button from '../../../UI/Button';
import { MainLayout } from '../../../components/layouts';
import whiteTopRightArrow from '../../../assets/images/ArrowTopRight.svg';
import styles from './MyDesks.module.css';
import image from '../../../assets/images/Rectangle 1.png';
import { Logo } from '../../../components/icons';
import viewIcon from '../../../assets/images/views.png';
import AverageTimeIcon from '../../../assets/images/AverageTime.png';
import orangeTopRightArrow from '../../../assets/images/OrangeArrowTopRight.svg';
import deleteIcon from '../../../assets/images/Delete.png';

function MyDecks() {
  return (
    <MainLayout>
      <div className={styles.myDesksWrapper}>
        <div className={styles.pageNavigation}>
          <h2 className={styles.title}>
            <span>Hi Ben!</span> Here is your created decks
          </h2>
          <Button
            type="button"
            text="Create New Deck"
            icon={<img src={whiteTopRightArrow} alt="Arrow" />}
            backgroundColor="#F1511B"
            textColor="#FFF"
          />
        </div>
        <div className={styles.decksBlock}>
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
              <div className={styles.deckMainInfo}>
                <div className={styles.deckMainInfoItem}>
                  <div className={styles.deckTitleAndIcon}>
                    <img
                      className={styles.deckMainInfoItemDataIcon}
                      src={viewIcon}
                      alt="view-icon"
                    />
                    <p className={styles.deckMainInfoItemTitle}>
                      Number of views:
                    </p>
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
              <div className={styles.buttons}>
                <Button
                  type="button"
                  text="See Detailed Info"
                  icon={<img src={whiteTopRightArrow} alt="Arrow" />}
                  backgroundColor="#F1511B"
                  textColor="#FFF"
                />
                <div className={styles.secondaryButtonsWrapper}>
                  <Button
                    type="button"
                    text="Edit"
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
            </div>
          </div>
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
              <div className={styles.deckMainInfo}>
                <div className={styles.deckMainInfoItem}>
                  <div className={styles.deckTitleAndIcon}>
                    <img
                      className={styles.deckMainInfoItemDataIcon}
                      src={viewIcon}
                      alt="view-icon"
                    />
                    <p className={styles.deckMainInfoItemTitle}>
                      Number of views:
                    </p>
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
              <div className={styles.buttons}>
                <Button
                  type="button"
                  text="See Detailed Info"
                  icon={<img src={whiteTopRightArrow} alt="Arrow" />}
                  backgroundColor="#F1511B"
                  textColor="#FFF"
                />
                <div className={styles.secondaryButtonsWrapper}>
                  <Button
                    type="button"
                    text="Edit"
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
            </div>
          </div>
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
              <div className={styles.deckMainInfo}>
                <div className={styles.deckMainInfoItem}>
                  <div className={styles.deckTitleAndIcon}>
                    <img
                      className={styles.deckMainInfoItemDataIcon}
                      src={viewIcon}
                      alt="view-icon"
                    />
                    <p className={styles.deckMainInfoItemTitle}>
                      Number of views:
                    </p>
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
              <div className={styles.buttons}>
                <Button
                  type="button"
                  text="See Detailed Info"
                  icon={<img src={whiteTopRightArrow} alt="Arrow" />}
                  backgroundColor="#F1511B"
                  textColor="#FFF"
                />
                <div className={styles.secondaryButtonsWrapper}>
                  <Button
                    type="button"
                    text="Edit"
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
            </div>
          </div>
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
              <div className={styles.deckMainInfo}>
                <div className={styles.deckMainInfoItem}>
                  <div className={styles.deckTitleAndIcon}>
                    <img
                      className={styles.deckMainInfoItemDataIcon}
                      src={viewIcon}
                      alt="view-icon"
                    />
                    <p className={styles.deckMainInfoItemTitle}>
                      Number of views:
                    </p>
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
              <div className={styles.buttons}>
                <Button
                  type="button"
                  text="See Detailed Info"
                  icon={<img src={whiteTopRightArrow} alt="Arrow" />}
                  backgroundColor="#F1511B"
                  textColor="#FFF"
                />
                <div className={styles.secondaryButtonsWrapper}>
                  <Button
                    type="button"
                    text="Edit"
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
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default MyDecks;
