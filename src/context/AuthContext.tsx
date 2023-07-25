import { createContext, useMemo, useState } from 'react';
import { IAuthContext, User } from '../types';

interface Props {
  children: React.ReactNode;
}

export const AuthContext = createContext<IAuthContext>({
  user: {
    email: undefined,
    role: undefined,
    authToken: undefined,
  },
  setUser: () => {},
});

export function AuthProvider({ children }: Props) {
  const [user, setUser] = useState<User>({
    email: undefined,
    role: undefined,
    authToken: undefined,
  });
  return (
    <AuthContext.Provider
      value={useMemo(() => ({ user, setUser }), [user, setUser])}
    >
      {children}
    </AuthContext.Provider>
  );
}
