import React, { useRef, useEffect } from 'react';
import { Marker } from 'react-native-maps';
import { Image } from 'react-native'
import { useBreweryVisited } from '../hooks';

interface PropTypes {
  brewery: any;
}

const BreweryMapMarker = ({ 
  brewery, 
}: PropTypes) => {
  const [breweryVisited, setBreweryVisited] = useBreweryVisited(brewery.id)
  const marker = useRef(undefined);
  useEffect(() => {
    marker.current.redraw()
  }, [ breweryVisited ])

  return (
    <Marker
      ref={marker}
      tracksViewChanges={false}
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
};

export default BreweryMapMarker;
