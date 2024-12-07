import React from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import SafeAreaWrapper from '../components/SafeAreaWrapper';
import { useAppDispatch, useAppSelector } from '../redux/storeHooks';
import Header from '../components/Header';

const MapScreen = ({ route }: { route: any }) => {
  

  const {latitude, longitude  } = useAppSelector(state => state?.setting?.location)

  return (
    <SafeAreaWrapper>
      <Header />
      {latitude && longitude ? (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude,
            longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
        >
          <Marker coordinate={{ latitude, longitude }} title="Your Location" />
        </MapView>
      ) : (
        <Text>Location not available</Text>
      )}
    </SafeAreaWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

export default MapScreen;
