import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Logo, Wordmark } from '../icons';
import HamburguerMenu from '../HamburguerMenu';
import NavLinks from '../HamburguerMenu/NavLinks';
import AuthActions from './AuthActions';
import { AuthContext } from '../../context';

// TODO fix this file

function Navbar() {
  const { isLoggedIn, logoutUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const onClickHamburguer = () => {
    setIsOpen(!isOpen);
  };

  const handleActions = {
    handleButtonLogIn: (): void => {
      navigate('/login');
    },
    handleButtonSignUp: (): void => {
      navigate('/signup');
    },
    handleButtonLogout: (): void => {
      logoutUser();
      navigate('/');
    },
  };

  return (
    <nav className="flex justify-between border border-persimmon h-20 items-center rounded p-2 md:py-2 md:px-5">
      <Link to="/founder/decks" className="flex justify-center">
        <div className="self-center flex gap-0.7">
          <Logo />
          <Wordmark />
        </div>
      </Link>
      <div className={isLoggedIn ? 'self-center hidden md:block' : 'hidden'}>
        <NavLinks />
      </div>
      <div className="hidden md:block">
        <AuthActions handleActions={handleActions} isUserLogged={isLoggedIn} />
      </div>
      <HamburguerMenu
        handleActions={handleActions}
        onClickHamburguer={onClickHamburguer}
        isUserLogged={isLoggedIn}
        isOpen={isOpen}
      />
    </nav>
  );
}

export default Navbar;
