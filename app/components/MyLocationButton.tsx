import React from 'react';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import { StyleSheet, TouchableOpacity, Image, StatusBar, Platform, Button } from 'react-native';
import { useMapRegion } from '../hooks';

interface PropTypes {
}

export default ({ }: PropTypes) => {
  const [mapRegion, setMapRegion] = useMapRegion();

  return (
    <TouchableOpacity 
      style={styles.holder}
      onPress={async () => {
        console.log('MY LOCATION')
        if (Platform.OS === 'android') {
          let status = await Permissions.askAsync(Permissions.LOCATION);
          if (status.status === 'granted') {
            const location = await Location.getCurrentPositionAsync({});

            const { latitude, longitude } = location.coords;
            setMapRegion({
              latitude,
              longitude,
              latitudeDelta: .02,
              longitudeDelta: .02,
            });
          } 
        }
      }}
    >
      <Image
        style={styles.image}
        source={require('../assets/myLocation.png')}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  holder: {
    width: 40,
    height: 40,
    borderRadius: 5,
    position: 'absolute',
    right: 10,
    top: StatusBar.currentHeight + 10,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: 30,
    width: 30,
  }
});
