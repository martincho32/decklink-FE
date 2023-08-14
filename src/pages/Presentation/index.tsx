import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { DeckPreview, MainLayout } from '@/components';
import { deckService } from '../../services';
import { UIContext } from '@/context';
import Loading from '../../components/PreloadingScreen';

function Presentation() {
  const { setShowModal, setRequireEmail, setRequirePassword } =
    useContext(UIContext);
  const navigate = useNavigate();
  const { customDeckLink } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  const [deckFile, setDeckFile] = useState<string>();
  const [pageNumber, setPageNumber] = useState(1);
  const [deckId, setDeckId] = useState<string | null>(null);
  const [deckSlidesNumber, setDeckSlidesNumber] = useState<number | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    if (!customDeckLink) {
      const errorMessage = `Error fetching deck's customDeckLink is undefined or null. Please contact support.`;
      enqueueSnackbar(errorMessage, {
        variant: 'error',
        autoHideDuration: 10000,
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'right',
        },
      });
      navigate('/');
    } else {
      deckService
        .getDeckByCustomLink(customDeckLink, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })
        .then(({ data }) => {
          if (!data) {
            enqueueSnackbar('Deck not found, please contact support.', {
              variant: 'error',
              autoHideDuration: 10000,
              anchorOrigin: {
                vertical: 'top',
                horizontal: 'right',
              },
            });
            navigate('/404');
            return;
          }

          setDeckFile(data.deckUrl || '');
          setDeckId(data._id);
          setShowModal(data.requestEmail || data.requestPassword);
          setRequireEmail(data.requestEmail);
          setRequirePassword(data.requestPassword);
          setDeckSlidesNumber(data.slides);
          setUserId(data.userId);
        })
        .catch((error) => {
          console.error('Presentation page error: ', error.message);
        });
    }
  }, []);

  return (
    <MainLayout>
      {deckFile ? ( // Check if deckFile is truthy
        <DeckPreview
          file={deckFile}
          type="deckUserPreview"
          pageNumber={pageNumber}
          onClose={() => {}}
          setPageNumber={setPageNumber}
          deckId={deckId}
          deckSlidesNumber={deckSlidesNumber}
          userId={userId}
        />
      ) : (
        <Loading />
      )}
    </MainLayout>
  );
}

export default Presentation;
