import React, { useCallback, useLayoutEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/reducers/rootReducer';
import { logout } from '../redux/actions/authActions';
import { toggleFavorite } from '../redux/actions/eventActions';
import EventCard from '../components/EventCard';
import i18n from '../utils/i18n';
import { useAppDispatch } from '../redux/hooks.ts';

const ProfileScreen = ({ navigation }: any) => {
  const dispatch = useAppDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  const events = useSelector((state: RootState) => state.events.events);
  const favorites = useSelector((state: RootState) => state.events.favorites);

  const favoriteEvents = events.filter((e) => favorites.includes(e.id));

  const onLogout = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  useLayoutEffect(() => {
    if (user) {
      navigation.setOptions({
        headerRight: () => (
          <TouchableOpacity
            onPress={onLogout}
            style={styles.logoutContainer}
          >
            <Text style={styles.logout}>{i18n.t('logout')}</Text>
          </TouchableOpacity>
        )
      });
    }
  }, [user, navigation, onLogout]);

  const onToggleFavorite = (eventId: string) => {
    dispatch(toggleFavorite(eventId));
  };

  if (!user) {
    return (
      <View style={styles.container}>
        <Text>{i18n.t('login_required')}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Name:- {user.name}</Text>
      <Text>Email:- {user.email}</Text>

      <Text style={styles.subTitle}>{i18n.t('favorites')}</Text>
      {favoriteEvents.length === 0 ? (
        <Text>{i18n.t('no_favourite_event')}</Text>
      ) : (
        <FlatList
          data={favoriteEvents}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <EventCard
              event={item}
              isFavorite={true}
              onToggleFavorite={() => onToggleFavorite(item.id)}
              onPress={() => {
              }}
            />
          )}
        />
      )}
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 15 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 5 },
  subTitle: { fontSize: 18, marginTop: 20, marginBottom: 10, fontWeight: 'bold' },
  logoutContainer: { marginRight: 15 },
  logout: { color: '#007AFF', fontWeight: 'bold' }
});
