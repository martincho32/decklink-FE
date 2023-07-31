import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Logo, MainLayout } from '../../../components';
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

  const onClickGoBack = () => {
    navigate('/founder/decks');
  };

  const onClickCopyDeckLink = () => {
    console.log('yeaah baby, copy deck link babyyy');
  };

  return (
    <MainLayout>
      {/* Here put the top page actions new component (not yet created) */}

      <div className="w-full my-12 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-7 max-h-fit justify-center">
        <div className="flex justify-center md:justify-start gap-6">
          <Button
            icon={<Logo color="white" />}
            type="button"
            className="bg-persimmon -rotate-90 p-4"
            onClick={onClickGoBack}
          />
          <span className="self-center text-xl leading-normal justify-center">
            Go Back
          </span>
        </div>
        <h1 className="text-2xl leading-normal">
          <span className="text-persimmon">{deck?.name}</span> Detailed
          Information
        </h1>
        <Button
          type="button"
          text="Copy Deck Link"
          icon={<Logo />}
          textColor="#F1511B"
          onClick={onClickCopyDeckLink}
        />
      </div>
      {/* One component for global deck viewing statistics */}
      <DeckAverageStats deckViews={deckViews} deck={deck} />
      {/* One component for individual deck viewing statistics */}
      {/* <LineChart deckViews={deckViews} deck={deck} /> */}
      {/* <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>Is it accessible?</AccordionTrigger>
          <AccordionContent>
            Yes. It adheres to the WAI-ARIA design pattern.
          </AccordionContent>
        </AccordionItem>
      </Accordion> */}
    </MainLayout>
  );
}

export default DeclkDetail;
