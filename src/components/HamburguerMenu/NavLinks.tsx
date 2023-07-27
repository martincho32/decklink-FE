import { NavLink } from 'react-router-dom';

function NavLinks() {
  return (
    <>
      <NavLink to="/founder/decks" className="text-persimmon mr-2 inline-block">
        MyDecks
      </NavLink>
      {/* <NavLink to="/">Other Link</NavLink> */}
    </>
  );
}

export default NavLinks;
