import { EventState } from '../../types';

const initialState: EventState = {
  events: [],
  loading: false,
  error: null,
  favorites: []
};

type Action =
  | { type: 'FETCH_EVENTS_START' }
  | { type: 'FETCH_EVENTS_SUCCESS'; payload: any[] }
  | { type: 'FETCH_EVENTS_FAIL'; payload: string }
  | { type: 'TOGGLE_FAVORITE'; payload: string }
  | { type: 'LOAD_FAVORITES'; payload: string[] };

export default function eventReducer (
  state = initialState,
  action: Action
): EventState {
  switch (action.type) {
    case 'FETCH_EVENTS_START':
      return { ...state, loading: true, error: null };
    case 'FETCH_EVENTS_SUCCESS':
      return { ...state, loading: false, events: action.payload };
    case 'FETCH_EVENTS_FAIL':
      return { ...state, loading: false, error: action.payload };
    case 'TOGGLE_FAVORITE':
      const isFav = state.favorites.includes(action.payload);
      const newFavs = isFav
        ? state.favorites.filter((id) => id !== action.payload)
        : [...state.favorites, action.payload];
      return { ...state, favorites: newFavs };
    case 'LOAD_FAVORITES':
      return { ...state, favorites: action.payload };
    default:
      return state;
  }
}
