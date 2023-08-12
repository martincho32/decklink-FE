/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import * as React from 'react';
import { Button, DocumentLoadEvent, Viewer } from '@react-pdf-viewer/core';
import { thumbnailPlugin } from '@react-pdf-viewer/thumbnail';
import type { RenderThumbnailItemProps } from '@react-pdf-viewer/thumbnail';

interface CustomThumbnailItemsExampleProps {
  fileUrl?: string;
}

export default function Test({
  fileUrl = 'https://www.googleapis.com/download/storage/v1/b/example-pt-bucket/o/64d54487861b60c39d8b2840-64d520107e82c4d948e02a15-Page%201-combine%C3%83%C2%8C_.pdf.pdf?generation=1691698316897548&alt=media',
}: CustomThumbnailItemsExampleProps) {
  const [selectedPages, setSelectedPages] = React.useState<boolean[]>([]);

  const handleDocumentLoad = (e: DocumentLoadEvent) => {
    setSelectedPages(Array(e.doc.numPages).fill(false));
  };

  const selectAllPages = () => {
    setSelectedPages((selectedPages) => Array(selectedPages.length).fill(true));
  };

  const deselectAllPages = () => {
    setSelectedPages((selectedPages) =>
      Array(selectedPages.length).fill(false)
    );
  };

  const handleChoosePage = (
    e: React.ChangeEvent<HTMLInputElement>,
    pageIndex: number
  ) => {
    const isSelected = e.target.checked;
    selectedPages[pageIndex] = isSelected;
    setSelectedPages([...selectedPages]);
  };

  const renderThumbnailItem = (props: RenderThumbnailItemProps) => (
    <div
      key={props.pageIndex}
      className="custom-thumbnail-item"
      data-testid={`thumbnail-${props.pageIndex}`}
      style={{
        backgroundColor:
          props.pageIndex === props.currentPage ? 'rgba(0, 0, 0, 0.3)' : '#fff',
        cursor: 'pointer',
        padding: '0.5rem',
        width: '100%',
      }}
    >
      <div style={{ marginBottom: '0.5rem' }} onClick={props.onJumpToPage}>
        {props.renderPageThumbnail}
      </div>
      <div
        style={{
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'center',
          margin: '0 auto',
          width: '100px',
        }}
      >
        <div style={{ marginRight: 'auto' }}>Page {props.renderPageLabel}</div>
        <input
          type="checkbox"
          checked={selectedPages[props.pageIndex] || false}
          onChange={(e) => handleChoosePage(e, props.pageIndex)}
        />
      </div>
    </div>
  );

  const thumbnailPluginInstance = thumbnailPlugin();
  const { Thumbnails } = thumbnailPluginInstance;

  return (
    <div
      style={{
        margin: '1rem auto',
        width: '64rem',
      }}
    >
      <div
        style={{
          alignItems: 'center',
          display: 'flex',
          marginBottom: '1rem',
        }}
      >
        <div style={{ marginRight: '0.5rem' }}>
          <Button onClick={selectAllPages}>Select all pages</Button>
        </div>
        <div style={{ marginRight: '0.5rem' }}>
          <Button onClick={deselectAllPages}>Deselect all pages</Button>
        </div>
        <div style={{ marginRight: '0.5rem' }}>
          Selected pages:{' '}
          {selectedPages
            .map((v, idx) => (v ? idx + 1 : false))
            .filter(Number)
            .join(', ')}
        </div>
      </div>
      <div
        style={{
          border: '1px solid rgba(0, 0, 0, 0.1)',
          display: 'flex',
          height: '50rem',
        }}
      >
        <div
          style={{
            borderRight: '1px solid rgba(0, 0, 0, 0.1)',
            width: '20%',
          }}
        >
          <Thumbnails renderThumbnailItem={renderThumbnailItem} />
        </div>
        <div
          style={{
            flex: 1,
            overflow: 'hidden',
          }}
        >
          <Viewer
            onDocumentLoad={handleDocumentLoad}
            fileUrl={fileUrl}
            plugins={[thumbnailPluginInstance]}
          />
        </div>
      </div>
    </div>
  );
}
