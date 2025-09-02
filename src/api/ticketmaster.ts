import axios from 'axios';
import { Event, TICKET_MASTER_API_KEY } from '../types';

export const searchEvents = async (keyword: string, city: string): Promise<Event[]> => {
  const url = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${TICKET_MASTER_API_KEY}&keyword=${keyword}&city=${city}`;
  const response = await axios.get(url);
  return response.data._embedded?.events || [];
};
