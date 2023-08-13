import * as React from 'react';
import { Viewer } from '@react-pdf-viewer/core';
import { thumbnailPlugin } from '@react-pdf-viewer/thumbnail';

import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/thumbnail/lib/styles/index.css';

export default function ThumbnailExample() {
  const thumbnailPluginInstance = thumbnailPlugin();
  const { Thumbnails } = thumbnailPluginInstance;

  return (
    <div
      className="rpv-core__viewer"
      style={{
        border: '1px solid rgba(0, 0, 0, 0.3)',
        display: 'flex',
        height: '100%',
      }}
    >
      <div
        style={{
          borderRight: '1px solid rgba(0, 0, 0, 0.3)',
          overflow: 'auto',
          width: '30%',
        }}
      >
        <Thumbnails />
      </div>
      <div style={{ flex: 1 }}>
        <Viewer
          fileUrl="https://www.googleapis.com/download/storage/v1/b/example-pt-bucket/o/64d54487861b60c39d8b2840-64d520107e82c4d948e02a15-Page%201-combine%C3%83%C2%8C_.pdf.pdf?generation=1691698316897548&alt=media"
          plugins={[thumbnailPluginInstance]}
        />
      </div>
    </div>
  );
}
