import { useEffect } from 'react';
import Button from '../Button';
import { CloseIcon } from '@/components';

interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function Popup({ isOpen, onClose, children }: PopupProps) {
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

  if (!isOpen) {
    return null;
  }

  return (
    <div
      id="container"
      role="button"
      tabIndex={0}
      onClick={handleOnClose}
      className="fixed overflow-hidden flex h-full items-center inset-0 bg-black bg-opacity-80 backdrop-blur-sm p-2 z-50"
    >
      <div className="bg-white mx-auto p-8 mobilev:p-4 mobileh:p-8 rounded shadow max-h-full max-w-full">
        <Button
          type="button"
          icon={<CloseIcon width="16" height="16" color="#FFFFFF" />}
          className="text-white z-50 fixed w-8 h-8 top-8 right-8 p-2 bg-persimmon rounded-md"
          onClick={onClose}
        />
        <div className="">{children}</div>
      </div>
    </div>
  );
}
