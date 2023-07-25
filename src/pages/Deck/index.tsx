import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  pdfjs,
  Document,
  Thumbnail,
  Page,
} from 'react-pdf'; /** File library */
import type { PDFDocumentProxy } from 'pdfjs-dist'; /** File library */
import { Logo } from '../../components/icons';
import { MainLayout, Button, Input } from '../../components';
/** File library */
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url
).toString();

const options = {
  cMapUrl: 'cmaps/',
  standardFontDataUrl: 'standard_fonts/',
};

type PDFFile = string | File | null;

function Deckpage() {
  /** File Library */
  const [file, setFile] = useState<PDFFile>(null);
  const [numPages, setNumPages] = useState<number>();
  const [pageNumber, setPageNumber] = useState(1);

  const onFileChange = (target): void => {
    const { files } = target;

    if (files && files[0]) {
      setFile(files[0] || null);
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

  const [password, setPassword] = useState<string>('');
  const [enteredPasswordTouched, setEnteredPasswordTouched] =
    useState<boolean>(false);
  const enteredPasswordIsValid = password.length >= 6 && password.length <= 35;
  const passwordInputIsInvalid =
    !enteredPasswordIsValid && enteredPasswordTouched;

  const enteredDeckNameIsValid = deckName.trim() !== '' && deckName.length >= 3;
  const enteredDeckLinkIsValid = deckLink.trim() !== '' && deckLink.length >= 3;

  const deckNameInputIsInvalid =
    !enteredDeckNameIsValid && enteredDeckNameTouched;
  const deckLinkInputIsInvalid =
    !enteredDeckLinkIsValid && enteredDeckLinkTouched;

  const onClickGoBack = () => {
    navigate(-1);
  };

  const onClickCreate = () => {
    console.log('clicked create!!');
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
    setPassword(value);
  };

  const passwordInputBlur = () => {
    setEnteredPasswordTouched(true);
  };

  return (
    <MainLayout>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 pt-12 gap-7 max-h-fit">
        <div className="flex justify-center md:justify-start gap-6">
          <Button
            icon={<Logo color="white" />}
            type="button"
            className="bg-persimmon -rotate-90 p-4"
            onClick={onClickGoBack}
          />
          <span className="self-center text-xl leading-normal">Go Back</span>
        </div>
        <h1 className="text-2xl leading-normal">Create new Deck</h1>
        <div className="flex gap-4 col-span-1 md:col-span-2 xl:col-span-1">
          <Button
            icon={<Logo color="white" />}
            type="button"
            className="bg-persimmon text-white py-4 px-5 grow"
            onClick={onClickCreate}
            text="Create"
          />
          <Button
            icon={<Logo />}
            type="button"
            borderColor="#F1511B"
            className="text-persimmon py-4 px-5 grow"
            onClick={onClickCreate}
            text="Save as a Draft"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 pt-12 gap-7 max-h-fit">
        <div className="">
          <Input
            style="default"
            type="text"
            placeholder="example@gmail.com"
            label="Name of Deck"
            id="deck-name"
            value={deckName}
            onChange={handleDeckNameChange}
            onBlur={deckNameBlur}
          />
          {deckNameInputIsInvalid && (
            <p className="text-red-600">Enter valid deck name</p>
          )}
        </div>
        <div className="">
          <Input
            style="default"
            type="text"
            placeholder="decklink/minds/decklink.com"
            label="Custom Link"
            id="deck-link"
            value={deckLink}
            onChange={handleDeckLinkChange}
            onBlur={deckLinkBlur}
          />
          {deckLinkInputIsInvalid && (
            <p className="text-red-500">Enter valid deck link</p>
          )}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 pt-12 gap-7 max-h-fit">
        <div className="flex">
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
            style="password"
            placeholder="******"
            label="Password"
            id="passwod"
            value={password}
            onChange={handlePasswordChange}
            onBlur={passwordInputBlur}
          />
          {passwordInputIsInvalid && (
            <p className="text-red-500">
              Password must be 6-35 characters long
            </p>
          )}
        </div>
      </div>

      {/* PDF thumbnail */}

      <div className="Example__container__load mt-10 w-60">
        <Input
          style="upload"
          placeholder="upload"
          label=""
          id="deck-upload"
          onChange={onFileChange}
        />
      </div>
      <div className="Example ">
        <div className="Example__container">
          <div className="Example__container__document">
            <Document
              file={file}
              onLoadSuccess={onDocumentLoadSuccess}
              options={options}
              noData={<h4 className="my-5">No file selected</h4>}
            >
              {/* {Array.from(new Array(numPages), (el, index) => (
                <Page key={`page_${index + 1}`} pageNumber={index + 1} />
              ))} */}
              {/* <Page pageNumber={pageNumber} /> */}

              <div className="flex gap-3 overflow-auto my-6">
                {Array.from(new Array(numPages), (el, index) => (
                  <Thumbnail
                    onItemClick={(args) => {
                      console.log('args: ', args);
                      setPageNumber(index + 1);
                    }}
                    key={`page_${index + 1}`}
                    pageNumber={index + 1}
                    scale={0.2}
                  />
                ))}
              </div>
            </Document>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default Deckpage;
