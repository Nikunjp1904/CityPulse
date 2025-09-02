import { Dispatch } from 'redux';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FAVORITES_STORAGE_KEY, User, USER_STORAGE_KEY } from '../../types';

const saveUserToStorage = async (user: User) => {
  await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
};

const removeUserFromStorage = async () => {
  await AsyncStorage.removeItem(FAVORITES_STORAGE_KEY);
  await AsyncStorage.removeItem(USER_STORAGE_KEY);
};

export const signup =
  (name: string, email: string, password: string) =>
    async (dispatch: Dispatch) => {
      dispatch({ type: 'SIGNUP_START' });
      try {
        const userCredential = await auth().createUserWithEmailAndPassword(
          email,
          password
        );
        const firebaseUser = userCredential.user;
        await firebaseUser.updateProfile({ displayName: name });

        const user: User = {
          uid: firebaseUser.uid,
          name,
          email: firebaseUser.email || '',
          favorites: []
        };

        await saveUserToStorage(user);

        dispatch({ type: 'SIGNUP_SUCCESS', payload: user });
      } catch (error: any) {
        dispatch({ type: 'SIGNUP_FAIL', payload: error.message });
      }
    };

export const login =
  (email: string, password: string) => async (dispatch: Dispatch) => {
    dispatch({ type: 'LOGIN_START' });
    try {
      const userCredential = await auth().signInWithEmailAndPassword(
        email,
        password
      );
      const firebaseUser = userCredential.user;

      const user: User = {
        uid: firebaseUser.uid,
        name: firebaseUser.displayName || '',
        email: firebaseUser.email || '',
        favorites: []
      };

      const storedUser = await AsyncStorage.getItem(USER_STORAGE_KEY);
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        user.favorites = parsedUser.favorites || [];
      }

      await saveUserToStorage(user);

      dispatch({ type: 'LOGIN_SUCCESS', payload: user });
    } catch (error: any) {
      dispatch({ type: 'LOGIN_FAIL', payload: error.message });
    }
  };

export const logout = () => async (dispatch: Dispatch) => {
  await removeUserFromStorage();
  await auth().signOut();
  dispatch({ type: 'LOGOUT' });
};

export const restoreUser = () => async (dispatch: Dispatch) => {
  const storedUser = await AsyncStorage.getItem(USER_STORAGE_KEY);
  if (storedUser) {
    const user: User = JSON.parse(storedUser);
    dispatch({ type: 'LOGIN_SUCCESS', payload: user });
  } else {
    dispatch({ type: 'LOGOUT' });
  }
};
