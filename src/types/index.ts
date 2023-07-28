export interface User {
  email?: string;
  authToken?: string;
  role?: string;
}
export interface IAuthContext {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User>>;
}

export interface Deck {
  _id: string;
  name: string;
  deckUrl: string;
  customDeckLink: string;
  requestEmail: boolean;
  requestPassword: boolean;
  password: string;
  slides: number;
  userId: string;
  createdAt?: string;
  updatedAt?: string;
}
