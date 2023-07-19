import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Hamburguer, Logo, Wordmark } from '../icons';

function Navbar() {
  const onClickHamburguer = () => {
    console.log('clicked hamburguer menu!');
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isUserLogged, setIsUserLogged] = useState(false);
  return (
    <nav className="flex justify-between border border-persimmon rounded p-2 md:py-2 md:px-5">
      <div className="self-center flex gap-0.7">
        <Logo />
        <Wordmark />
      </div>
      {isUserLogged ? (
        <div className="self-center hidden md:block">
          <span className="text-persimmon mr-2 inline-block">MyDecks</span>
          <span>Other Link</span>
        </div>
      ) : null}
      <div className="hidden md:block">
        <button className="bg-persimmon text-white p-2" type="button">
          <Link to="/login">{isUserLogged ? 'LOGOUT' : 'LOGIN'}</Link>
        </button>
      </div>
      <button
        type="button"
        onClick={onClickHamburguer}
        className="block md:hidden"
      >
        <Hamburguer />
      </button>
    </nav>
  );
}

export default Navbar;
