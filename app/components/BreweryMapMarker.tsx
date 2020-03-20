import React from 'react';
import { Marker } from 'react-native-maps';
import { Image } from 'react-native'
import { useBreweryVisited } from '../hooks';

interface PropTypes {
  brewery: any;
}

export default ({ 
  brewery, 
}: PropTypes) => {
  const [breweryVisited, setBreweryVisited] = useBreweryVisited(brewery.id)

  return (
    <Marker
      coordinate={{
        latitude: brewery.lat,
        longitude: brewery.lng,
      }}
    >
      <Image 
        source={breweryVisited ? require('../assets/MarkerFilled.png') : require('../assets/MarkerUnfilled.png')}
        style={{width:32, height:50}}
      />
    </Marker>
  );
}
