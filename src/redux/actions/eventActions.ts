import { Dispatch } from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Event, FAVORITES_STORAGE_KEY } from '../../types';
import { searchEvents } from '../../api/ticketmaster';

export const fetchEvents =
  (keyword: string, city: string) => async (dispatch: Dispatch) => {
    dispatch({ type: 'FETCH_EVENTS_START' });
    try {
      const events: Event[] = await searchEvents(keyword, city);
      dispatch({ type: 'FETCH_EVENTS_SUCCESS', payload: events });
    } catch (error: any) {
      dispatch({ type: 'FETCH_EVENTS_FAIL', payload: error.message });
    }
  };

export const toggleFavorite =
  (eventId: string) => async (dispatch: Dispatch, getState: any) => {
    dispatch({ type: 'TOGGLE_FAVORITE', payload: eventId });

    const { favorites } = getState().events;
    await AsyncStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
  };

export const loadFavorites = () => async (dispatch: Dispatch) => {
  const favs = await AsyncStorage.getItem(FAVORITES_STORAGE_KEY);
  if (favs) {
    dispatch({ type: 'LOAD_FAVORITES', payload: JSON.parse(favs) });
  } else {
    dispatch({ type: 'LOAD_FAVORITES', payload: [] });
  }
};

