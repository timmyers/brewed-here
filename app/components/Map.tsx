import React, { useState, useEffect } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, Dimensions} from 'react-native';

export default ({ breweries }) => {
  return (
    <MapView 
      provider={"google"}
      style={styles.mapStyle}
      showsPointsOfInterest={false}
      showsTraffic={false}
      showsIndoors={false}
      customMapStyle={[
		    {
          featureType: "poi",
          elementType: "labels",
          stylers: [
              { visibility: "off" }
          ]
		    }
      ]}
      initialRegion={{
        latitude: 39.740774,
        longitude: -105.010832,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
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
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
});
