import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Event } from '../types';
import { AppText } from './AppText.tsx';

interface Props {
  event: Event;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  onPress: () => void;
}

const EventCard: React.FC<Props> = ({ event, isFavorite, onToggleFavorite, onPress }) => {
  const imageUrl = event.images?.[0]?.url;

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      {imageUrl && <Image source={{ uri: imageUrl }} style={styles.image}/>}
      <View style={styles.info}>
        <AppText style={styles.title}>{event.name}</AppText>
        <AppText>{event.dates.start.localDate}</AppText>
        <TouchableOpacity onPress={onToggleFavorite} style={styles.favButton}>
          <AppText style={{ color: isFavorite ? 'red' : 'gray' }}>
            {isFavorite ? '♥' : '♡'}
          </AppText>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default EventCard;

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    overflow: 'hidden'
  },
  image: { width: 100, height: 100 },
  info: { flex: 1, padding: 10, justifyContent: 'space-between' },
  title: { fontWeight: 'bold', fontSize: 16, marginRight: 15 },
  favButton: { position: 'absolute', top: 10, right: 10 }
});
