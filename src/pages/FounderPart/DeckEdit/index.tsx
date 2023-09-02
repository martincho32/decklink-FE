import { useParams } from 'react-router-dom';
import { MainLayout } from '@/components';
import Deck from '../Deck';

function DeckEdit() {
  const params = useParams();
  return (
    <MainLayout>
      <Deck title="Update" deckId={params.id} />
    </MainLayout>
  );
}

export default DeckEdit;
