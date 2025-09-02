import { Event } from '../types';

export type RootStackParamList = {
  Login: undefined;
  Signup: undefined;
  Home: undefined;
  EventDetail: { event: Event };
  Profile: undefined;
};
