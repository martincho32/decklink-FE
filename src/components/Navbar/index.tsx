import { Link, useNavigate } from 'react-router-dom';
import { Logo, Wordmark } from '../icons';
import HamburguerButton from './HamburguerButton';
import Button from '../../UI/Button';

interface Props {
  isUserLogged: boolean;
}

function Navbar({ isUserLogged = false }: Props) {
  const navigate = useNavigate();
  const onClickHamburguer = () => {
    console.log('clicked hamburguer menu!');
  };

  const handleButtonLogIn = (): void => {
    navigate('/login');
  };
  const handleButtonSignUp = (): void => {
    navigate('/signup');
  };
  const handleButtonLogout = (): void => {};

  return (
    <nav className="flex justify-between border border-persimmon rounded p-2 md:py-2 md:px-5">
      <div className="self-center flex gap-0.7">
        <Logo />
        <Wordmark />
      </div>
      <div className={isUserLogged ? 'self-center hidden md:block' : 'hidden'}>
        <Link to="/" className="text-persimmon mr-2 inline-block">
          MyDecks
        </Link>
        <Link to="/">Other Link</Link>
      </div>
      <div className="hidden md:flex gap-1 p-1">
        {!isUserLogged ? (
          <>
            <Button
              text="Log In"
              icon={<Logo color="#FFFFFF" width="10" height="11" />}
              backgroundColor="#F1511B"
              textColor="#FFF"
              onClick={handleButtonLogIn}
            />
            <Button
              text="Sign In"
              icon={<Logo color="#FFFFFF" width="10" height="11" />}
              backgroundColor="#F1511B"
              textColor="#FFF"
              onClick={handleButtonLogout}
            />
          </>
        ) : (
          <Button
            text="Log Out"
            icon={<Logo />}
            textColor="#F1511B"
            onClick={handleButtonSignUp}
          />
        )}
      </div>
      <HamburguerButton onClickHamburguer={onClickHamburguer} />
    </nav>
  );
}

export default Navbar;
