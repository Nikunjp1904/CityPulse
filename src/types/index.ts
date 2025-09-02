export interface Event {
  id: string;
  name: string;
  url: string;
  dates: {
    start: {
      localDate: string;
      localTime?: string;
    };
  };
  _embedded?: {
    venues: {
      name: string;
      city: { name: string };
      country: { name: string };
      location: { longitude: string; latitude: string };
    }[];
  };
  images: { url: string }[];
}

export interface User {
  uid: string;
  name: string;
  email: string;
  favorites: string[];
}

export interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

export interface EventState {
  events: Event[];
  loading: boolean;
  error: string | null;
  favorites: string[];
}

export const USER_STORAGE_KEY = 'CITY_PULSE_USER';
export const FAVORITES_STORAGE_KEY = 'CITY_PULSE_FAVORITES';
export const LANGUAGE_KEY = 'APP_LANGUAGE';
export const TICKET_MASTER_API_KEY = 'mTgaL5wZdPfYOmFAXs66L5Fd3CVwhxYa';
