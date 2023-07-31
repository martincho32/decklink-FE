import { LineChart } from '../..';
import { IDeck, IDeckView } from '../../../types';

interface Props {
  deck: Partial<IDeck> | null;
  deckViews: IDeckView[] | null;
}

function DeckAverageStats({ deck, deckViews }: Props) {
  return (
    <>
      {/* Here put the top page actions new component (not yet created) */}
      <span>Average time spent viewing each slide by all people</span>
      <LineChart deck={deck} deckViews={deckViews} />
      {/* Here put list of deck-view cards for each user that viewed the deck */}
    </>
  );
}

export default DeckAverageStats;
