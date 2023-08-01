import { Link } from 'react-router-dom';
import Button from '../UI/Button';
import { Hamburguer, Logo, CloseIcon, Wordmark } from '../icons';
import NavLinks from './NavLinks';
import styles from './HanburguerMenu.module.css';

interface Props {
  onClickHamburguer: () => void;
  isUserLogged: boolean;
  isOpen: boolean;
  handleActions: {
    handleButtonLogIn: () => void;
    handleButtonSignUp: () => void;
    handleButtonLogout: () => void;
  };
}

function HamburguerMenu({
  onClickHamburguer,
  isUserLogged,
  isOpen,
  handleActions,
}: Props) {
  return (
    <div className="block md:hidden w-11 h-11">
      {!isOpen ? (
        <button type="button" onClick={onClickHamburguer}>
          <Hamburguer />
        </button>
      ) : null}
      <div className={isOpen ? styles.showMenu : styles.hideMenu}>
        <nav className="flex justify-between border border-persimmon h-20 rounded p-2 md:py-2 md:px-5 w-full">
          <Link className={styles.logoWrapper} to="/">
            <div className="self-center flex gap-0.7">
              <Logo />
              <Wordmark />
            </div>
          </Link>
          <button type="button" onClick={onClickHamburguer}>
            <CloseIcon />
          </button>
        </nav>
        <NavLinks />
        {!isUserLogged ? (
          <div className={styles.authButtonsWrapper}>
            <Button
              type="button"
              text="Log In"
              icon={<Logo color="#FFFFFF" width="10" height="11" />}
              backgroundColor="#F1511B"
              textColor="#FFF"
              onClick={handleActions.handleButtonLogIn}
            />
            <Button
              type="button"
              text="Sign Up"
              icon={<Logo color="#FFFFFF" width="10" height="11" />}
              backgroundColor="#F1511B"
              textColor="#FFF"
              onClick={handleActions.handleButtonSignUp}
            />
          </div>
        ) : (
          <div className="">
            <Button
              type="button"
              text="Log Out"
              icon={<Logo color="#FFFFFF" width="10" height="11" />}
              backgroundColor="#F1511B"
              textColor="#FFF"
              onClick={handleActions.handleButtonLogout}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default HamburguerMenu;
