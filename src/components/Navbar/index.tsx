import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Logo, Wordmark } from '../icons';
import HamburguerMenu from '../HamburguerMenu';
import NavLinks from '../HamburguerMenu/NavLinks';
import AuthActions from './AuthActions';

export interface Props {
  isUserLogged?: boolean;
}

function Navbar({ isUserLogged = false }: Props) {
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
    handleButtonLogout: (): void => {},
  };

  return (
    <nav className="flex justify-between border border-persimmon rounded p-2 md:py-2 md:px-5">
      <div className="self-center flex gap-0.7">
        <Logo />
        <Wordmark />
      </div>
      <div className={isUserLogged ? 'self-center hidden md:block' : 'hidden'}>
        <NavLinks />
      </div>
      <div className="hidden md:block">
        <AuthActions
          handleActions={handleActions}
          isUserLogged={isUserLogged}
        />
      </div>
      <HamburguerMenu
        handleActions={handleActions}
        onClickHamburguer={onClickHamburguer}
        isUserLogged={isUserLogged}
        isOpen={isOpen}
      />
    </nav>
  );
}

export default Navbar;
