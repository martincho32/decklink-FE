import { UIState } from '.';

type UIActionType =
  | {
      type: '[Modal] - SetShowModal';
      payload: boolean;
    }
  | {
      type: '[Modal] - SetRequireEmail';
      payload: boolean;
    }
  | {
      type: '[Modal] - SetRequirePassword';
      payload: boolean;
    };

export const uiReducer = (state: UIState, action: UIActionType): UIState => {
  switch (action.type) {
    case '[Modal] - SetShowModal':
      return {
        ...state,
        isShowModal: action.payload,
      };

    case '[Modal] - SetRequireEmail':
      return {
        ...state,
        hasEmailRequired: action.payload,
      };
    case '[Modal] - SetRequirePassword':
      return {
        ...state,
        hasPasswordRequired: action.payload,
      };

    default:
      return state;
  }
};
