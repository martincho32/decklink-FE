import { useLocation } from 'react-router-dom';
import { SuccessBanner } from '../../components';

function DeckList() {
  const location = useLocation();

  return (
    <div>
      DeckList
      {location.state.isLoggedIn && (
        <SuccessBanner message="You succesfully logged in!" />
      )}
    </div>
  );
}

export default DeckList;
