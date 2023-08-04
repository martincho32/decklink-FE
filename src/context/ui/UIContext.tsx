import { createContext } from 'react';

interface ContextProps {
  isShowModal: boolean;
  hasEmailRequired: boolean;
  hasPasswordRequired: boolean;

  // Methods
  setShowModal: (showModal: boolean) => void;
  setRequireEmail: (requireEmail: boolean) => void;
  setRequirePassword: (requirePassword: boolean) => void;
}

export const UIContext = createContext({} as ContextProps);
