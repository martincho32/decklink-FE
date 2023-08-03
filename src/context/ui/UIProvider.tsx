import { PropsWithChildren, useMemo, useReducer } from 'react';
import { UIContext, uiReducer } from '.';

export interface UIState {
  isShowModal: boolean;
  hasEmailRequired: boolean;
  hasPasswordRequired: boolean;
}

const UI_INITIAL_STATE: UIState = {
  isShowModal: false,
  hasEmailRequired: false,
  hasPasswordRequired: false,
};

export function UIProvider({ children }: PropsWithChildren) {
  const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE);

  const setShowModal = (showModal: boolean) => {
    dispatch({
      type: '[Modal] - SetShowModal',
      payload: showModal,
    });
  };

  const setRequireEmail = (requireEmail: boolean) => {
    dispatch({
      type: '[Modal] - SetRequireEmail',
      payload: requireEmail,
    });
  };

  const setRequirePassword = (requirePassword: boolean) => {
    dispatch({
      type: '[Modal] - SetRequirePassword',
      payload: requirePassword,
    });
  };

  return (
    <UIContext.Provider
      value={useMemo(
        () => ({
          ...state,

          // Methods
          setShowModal,
          setRequireEmail,
          setRequirePassword,
        }),
        [state]
      )}
    >
      {children}
    </UIContext.Provider>
  );
}
