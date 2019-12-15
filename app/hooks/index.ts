import React, { useState, useEffect, useRef } from 'react';
import { Region } from 'react-native-maps';

export const useMapRegion = (): [Region, React.Dispatch<React.SetStateAction<Region>>] => {
  const initialRegion: Region = {
    latitude: 39.740774,
    longitude: -105.010832,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const [mapRegion, setMapRegion] = useState(initialRegion)

  return [mapRegion, setMapRegion];
}
