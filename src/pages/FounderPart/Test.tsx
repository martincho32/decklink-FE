import { Viewer, Worker } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
// import pdf from './test.pdf';

export default function Test() {
  return (
    <div
      style={{
        height: '750px',
      }}
    >
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.6.172/build/pdf.worker.min.js">
        <Viewer fileUrl="https://www.googleapis.com/download/storage/v1/b/example-pt-bucket/o/64d5fd26f7f84459ffc3c737-Brand%20V4_compressed.pdf?generation=1691745577077817&alt=media" />
      </Worker>
    </div>
  );
}
