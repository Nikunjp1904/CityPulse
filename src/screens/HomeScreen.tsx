import React, { useEffect, useState, useLayoutEffect } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Platform
} from 'react-native';
import { useSelector } from 'react-redux';
import { fetchEvents, loadFavorites, toggleFavorite } from '../redux/actions/eventActions';
import { RootState } from '../redux/reducers/rootReducer';
import EventCard from '../components/EventCard';
import i18n, { setI18nConfig } from '../utils/i18n';
import { useAppDispatch } from '../redux/hooks.ts';
import { CommonActions } from '@react-navigation/native';
import RNRestart from 'react-native-restart';
import { AppTextInput } from '../components/AppTextInput.tsx';
import { AppText } from '../components/AppText.tsx';

const HomeScreen = ({ navigation }: any) => {
  const dispatch = useAppDispatch();
  const { events, loading, error, favorites } = useSelector((state: RootState) => state.events);

  const [keyword, setKeyword] = useState('');
  const [city, setCity] = useState('');
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    dispatch(fetchEvents('', ''));
    dispatch(loadFavorites());
  }, [dispatch]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => navigation.navigate('Profile')}
          style={styles.profileContainer}
        >
          <AppText style={styles.profile}>{i18n.t('profile')}</AppText>
        </TouchableOpacity>
      )
    });
  }, [navigation]);

  const onSearch = () => {
    if (!keyword && !city) {
      Alert.alert('Please enter keyword and city');
      return;
    }
    setHasSearched(true);
    dispatch(fetchEvents(keyword, city));
  };

  const onToggleFavorite = (eventId: string) => {
    dispatch(toggleFavorite(eventId));
  };

  const toggleLanguage = async () => {
    const newLang = i18n.locale === 'en' ? 'ar' : 'en';
    await setI18nConfig(newLang);

    if (Platform.OS === 'ios') {
      RNRestart.restart();
    } else {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'Home' }]
        })
      );
    }
  };


  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <AppTextInput
          placeholder={i18n.t('search_placeholder')}
          style={styles.input}
          value={keyword}
          onChangeText={setKeyword}
        />
        <AppTextInput
          placeholder={i18n.t('city_placeholder')}
          style={styles.input}
          value={city}
          onChangeText={setCity}
        />
        <TouchableOpacity
          onPress={onSearch}
          style={styles.buttonContainer}
        >
          <AppText style={styles.buttonText}>{i18n.t('search')}</AppText>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        onPress={toggleLanguage}
        style={styles.buttonContainer}
      >
        <AppText style={styles.buttonText}>{i18n.t('toggle_language')}</AppText>
      </TouchableOpacity>

      {loading && <ActivityIndicator size="large" color="#000" style={styles.loading}/>}
      {error && <AppText style={styles.error}>{error}</AppText>}

      {!loading && hasSearched && events.length === 0 && (
        <AppText style={styles.noResults}>No results found</AppText>
      )}

      {!loading && events.length !== 0 && (
        <FlatList
          data={events}
          keyExtractor={(item) => item.id}
          style={styles.eventList}
          renderItem={({ item }) => (
            <EventCard
              event={item}
              isFavorite={favorites.includes(item.id)}
              onToggleFavorite={() => onToggleFavorite(item.id)}
              onPress={() => navigation.navigate('EventDetail', { event: item })}
            />
          )}
        />
      )}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  searchContainer: { marginBottom: 10 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
    padding: 8,
    borderRadius: 5
  },
  error: { color: 'red', marginBottom: 10 },
  noResults: { textAlign: 'center', marginTop: 20, fontSize: 16, color: '#555' },
  profile: { color: '#007AFF', fontWeight: 'bold' },
  profileContainer: { marginRight: 15 },
  loading: { marginTop: 20 },
  eventList: { marginTop: 10 },
  buttonContainer: { backgroundColor: '#007AFF', paddingVertical: 10, borderRadius: 4 },
  buttonText: { color: '#FFF', alignSelf: 'center' }
});
