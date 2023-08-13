/* eslint-disable no-nested-ternary */
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Viewer, Worker, ScrollMode, PageLayout } from '@react-pdf-viewer/core';
import { scrollModePlugin } from '@react-pdf-viewer/scroll-mode';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import './DeckCreation.css';
import { Logo } from '../../../components/icons';
import {
  Button,
  Input,
  DeckPreview,
  AlertDialogComponent,
} from '../../../components';
/** File library */
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import EmptyDeckPreview from '../../../components/FounderPart/DeckPreview/EmptyDeckPreview';
import { deckService } from '../../../services';
import Loading from '../../../components/PreloadingScreen';
import { AuthContext } from '@/context';

type PDFFile = string | File | null;

export interface Props {
  title: string;
  deckId?: string;
}

function Deck({ title = 'Create', deckId }: Props) {
  const scrollModePluginInstance = scrollModePlugin();
  scrollModePluginInstance.switchScrollMode(ScrollMode.Horizontal);

  const pageLayout: PageLayout = {
    buildPageStyles: () => ({
      alignItems: 'center',
      display: 'flex',
      justifyContent: 'center',
    }),
    transformSize: ({ size }) => ({
      height: size.height,
      width: size.width + 5,
    }),
  };

  const { user } = useContext(AuthContext);
  const { validateToken } = useContext(AuthContext);
  const [deckFile, setDeckFile] = useState<PDFFile>(null);
  const [enteredDeckFileTouched, setEnteredDeckFileTouched] =
    useState<boolean>(false);
  const [numPages] = useState<number>();
  const [pageNumber, setPageNumber] = useState(1);
  const [previewPickDeckSlide, setPreviewPickDeckSlide] = useState(false);
  const [uploadInputFileLabel, setUploadInputFileLabel] =
    useState('Upload File (.pdf)');
  const [isEdited, setIsEdited] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const [deckName, setDeckName] = useState<string>('');
  const [enteredDeckNameTouched, setEnteredDeckNameTouched] =
    useState<boolean>(false);
  const [deckLink, setDeckLink] = useState<string>('');
  const [enteredDeckLinkTouched, setEnteredDeckLinkTouched] =
    useState<boolean>(false);
  const [passToogleChecked, setPassToogleChecked] = useState<boolean>(false);
  const [emailToogleChecked, setEmailToogleChecked] = useState<boolean>(false);
  // const [downloadToogleChecked, setDownloadToogleChecked] = useState(false);

  const [deckPassword, setDeckPassword] = useState<string>('');
  const [enteredPasswordTouched, setEnteredPasswordTouched] =
    useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(true);
  const [newFileChoosed, setNewFileChoosed] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const handleOnClosePitchDeckSlidePreview = () => {
    document.body.style.overflow = 'auto';
    setPreviewPickDeckSlide(false);
  };

  const onFileChange = (target): void => {
    const { files } = target;

    if (files && files[0]) {
      const allowedTypes = ['application/pdf'];
      const selectedFile = files[0];

      if (!allowedTypes.includes(selectedFile.type)) {
        setDeckFile(null); // Reset the selected file
        setUploadInputFileLabel('Upload File (.pdf)'); // Reset the label to the default state
      } else {
        setEnteredDeckFileTouched(true);
        setDeckFile(URL.createObjectURL(new Blob([selectedFile])));
        setUploadInputFileLabel('Change File (.pdf)');
        setIsEdited(true);
        setNewFileChoosed(true);
      }
    }
  };

  const enteredPasswordIsValid =
    deckPassword?.length >= 6 && deckPassword?.length <= 35;
  const enteredDeckNameIsValid = deckName.trim() !== '' && deckName.length >= 3;
  const enteredDeckLinkIsValid = deckLink.trim() !== '' && deckLink.length >= 3;
  const enteredDeckFileIsValid =
    deckFile !== null &&
    (typeof deckFile === 'string' || deckFile.type === 'application/pdf');

  const passwordInputIsInvalid =
    !enteredPasswordIsValid && enteredPasswordTouched;
  const deckNameInputIsInvalid =
    !enteredDeckNameIsValid && enteredDeckNameTouched;
  const deckLinkInputIsInvalid =
    !enteredDeckLinkIsValid && enteredDeckLinkTouched;
  const deckFileInputIsInvalid =
    !enteredDeckFileIsValid && enteredDeckFileTouched;

  const onClickGoBack = () => {
    navigate('/founder/decks');
  };

  const handleDeckNameChange = (value: string) => {
    setDeckName(value);
    setIsEdited(true);
  };

  const handleDeckLinkChange = (value: string) => {
    setDeckLink(value.replace(/\s+/g, '-').toLowerCase());
    setIsEdited(true);
  };

  const handlePassToogleChange = () => {
    setPassToogleChecked(!passToogleChecked);
    setIsEdited(true);
  };

  // const handleDownloadToogleChange = () => {
  //   setDownloadToogleChecked(!downloadToogleChecked);
  //   setIsEdited(true);
  // };

  const handleEmailToogleChange = () => {
    setEmailToogleChecked(!emailToogleChecked);
    setIsEdited(true);
  };

  const deckNameBlur = () => {
    setEnteredDeckNameTouched(true);
  };

  const deckLinkBlur = () => {
    setEnteredDeckLinkTouched(true);
  };

  const deckFileBlur = () => {
    setEnteredDeckFileTouched(true);
  };

  const handlePasswordChange = (value: string) => {
    setDeckPassword(value);
    setIsEdited(true);
  };

  const passwordInputBlur = () => {
    setEnteredPasswordTouched(true);
  };

  const handleError = (error: Error | string) => {
    let errorMessage: string =
      'Whoops! Something went wrong. Please contact support. Error: ';
    if (axios.isAxiosError(error)) {
      errorMessage +=
        error.response?.data?.message ??
        error.response?.data ??
        'Server error.';
      enqueueSnackbar(errorMessage, {
        variant: 'error',
        autoHideDuration: 10000,
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'right',
        },
      });
    } else {
      errorMessage += (error as Error).message ?? error;
      enqueueSnackbar(errorMessage, {
        variant: 'error',
        autoHideDuration: 10000,
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'right',
        },
      });
    }
  };

  const submitHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsButtonDisabled(true);

    setEnteredDeckNameTouched(true);
    setEnteredDeckLinkTouched(true);
    setEnteredPasswordTouched(true);
    setEnteredDeckFileTouched(true);

    if (
      (!enteredDeckNameIsValid ||
        !enteredDeckLinkIsValid ||
        !enteredDeckFileIsValid) &&
      (passToogleChecked ? enteredPasswordIsValid : true)
    ) {
      handleError('Some of the fields is not valid');
      return;
    }

    try {
      // TODO integrate this, for having dile upload progress bar

      // setMsg('Uploading...');
      // setProgress((prevState) => ({
      //   ...prevState,
      //   started: true,
      // }));
      // const createDeckConfig = {
      //   onUploadProgress: (progressEvent) => {
      //     if (progressEvent.progress) {
      //       console.log(progressEvent.progress * 100);
      //       setProgress((prevState) => ({
      //         ...prevState,
      //         pc: progressEvent.progress! * 100,
      //       }));
      //     }
      //   },
      // }
      // await deckService.createDeck(body, createDeckConfig);
      const fd = new FormData();
      fd.append('customDeckLink', deckLink);
      fd.append('requestEmail', `${emailToogleChecked}`);
      fd.append('requestPassword', `${passToogleChecked}`);
      fd.append('name', deckName);
      fd.append('selectedFile', deckFile!);
      if (passToogleChecked) fd.append('password', `${deckPassword}`);
      if (deckId) {
        await deckService.editDeck(fd, deckId, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
      } else {
        await deckService.createDeck(fd, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
      }
      validateToken();
      let msg = 'Deck successfully created';
      if (deckId) {
        msg = 'Deck successfully updated';
      }
      enqueueSnackbar(msg, {
        variant: 'success',
        autoHideDuration: 3000,
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'right',
        },
      });
      navigate('/founder/decks', {
        state: { isFirstDeck: !user?.hasCreatedDeck },
      });

      setDeckName('');
      setEnteredDeckNameTouched(false);
      setDeckLink('');
      setEnteredDeckLinkTouched(false);
      setDeckPassword('');
      setEnteredPasswordTouched(false);
      setIsButtonDisabled(false);
    } catch (error: any) {
      handleError(error);
      setIsButtonDisabled(false);
    }
  };

  useEffect(() => {
    if (deckId) {
      // Fetch deck data from the backend here
      deckService
        .getDeckById(deckId, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })
        .then(({ data }) => {
          setDeckName(data.name);
          setDeckLink(
            data.customDeckLink.replace(
              'https://www.fundraisingtoolbox.io/preview/',
              ''
            )
          );
          setDeckPassword(data.password);
          setEmailToogleChecked(data.requestEmail);
          setPassToogleChecked(data.requestPassword);
          setDeckFile(data.deckUrl);
          setTimeout(() => {
            setIsLoading(false); // Set isLoading to false once data is fetched
          }, 1000);
        })
        .catch((error) => {
          handleError(error);
          setTimeout(() => {
            setIsLoading(false); // Set isLoading to false once data is fetched
          }, 1000);
        });
    } else {
      setIsLoading(false); // Set isLoading to false for the create page
    }
  }, [deckId]);

  useEffect(() => {
    const handleDocumentClick = (e) => {
      const { target } = e;
      const container = document.querySelector('.deckWorkingPreview');
      const canvas = target.closest('.rpv-core__page-layer');
      if (container?.contains(canvas)) {
        const pageIndex = Number(canvas.getAttribute('data-virtual-index'));
        document.body.style.overflow = 'hidden';
        setPreviewPickDeckSlide(true);
        setPageNumber(pageIndex + 1); // Updated this line to use pageIndex directly
      }
    };

    document.addEventListener('click', handleDocumentClick);

    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, []);

  let finalDeckUrl = '';

  if (title === 'Create' && deckFile) {
    finalDeckUrl = URL.createObjectURL(new Blob([deckFile]));
  }

  if (title === 'Update' && deckFile && typeof deckFile === 'string') {
    finalDeckUrl = deckFile;
  }

  return isLoading ? (
    <Loading />
  ) : (
    <>
      <form
        onSubmit={submitHandler}
        className="mt-12 max-w-none"
        action="submit"
      >
        <div className="w-full my-12 grid grid-cols-1 md:flex md:justify-between md:content-center xl:grid-cols-3 gap-7 max-h-fit justify-center">
          <div className="flex justify-center md:justify-start gap-6">
            {isEdited ? (
              <AlertDialogComponent
                actionClassName="bg-persimmon"
                action={onClickGoBack}
                alertDescription="You didn't save your recent changes."
              >
                <Button
                  icon={<Logo color="white" />}
                  type="button"
                  className="bg-persimmon -rotate-90 p-4"
                />
              </AlertDialogComponent>
            ) : (
              <Button
                icon={<Logo color="white" />}
                type="button"
                className="bg-persimmon -rotate-90 p-4"
                onClick={onClickGoBack}
              />
            )}
            <span className="self-center text-xl leading-normal justify-center">
              Go Back
            </span>
          </div>
          <h1 className="text-2xl leading-normal">{title} new Deck</h1>
          {newFileChoosed && deckId ? (
            <AlertDialogComponent
              actionClassName="bg-persimmon"
              action={submitHandler}
              alertDescription="All your pitch-deck stats will be lost if you change the file."
            >
              <Button
                icon={<Logo color="white" />}
                type="button"
                text={title}
                backgroundColor="#F1511B"
                textColor="#ffffff"
                className="xl:justify-self-end justify-self-center max-w-min"
                disabled={isButtonDisabled}
              />
            </AlertDialogComponent>
          ) : (
            <Button
              icon={<Logo color="white" />}
              type="submit"
              text={title}
              backgroundColor="#F1511B"
              textColor="#ffffff"
              className="xl:justify-self-end justify-self-center max-w-min"
              disabled={isButtonDisabled}
            />
          )}
        </div>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-7 max-h-fit justify-center">
          <div className="">
            <Input
              required
              style="default"
              type="text"
              placeholder="Pitch Deck"
              label="Name of Deck"
              id="deck-name"
              value={deckName}
              inputIsInvalid={deckNameInputIsInvalid}
              errorMessage="Enter valid deck name"
              onChange={handleDeckNameChange}
              onBlur={deckNameBlur}
            />
          </div>
          <div className="">
            <Input
              className="lowercase"
              required
              style="prefilled"
              type="text"
              placeholder="decklink/example/decklink.com"
              label="Custom Link"
              id="deck-link"
              value={deckLink}
              inputIsInvalid={deckLinkInputIsInvalid}
              errorMessage="Enter valid deck link"
              onChange={handleDeckLinkChange}
              onBlur={deckLinkBlur}
            />
          </div>
          {/* <Input
            showExplanation
            explanationMessage="Allow the user to download this deck file"
            style="toggle"
            label="Allow download"
            id="allow-download"
            onChange={handleDownloadToogleChange}
            checked={downloadToogleChecked}
          /> */}
        </div>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-7 max-h-fit justify-center mt-6">
          <div className="flex justify-between">
            <Input
              showExplanation
              explanationMessage="Ask the user for their email to get access to the deck"
              style="toggle"
              label="Request Email"
              id="request-email"
              onChange={handleEmailToogleChange}
              checked={emailToogleChecked}
            />
            <Input
              showExplanation
              explanationMessage="Ask the user for a custom password to access the deck"
              style="toggle"
              label="Request Password"
              id="request-pass"
              onChange={handlePassToogleChange}
              checked={passToogleChecked}
            />
          </div>
          <div className={passToogleChecked ? '' : 'hidden'}>
            <Input
              required
              disabled={!passToogleChecked}
              style="password"
              placeholder="******"
              label="Password"
              id="passwod"
              value={deckPassword}
              inputIsInvalid={passwordInputIsInvalid}
              errorMessage="Password must be 6-35 characters long"
              onChange={handlePasswordChange}
              onBlur={passwordInputBlur}
            />
          </div>
        </div>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-7 max-h-fit justify-center mt-6">
          <Input
            style="upload"
            placeholder="upload"
            label={uploadInputFileLabel}
            id="deck-upload"
            inputIsInvalid={deckFileInputIsInvalid}
            errorMessage="You need to add a PDF file"
            onChange={onFileChange}
            onBlur={deckFileBlur}
          />
        </div>
      </form>

      {deckFile && deckFile !== null ? (
        <div
          className="deckWorkingPreview"
          style={{ height: '11rem', marginTop: '1rem', marginBottom: '1rem' }}
        >
          <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.6.172/build/pdf.worker.min.js">
            <Viewer
              scrollMode={ScrollMode.Horizontal}
              fileUrl={finalDeckUrl} // Pass the PDF file URL to Viewer
              enableSmoothScroll
              pageLayout={pageLayout}
              defaultScale={0.14}
              characterMap={{
                isCompressed: true,
                url: 'https://unpkg.com/pdfjs-dist@3.6.172/build/pdf.worker.min.js',
              }}
            />
          </Worker>
        </div>
      ) : (
        <EmptyDeckPreview />
      )}
      {previewPickDeckSlide && (
        <DeckPreview
          type="deckCreationPreview"
          onClose={handleOnClosePitchDeckSlidePreview}
          pageNumber={pageNumber}
          file={finalDeckUrl}
          numPages={numPages}
          setPageNumber={setPageNumber}
          deckId={null}
        />
      )}
    </>
  );
}

export default Deck;
