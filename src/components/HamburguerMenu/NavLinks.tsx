import { NavLink } from 'react-router-dom';

function NavLinks() {
  return (
    <>
      <NavLink
        to="/founder/decks"
        className={({ isActive }) =>
          isActive
            ? 'text-persimmon mr-4 inline-block'
            : 'text-mirage mr-4 inline-block'
        }
      >
        MyDecks
      </NavLink>
      {/* <NavLink
        to="/founder/referrals"
        className={({ isActive }) =>
          isActive
            ? 'text-persimmon mr-4 inline-block'
            : 'text-mirage mr-4 inline-block'
        }
      >
        Referral System
      </NavLink> */}
      <NavLink
        to="https://decklink.canny.io/feature-requests/?selectedCategory=feature-suggestion"
        className="text-mirage mr-4 inline-block"
      >
        Your Feature Suggestions
      </NavLink>
      {/* <NavLink to="/">Other Link</NavLink> */}
    </>
  );
}

export default NavLinks;
