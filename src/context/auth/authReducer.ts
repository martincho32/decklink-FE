import { IUser } from '../../types';
import { AuthState } from '.';

type AuthActionType =
  | { type: '[Auth] - Login'; payload: Partial<IUser> }
  | { type: '[Auth] - SignUp'; payload: Partial<IUser> }
  | { type: '[Auth] - Validate'; payload: Partial<IUser> }
  | { type: '[Auth] - Logout' };

export const authReducer = (
  state: AuthState,
  action: AuthActionType
): AuthState => {
  switch (action.type) {
    case '[Auth] - Login':
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload,
      };
    case '[Auth] - SignUp':
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload,
      };
    case '[Auth] - Validate':
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload,
      };
    case '[Auth] - Logout':
      return {
        ...state,
        isLoggedIn: false,
        user: undefined,
      };

    default:
      return state;
  }
};
