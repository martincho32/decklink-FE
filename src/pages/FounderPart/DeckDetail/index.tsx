import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { MainLayout } from '../../../components';
import { deckService, deckViewService } from '../../../services';
import { IDeck, IDeckView } from '../../../types/index';
import DeckAverageStats from '../../../components/FounderPart/DeckAverageStats';

function DeclkDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [deck, setDeck] = useState<IDeck | null>(null);
  const [deckViews, setDeckViews] = useState<IDeckView[] | null>(null);

  useEffect(() => {
    if (!id) {
      // Handle this, maybe use Snackbar to show error
      console.error('Error: There is no deck id to get.');
      navigate('/founder/decks');
    } else {
      deckService
        .getDeckById(id)
        .then(async ({ data }) => {
          // Set deck into state
          setDeck(data);
          // Pas deck as prop to LineChart
          // Call deckViews service to get all deckViews by deck ID
          const response = await deckViewService.getDeckViewByDeckId(id);
          setDeckViews(response.data);
          // Do some logic to create Average stats, example: Average time spent viewing each slide by all people
          // Pass data as props to LineChart componennt, or mabe create a component wraps LineChart?
        })
        .catch((error) => {
          console.error('Error: ', error.message);
        });
    }
  }, []);

  return (
    <MainLayout>
      {/* One component for global deck viewing statistics */}
      <DeckAverageStats deckViews={deckViews} deck={deck} />
      {/* One component for individual deck viewing statistics */}
      {/* <LineChart deckViews={deckViews} deck={deck} /> */}
    </MainLayout>
  );
}

export default DeclkDetail;
