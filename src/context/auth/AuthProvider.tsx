import { PropsWithChildren, useReducer, useMemo, useEffect } from 'react';
import Cookies from 'js-cookie';
import { AuthContext, authReducer } from '.';
import { IUser } from '../../types';
import { loginService } from '../../services';

export interface AuthState {
  isLoggedIn: boolean;
  user?: Partial<IUser>;
}

const AUTH_INITIAL_STATE: AuthState = {
  isLoggedIn: false,
  user: undefined,
};

export function AuthProvider({ children }: PropsWithChildren) {
  const [state, dispatch] = useReducer(authReducer, AUTH_INITIAL_STATE);

  const logoutUser = () => {
    Cookies.remove('token');
    dispatch({
      type: '[Auth] - Logout',
    });
  };

  const loginUser = async (
    _email: string,
    password: string
  ): Promise<boolean> => {
    try {
      const { data } = await loginService.loginUser({
        email: _email,
        password,
      });
      const { token, email, role, firstName, lastName } = data;
      Cookies.set('token', data.token);
      dispatch({
        type: '[Auth] - Login',
        payload: {
          email,
          role,
          token,
          firstName,
          lastName,
        },
      });
      return true;
    } catch (error) {
      return false;
    }
  };

  const registerUser = async (
    _email: string,
    password: string,
    cfpassword: string,
    _firstName: string,
    _lastName: string
  ): Promise<{
    hasError: boolean;
    message?: string;
  }> => {
    try {
      const { data } = await loginService.registerUser({
        email: _email,
        password,
        cfpassword,
        firstName: _firstName,
        lastName: _lastName,
      });
      const { token, firstName, lastName, email, role } = data;
      Cookies.set('token', token);
      dispatch({
        type: '[Auth] - SignUp',
        payload: { email, role, token, firstName, lastName },
      });
      return {
        hasError: false,
      };
    } catch (error) {
      return {
        hasError: true,
        message: 'Something went wrong. Please contact support.',
      };
    }
  };

  const validateToken = async (): Promise<boolean> => {
    if (!Cookies.get('token')) {
      return false;
    }
    try {
      const { data } = await loginService.validateUserToken();
      const { token, email, role } = data;
      Cookies.set('token', token);
      dispatch({
        type: '[Auth] - Validate',
        payload: { email, role, token },
      });
      return true;
    } catch (error) {
      Cookies.remove('token');
      return false;
    }
  };

  useEffect(() => {
    validateToken();
  }, []);

  return (
    <AuthContext.Provider
      value={useMemo(
        () => ({
          ...state,

          // Methods
          loginUser,
          registerUser,
          validateToken,
          logoutUser,
        }),
        [state]
      )}
    >
      {children}
    </AuthContext.Provider>
  );
}
