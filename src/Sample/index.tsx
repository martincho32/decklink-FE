/* eslint-disable react/jsx-no-bind */
import React, { useState } from 'react';
import { pdfjs, Document, Thumbnail } from 'react-pdf';
import type { PDFDocumentProxy } from 'pdfjs-dist';
import { LineChart } from './LineChart';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

import './Sample.css';

import { MainLayout } from '../components/layouts';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url
).toString();

const options = {
  cMapUrl: 'cmaps/',
  standardFontDataUrl: 'standard_fonts/',
};

type PDFFile = string | File | null;

export default function Sample() {
  const [file, setFile] = useState<PDFFile>(
    'https://storage.googleapis.com/example-pt-bucket/64b536f643620ac4309537d7-NVCPitchDeckTemplate.pdf'
  );
  const [numPages, setNumPages] = useState<number>();
  const [pageNumber, setPageNumber] = useState(1);

  function onFileChange(event: React.ChangeEvent<HTMLInputElement>): void {
    const { files } = event.target;

    if (files && files[0]) {
      setFile(files[0] || null);
    }
  }

  function onDocumentLoadSuccess({
    numPages: nextNumPages,
  }: PDFDocumentProxy): void {
    setNumPages(nextNumPages);
  }

  return (
    <MainLayout>
      {/* <div className="Example__container__load">
        <label htmlFor="file">
          Load from file:
          <input onChange={onFileChange} name="file" type="file" />
        </label>{' '}
      </div> */}
      <div>
        <LineChart />
      </div>
      <div className="Example">
        <div className="Example__container">
          <div className="Example__container__document">
            <Document
              file={file}
              onLoadSuccess={onDocumentLoadSuccess}
              options={options}
            >
              {/* {Array.from(new Array(numPages), (el, index) => (
                <Page key={`page_${index + 1}`} pageNumber={index + 1} />
              ))} */}
              {/* <Page pageNumber={pageNumber} /> */}

              <div className="test">
                {Array.from(new Array(numPages), (el, index) => (
                  <Thumbnail
                    onItemClick={() => {
                      setPageNumber(index + 1);
                    }}
                    key={`page_${index + 1}`}
                    pageNumber={index + 1}
                    scale={0.1}
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
