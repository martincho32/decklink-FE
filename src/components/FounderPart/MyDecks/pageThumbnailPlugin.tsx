import type { Plugin, RenderViewer } from '@react-pdf-viewer/core';

export interface PageThumbnailPluginProps {
  PageThumbnail: React.ReactElement;
}

export const pageThumbnailPlugin = (
  props: PageThumbnailPluginProps
): Plugin => {
  const { PageThumbnail } = props;

  return {
    renderViewer: (renderProps: RenderViewer) => {
      const { slot } = renderProps;

      slot.children = PageThumbnail;

      // Reset the sub slot
      if (slot.subSlot) {
        slot.subSlot.attrs = {};
        // eslint-disable-next-line react/jsx-no-useless-fragment
        slot.subSlot.children = <></>;
      } else {
        console.log('slot.subSlot is undefined');
      }

      return slot;
    },
  };
};
