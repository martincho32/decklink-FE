import { Link } from 'react-router-dom';
import Button from '../UI/Button';
import { Hamburguer, Logo, CloseIcon } from '../icons';
import NavLinks from './NavLinks';
import styles from './HanburguerMenu.module.css';
import logo from '../../assets/images/DeckLinkLogo.svg';

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
    <div className="block tablet:hidden w-11 h-11">
      {!isOpen ? (
        <button type="button" onClick={onClickHamburguer}>
          <Hamburguer />
        </button>
      ) : null}
      <div className={isOpen ? styles.showMenu : styles.hideMenu}>
        <nav className="flex justify-between border border-persimmon rounded-3 p-2 md:py-2 md:px-5 w-full">
          <Link className={styles.logoWrapper} to="/">
            <div className="self-center flex gap-0.7 mobilev:w-40 tablet:w-auto">
              <img src={logo} className="" alt="Fundraisingtoobox" />
            </div>
          </Link>
          <button type="button" onClick={onClickHamburguer}>
            <CloseIcon />
          </button>
        </nav>
        <NavLinks />
        {!isUserLogged ? (
          <div className="flex gap-1">
            <Button
              type="button"
              text="Log In"
              icon={<Logo color="#F1511B" width="10" height="11" />}
              backgroundColor="#FDE7DF"
              textColor="#F1511B"
              onClick={handleActions.handleButtonLogIn}
              className="py-3 w-32 pr-4 relative left-4 z-0 bg-[#FDE7DF] text-persimmon"
            />
            <Button
              type="button"
              text="Sign Up"
              icon={<Logo color="#FFFFFF" width="10" height="11" />}
              backgroundColor="#F1511B"
              textColor="#FFF"
              onClick={handleActions.handleButtonSignUp}
              className="py-3 w-32 z-10"
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
