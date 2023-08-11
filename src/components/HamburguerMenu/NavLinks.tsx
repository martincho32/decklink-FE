import { NavLink } from 'react-router-dom';

function NavLinks() {
  return (
    <>
      <NavLink to="/founder/decks" className="text-persimmon mr-4 inline-block">
        MyDecks
      </NavLink>
      <NavLink
        to="https://decklink.canny.io/feature-requests/?selectedCategory=feature-suggestion"
        className="text-mirage mr-2 inline-block"
      >
        Your Feature Suggestions
      </NavLink>
      {/* <NavLink to="/">Other Link</NavLink> */}
    </>
  );
}

export default NavLinks;
