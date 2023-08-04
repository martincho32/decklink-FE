export interface IUser {
  _id?: string;
  email?: string;
  token?: string;
  firstName?: string;
  lastName?: string;
  company?: string;
  websiteUrl?: string;
  linkedInUrl?: string;
  role?: string;
}

// export interface IAuthContext {
//   user: IUser | null;
//   setUser: React.Dispatch<React.SetStateAction<IUser>>;
// }

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

export interface IDeckSlidesStats {
  slideNumber: number;
  viewingTime: number;
}

export interface IDeckView {
  _id: string;
  deckId: string;
  deckSlidesStats: Array<IDeckSlidesStats>;
  viewerEmail: string | null | undefined;
  viewerInfo: string | null | undefined;
  deckOwnerId: string;
  createdAt?: string;
  updatedAt?: string;
}
