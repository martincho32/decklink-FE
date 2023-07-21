import { NavLink } from 'react-router-dom';

function NavLinks() {
  return (
    <>
      <NavLink to="/" className="text-persimmon mr-2 inline-block">
        MyDecks
      </NavLink>
      <NavLink to="/">Other Link</NavLink>
    </>
  );
}

export default NavLinks;
