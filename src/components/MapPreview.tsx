import React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

interface Props {
  latitude: number;
  longitude: number;
}

const MapPreview: React.FC<Props> = ({ latitude, longitude }) => {
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude,
          longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01
        }}
      >
        <Marker coordinate={{ latitude, longitude }}/>
      </MapView>
    </View>
  );
};

export default MapPreview;

const styles = StyleSheet.create({
  container: {
    height: 200,
    marginBottom: 20,
    borderRadius: 10,
    overflow: 'hidden'
  },
  map: {
    flex: 1,
    width: Dimensions.get('window').width - 30
  }
});
