import { useEffect } from 'react';
import { Button } from '@/components/UI';
import { CloseIcon } from '@/components/icons';

interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export function Popup({ isOpen, onClose, children }: PopupProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }
  });

  const handleOnClose = (event) => {
    if (event.target.id === 'container') {
      onClose();
    }
  };

  return (
    <div
      id="container"
      role="button"
      tabIndex={0}
      onClick={handleOnClose}
      className="fixed overflow-hidden flex h-full items-center inset-0 bg-black bg-opacity-80 backdrop-blur-sm p-2 z-50"
    >
      <div className="relative bg-white mx-auto p-8 mobilev:p-4 mobileh:p-8 rounded shadow max-h-full max-w-full">
        <div className="">
          {children}
          <Button
            type="button"
            icon={
              <CloseIcon width="16" height="16" color="var(--white-color)" />
            }
            className="mobilev:w-6 mobilev:h-6 mobilev:top-2 mobilev:right-2 text-white z-50 absolute tablet:w-8 tablet:h-8 tablet:top-4 tablet:right-4 p-2 bg-persimmon rounded-md"
            onClick={onClose}
          />
        </div>
      </div>
    </div>
  );
}
