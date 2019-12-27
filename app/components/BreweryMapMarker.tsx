import React from 'react';
import { Marker } from 'react-native-maps';
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
      image={breweryVisited ? require('../assets/MarkerFilled.png') : require('../assets/MarkerUnfilled.png')}
    />
  );
}
