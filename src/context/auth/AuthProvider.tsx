import { PropsWithChildren, useReducer, useMemo, useEffect } from 'react';
import { AuthContext, authReducer } from '.';
import { IUser } from '../../types';
import { loginService } from '../../services';
import { useLocalStorage } from '@/hooks/useLocalStorage';

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
  const { removeItem, setItem, getItem } = useLocalStorage();
  const logoutUser = () => {
    removeItem('token');
    removeItem('showFreePitchDeckModal');
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
      const { token, email, role, firstName, lastName, hasCreatedDeck } = data;
      setItem('token', data.token);
      dispatch({
        type: '[Auth] - Login',
        payload: {
          email,
          role,
          token,
          firstName,
          lastName,
          hasCreatedDeck,
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
    _lastName: string,
    companyName: string,
    companyWebUrl: string,
    referredBy: string
  ): Promise<{
    hasError: boolean;
    message?: string;
  }> => {
    try {
      const { data } = await loginService.registerUser(
        {
          email: _email,
          password,
          cfpassword,
          firstName: _firstName,
          lastName: _lastName,
          companyName,
          companyWebUrl,
        },
        referredBy
      );
      const { token, firstName, lastName, email, role, hasCreatedDeck } = data;
      setItem('token', token);
      dispatch({
        type: '[Auth] - SignUp',
        payload: { email, role, token, firstName, lastName, hasCreatedDeck },
      });
      return {
        hasError: false,
      };
    } catch (error: any) {
      if (error.response.data.message === 'USER_ALREADY_EXISTS') {
        return {
          hasError: true,
          message: 'User with such email already exists',
        };
      }
      return {
        hasError: true,
        message: 'Something went very wrong. Please contact support.',
      };
    }
  };

  const forgotPassword = async (
    email: string
  ): Promise<{
    hasError: boolean;
    message?: string;
  }> => {
    try {
      const { data } = await loginService.forgotPassword(email);

      const { message } = data;

      return {
        hasError: false,
        message,
      };
    } catch (error: any) {
      if (error.response.data.message === 'There is no user with such email') {
        return {
          hasError: true,
          message: 'User with such email already exists',
        };
      }
      return {
        hasError: true,
        message: 'Something went very wrong. Please contact support.',
      };
    }
  };

  const validateToken = async (): Promise<boolean> => {
    if (!getItem('token')) {
      return false;
    }
    try {
      const { data } = await loginService.validateUserToken({
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const {
        token,
        email,
        role,
        hasCreatedDeck,
        firstName,
        id,
        maxDecksStorageSize,
      } = data;
      setItem('token', token);
      dispatch({
        type: '[Auth] - Validate',
        payload: {
          email,
          role,
          token,
          hasCreatedDeck,
          firstName,
          _id: id,
          maxDecksStorageSize,
        },
      });
      return true;
    } catch (error: any) {
      removeItem('token');
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
          forgotPassword,
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
