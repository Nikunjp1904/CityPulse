import React from 'react';
import { StyleSheet, ScrollView, Linking, TouchableOpacity } from 'react-native';
import MapPreview from '../components/MapPreview';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/types';
import i18n from '../utils/i18n.ts';
import { AppText } from '../components/AppText.tsx';

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
      <AppText style={styles.title}>{event.name}</AppText>
      <AppText>Date: {event.dates.start.localDate}</AppText>
      <AppText>Venue: {venue?.name}</AppText>
      <AppText>City: {venue?.city.name}</AppText>
      <AppText style={styles.countryText}>Country: {venue?.country.name}</AppText>
      {location && (
        <MapPreview
          latitude={parseFloat(location.latitude)}
          longitude={parseFloat(location.longitude)}
        />
      )}
      <TouchableOpacity
        onPress={() => Linking.openURL(event.url)}
        style={styles.buttonContainer}
      >
        <AppText style={styles.buyTicket}>{i18n.t('buy_ticket')}</AppText>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default EventDetailScreen;

const styles = StyleSheet.create({
  container: { flex: 1, margin: 15 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  countryText: { marginBottom: 20 },
  buttonContainer: { backgroundColor: '#007AFF', paddingVertical: 10, borderRadius: 4 },
  buyTicket: { color: '#FFF', alignSelf: 'center' }
});
