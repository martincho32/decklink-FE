export interface User {
  email?: string;
  authToken?: string;
  role?: string;
}
export interface IAuthContext {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User>>;
}
