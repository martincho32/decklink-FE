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
      <div className="bg-white max-w-max mx-auto p-4 rounded shadow">
        <Button
          type="button"
          icon={<CloseIcon width="16" height="16" color="#FFFFFF" />}
          className="z-5 text-white fixed w-8 h-8 top-8 right-8 p-2 bg-persimmon rounded-md"
          onClick={onClose}
        />
        <div className="max-w-max w-auto">{children}</div>
      </div>
    </div>
  );
}
