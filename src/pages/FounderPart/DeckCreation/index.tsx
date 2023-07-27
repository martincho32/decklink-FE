import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { pdfjs, Document, Thumbnail } from 'react-pdf'; /** File library */
import type { PDFDocumentProxy } from 'pdfjs-dist'; /** File library */
import './DeckCreation.css';
import { Logo } from '../../../components/icons';
import { MainLayout, Button, Input, DeckPreview } from '../../../components';
/** File library */
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import EmptyDeckPreview from '../../../components/FounderPart/DeckPreview/EmptyDeckPreview';
import { createDeck } from '../../../services/deck';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url
).toString();

const options = {
  cMapUrl: 'cmaps/',
  standardFontDataUrl: 'standard_fonts/',
};

type PDFFile = string | File | null;

function DeckCreation() {
  /** File Library */
  const [deckFile, setDeckFile] = useState<PDFFile>(null);
  const [numPages, setNumPages] = useState<number>();
  const [pageNumber, setPageNumber] = useState(1);
  const [previewPickDeckSlide, setPreviewPickDeckSlide] = useState(false);
  const [uploadInputFileLabel, setUploadInputFileLabel] =
    useState('Upload File');

  const handleOnClosePitchDeckSlidePreview = () =>
    setPreviewPickDeckSlide(false);

  const onFileChange = (target): void => {
    const { files } = target;

    if (files && files[0]) {
      setDeckFile(files[0] || null);
      setUploadInputFileLabel('Change File');
    }
  };
  const onDocumentLoadSuccess = ({
    numPages: nextNumPages,
  }: PDFDocumentProxy): void => {
    setNumPages(nextNumPages);
  };
  /** File Library */
  const navigate = useNavigate();
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
    deckPassword.length >= 6 && deckPassword.length <= 35;
  const enteredDeckNameIsValid = deckName.trim() !== '' && deckName.length >= 3;
  const enteredDeckLinkIsValid = deckLink.trim() !== '' && deckLink.length >= 3;

  const passwordInputIsInvalid =
    !enteredPasswordIsValid && enteredPasswordTouched;
  const deckNameInputIsInvalid =
    !enteredDeckNameIsValid && enteredDeckNameTouched;
  const deckLinkInputIsInvalid =
    !enteredDeckLinkIsValid && enteredDeckLinkTouched;

  const onClickGoBack = () => {
    navigate(-1);
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

  const handlePasswordChange = (value: string) => {
    setDeckPassword(value);
  };

  const passwordInputBlur = () => {
    setEnteredPasswordTouched(true);
  };

  type DeckData = {
    name: string;
    customDeckLink: string;
    requestEmail: boolean;
    requestPassword: boolean;
    password?: string;
    file: PDFFile;
  };

  const createDeckApi = async ({
    name,
    customDeckLink,
    requestEmail,
    requestPassword,
    password,
    file,
  }: DeckData): Promise<boolean | { response: { status: number } }> => {
    try {
      const { data } = await createDeck({
        deck: {
          name,
          customDeckLink,
          requestEmail,
          requestPassword,
          password,
        },
        file: {
          file,
        },
      });
      console.log(data);
      return true;
    } catch (error: any) {
      console.error('Error:', error);
      return error;
    }
  };

  const submitHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    setDeckLink('decklink.com/'.concat(' ', deckLink));
    if (passToogleChecked === true) {
      createDeckApi({
        name: deckName,
        customDeckLink: deckLink,
        requestEmail: emailToogleChecked,
        requestPassword: passToogleChecked,
        password: deckPassword,
        file: deckFile,
      });
    } else {
      createDeckApi({
        name: deckName,
        customDeckLink: deckLink,
        requestEmail: emailToogleChecked,
        requestPassword: passToogleChecked,
        file: deckFile,
      });
    }
    console.log(
      deckName,
      deckLink,
      emailToogleChecked,
      passToogleChecked,
      deckPassword,
      deckFile
    );
    console.log('Test');
  };

  return (
    <MainLayout>
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
          <h1 className="text-2xl leading-normal">Create new Deck</h1>
          <Button
            icon={<Logo color="white" />}
            type="submit"
            className="bg-persimmon text-white px-5 grow col-start-3 col-end-3 h-auto"
            text="Create"
          />
        </div>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-7 max-h-fit justify-center">
          <div className="">
            <Input
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
              style="prefilled"
              type="text"
              placeholder="decklink/minds/decklink.com"
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
            />
            <Input
              style="toggle"
              label="Request Password"
              id="request-pass"
              onChange={handlePassToogleChange}
            />
          </div>
          <div className={passToogleChecked ? '' : 'hidden'}>
            <Input
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
            inputIsInvalid={passwordInputIsInvalid}
            errorMessage="Password must be 6-35 characters long"
            onChange={onFileChange}
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
              {/* {Array.from(new Array(numPages), (el, index) => (
                <Page key={`page_${index + 1}`} pageNumber={index + 1} />
              ))} */}

              <div className="flex gap-3 overflow-x-auto my-6 p-2">
                {Array.from(new Array(numPages), (el, index) => (
                  <Thumbnail
                    onItemClick={(args) => {
                      setPreviewPickDeckSlide(true);
                      console.log('args: ', args);
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
    </MainLayout>
  );
}

export default DeckCreation;
