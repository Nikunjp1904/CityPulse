import React from 'react';
import { Text, StyleSheet, ScrollView, Linking, Button } from 'react-native';
import MapPreview from '../components/MapPreview';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/types';
import i18n from '../utils/i18n.ts';

type EventDetailScreenRouteProp = RouteProp<RootStackParamList, 'EventDetail'>;

type Props = {
  route: EventDetailScreenRouteProp;
};

const EventDetailScreen: React.FC<Props> = ({ route }) => {
  const { event } = route.params;

  const venue = event._embedded?.venues?.[0];
  const location = venue?.location;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{event.name}</Text>
      <Text>Date: {event.dates.start.localDate}</Text>
      <Text>Venue: {venue?.name}</Text>
      <Text>City: {venue?.city.name}</Text>
      <Text style={styles.countryText}>Country: {venue?.country.name}</Text>
      {location && (
        <MapPreview
          latitude={parseFloat(location.latitude)}
          longitude={parseFloat(location.longitude)}
        />
      )}
      <Button title={i18n.t('buy_ticket')} onPress={() => Linking.openURL(event.url)}/>
    </ScrollView>
  );
};

export default EventDetailScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 15 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  countryText: { marginBottom: 20 }
});
