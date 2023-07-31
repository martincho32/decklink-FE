export interface IUser {
  email?: string;
  authToken?: string;
  role?: string;
}
export interface IAuthContext {
  user: IUser | null;
  setUser: React.Dispatch<React.SetStateAction<IUser>>;
}

export interface IDeck {
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

export interface IDeckView {
  _id: string;
  deckId: string;
  // totalViewTime: number
  deckSlidesStats: Array<{
    slideNumber: number;
    viewingTime: number;
  }>;
  viewerEmail: string | null | undefined;
}
