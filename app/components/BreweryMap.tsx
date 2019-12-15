import React, { useRef, useState, useEffect } from 'react';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import MapView, { Marker, Region } from 'react-native-maps';
import { StyleSheet, Platform } from 'react-native';
import { useMapRegion } from '../hooks';

interface PropTypes {
  breweries: any;
  onRegionChangeComplete: (region: Region) => void;
  initialRegion: Region;
}

export default ({ 
  breweries, 
  initialRegion,
  onRegionChangeComplete 
}: PropTypes) => {
  const map = useRef(undefined);
  const [mapReady, setMapReady] = useState(false)
  const [mapRegion, setMapRegion] = useMapRegion();

  useEffect(() => {
    if (map != undefined && mapReady) {
      map.current.animateToRegion(mapRegion, 250);
    }
  }, [mapRegion]);

  return (
    <MapView 
      ref={map}
      provider={"google"}
      style={styles.mapStyle}
      showsPointsOfInterest={false}
      showsTraffic={false}
      showsIndoors={false}
      showsUserLocation={true}
      showsMyLocationButton={true}
      customMapStyle={[{
        featureType: "poi",
        elementType: "labels",
        stylers: [
          { visibility: "off" }
        ]
      }]}
      initialRegion={initialRegion}
      onRegionChangeComplete={onRegionChangeComplete}
      onMapReady={async () => {
        setMapReady(true);
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
      { breweries.map((brewery) => (
        <Marker
          coordinate={{
            latitude: brewery.lat,
            longitude: brewery.lng,
          }}
          key={brewery.id}
        />
      )) }
    </MapView>
  );
};

const styles = StyleSheet.create({
  mapStyle: {
    flex: 1,
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
});
