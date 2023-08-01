import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { pdfjs, Document, Thumbnail } from 'react-pdf'; /** File library */
import type { PDFDocumentProxy } from 'pdfjs-dist'; /** File library */
import axios from 'axios';
import { useSnackbar } from 'notistack';
import './DeckCreation.css';
import { Logo } from '../../../components/icons';
import { Button, Input, DeckPreview } from '../../../components';
/** File library */
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import EmptyDeckPreview from '../../../components/FounderPart/DeckPreview/EmptyDeckPreview';
import { deckService } from '../../../services';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url
).toString();

const options = {
  cMapUrl: 'cmaps/',
  standardFontDataUrl: 'standard_fonts/',
};

type PDFFile = string | File | null;

export interface Props {
  title: string;
  deckId?: string;
}

function Deck({ title = 'Create', deckId }: Props) {
  /** File Library */
  const [deckFile, setDeckFile] = useState<PDFFile>(null);
  const [enteredDeckFileTouched, setEnteredDeckFileTouched] =
    useState<boolean>(false);
  const [numPages, setNumPages] = useState<number>();
  const [pageNumber, setPageNumber] = useState(1);
  const [previewPickDeckSlide, setPreviewPickDeckSlide] = useState(false);
  const [uploadInputFileLabel, setUploadInputFileLabel] =
    useState('Upload File (.pdf)');
  // const [progress, setProgress] = useState({ started: false, pc: 0 });
  // const [msg, setMsg] = useState<string | null>(null);

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
        setDeckFile(selectedFile);
        setUploadInputFileLabel('Change File (.pdf)');
      }
    }
  };
  const onDocumentLoadSuccess = ({
    numPages: nextNumPages,
  }: PDFDocumentProxy): void => {
    setNumPages(nextNumPages);
  };
  /** File Library */

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

  const [deckPassword, setDeckPassword] = useState<string>('');
  const [enteredPasswordTouched, setEnteredPasswordTouched] =
    useState<boolean>(false);

  const enteredPasswordIsValid =
    deckPassword?.length >= 6 && deckPassword?.length <= 35;
  const enteredDeckNameIsValid = deckName.trim() !== '' && deckName.length >= 3;
  const enteredDeckLinkIsValid = deckLink.trim() !== '' && deckLink.length >= 3;
  const enteredDeckFileIsValid =
    deckFile !== null &&
    typeof deckFile !== 'string' &&
    deckFile.type === 'application/pdf';

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
  };

  const handleDeckLinkChange = (value: string) => {
    setDeckLink(value);
  };

  const handlePassToogleChange = () => {
    setPassToogleChecked(!passToogleChecked);
  };

  const handleEmailToogleChange = () => {
    setEmailToogleChecked(!emailToogleChecked);
  };

  const deckNameBlur = () => {
    setEnteredDeckNameTouched(true);
  };

  const deckLinkBlur = () => {
    setEnteredDeckLinkTouched(true);
  };

  const deckFileBlur = () => {
    console.log('onBlure');
    setEnteredDeckFileTouched(true);
  };

  const handlePasswordChange = (value: string) => {
    setDeckPassword(value);
  };

  const passwordInputBlur = () => {
    setEnteredPasswordTouched(true);
  };

  const handleError = (error: any) => {
    let errorMessage: string = 'Whoops! Something went wrong. Error: ';
    const contactSupportMessage = ' Please contact support.';
    if (axios.isAxiosError(error)) {
      errorMessage +=
        error.response?.data?.message ??
        error.response?.data ??
        'Server error.';
      enqueueSnackbar(errorMessage + contactSupportMessage, {
        variant: 'error',
        autoHideDuration: 10000,
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'right',
        },
      });
    } else {
      errorMessage += error.message;
      enqueueSnackbar(errorMessage + contactSupportMessage, {
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

    setEnteredDeckNameTouched(true);
    setEnteredDeckLinkTouched(true);
    setEnteredPasswordTouched(true);
    setEnteredDeckFileTouched(true);

    if (passToogleChecked) {
      if (
        !enteredDeckNameIsValid ||
        !enteredDeckLinkIsValid ||
        !enteredPasswordIsValid ||
        !enteredDeckFileIsValid
      ) {
        return;
      }
    }

    if (
      !enteredDeckNameIsValid ||
      !enteredDeckLinkIsValid ||
      !enteredDeckFileIsValid
    ) {
      return;
    }

    // setDeckLink();
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
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      } else {
        await deckService.createDeck(fd, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      }
      // setMsg('Deck successfully created!!');
      enqueueSnackbar('Deck successfully created!!', {
        variant: 'success',
        autoHideDuration: 3000,
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'right',
        },
      });
      navigate('/founder/decks');

      setDeckName('');
      setEnteredDeckNameTouched(false);
      setDeckLink('');
      setEnteredDeckLinkTouched(false);
      setDeckPassword('');
      setEnteredPasswordTouched(false);
    } catch (error: any) {
      console.error('Error:', error);
      handleError(error);
    }
  };

  useEffect(() => {
    if (deckId) {
      deckService
        .getDeckById(deckId)
        .then(({ data }) => {
          setDeckName(data.name);
          setDeckLink(data.customDeckLink.replace('decklink.com/', ''));
          setDeckPassword(data.password);
          setEmailToogleChecked(data.requestEmail);
          setPassToogleChecked(data.requestPassword);
          setDeckFile(data.deckUrl);
        })
        .catch((error) => {
          console.error('Error: ', error);
          handleError(error);
        });
    }
  }, []);
  return (
    <>
      <form
        onSubmit={submitHandler}
        className="mt-12 max-w-none"
        action="submit"
      >
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
          <h1 className="text-2xl leading-normal">{title} new Deck</h1>
          <Button
            icon={<Logo color="white" />}
            type="submit"
            text={title}
            backgroundColor="#F1511B"
            textColor="#ffffff"
            className="justify-self-end max-w-min"
          />
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
        </div>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-7 max-h-fit justify-center mt-6">
          <div className="flex justify-between">
            <Input
              style="toggle"
              label="Request Email"
              id="request-email"
              onChange={handleEmailToogleChange}
              checked={emailToogleChecked}
            />
            <Input
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
            required
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

      {/* PDF thumbnail */}
      <div className="Example ">
        <div className="Example__container">
          <div className="Example__container__document">
            <Document
              file={deckFile}
              onLoadSuccess={onDocumentLoadSuccess}
              options={options}
              noData={<EmptyDeckPreview />}
            >
              <div className="flex gap-3 overflow-x-auto my-6 p-2">
                {Array.from(new Array(numPages), (el, index) => (
                  <Thumbnail
                    onItemClick={() => {
                      document.body.style.overflow = 'hidden';
                      setPreviewPickDeckSlide(true);
                      setPageNumber(index + 1);
                    }}
                    key={`page_${index + 1}`}
                    pageNumber={index + 1}
                  />
                ))}
              </div>
            </Document>
          </div>
        </div>
      </div>
      <DeckPreview
        type="deckUserPreview"
        onClose={handleOnClosePitchDeckSlidePreview}
        visible={previewPickDeckSlide}
        pageNumber={pageNumber}
        file={deckFile}
        onDocumentLoadSuccess={onDocumentLoadSuccess}
        options={options}
        numPages={numPages}
        setPreviewPickDeckSlide={setPreviewPickDeckSlide}
        setPageNumber={setPageNumber}
      />
    </>
  );
}

export default Deck;
