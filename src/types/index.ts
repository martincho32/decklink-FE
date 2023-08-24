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
  hasCreatedDeck?: boolean;
  totalDecks?: number;
  totalTokens?: number;
  isSuperUser?: boolean;
  referredUserList?: Array<{ firstName: string; email: string }>;
  maxDecksStorageSize?: number;
}

export interface IDeck {
  _id: string;
  name: string;
  deckUrl: string;
  customDeckLink: string;
  requestEmail: boolean;
  requestPassword: boolean;
  isDownloadable: boolean;
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
  stale: boolean;
  deckSlidesStats: Array<IDeckSlidesStats>;
  viewerEmail: string | null | undefined;
  viewerInfo: string | null | undefined;
  deckOwnerId: string;
  createdAt?: string;
  updatedAt?: string;
}

export enum ItemCode {
  FIVEDECKS = '5DECKS',
}

export interface IUpgrade {
  _id?: string;
  name: string;
  code: ItemCode;
  description: string;
  isEnabled?: boolean;
  redeemPrice: number;
  createdAt?: string;
  updatedAt?: string;
}
