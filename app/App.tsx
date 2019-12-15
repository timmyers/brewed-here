import React, { useState, useEffect } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import axios from 'axios';
import { Region } from 'react-native-maps';
import BreweryMap from './components/BreweryMap';
import BreweryList from './components/BreweryList';
import { useMapRegion } from './hooks';
import { getVisits } from './db/visits'

const useBreweries = () => {
  const [breweries, setBreweries] = useState([])

  useEffect(() => {
    (async () => {
      try {
        const breweries = await axios.get('https://api.brewedhere.co');
        setBreweries(breweries.data);
      } catch (err) {
        console.log(err);
      }
    })()
  }, []);

  return breweries;
}

const filterBreweries = (breweries: any[], region: Region) => {
  const latDif = region.latitudeDelta / 2;
  const lngDif = region.longitudeDelta / 2;
  return breweries.filter((brewery) => {
    if (brewery.lat < region.latitude - latDif
        || brewery.lat > region.latitude + latDif
        || brewery.lng < region.longitude - lngDif
        || brewery.lng > region.longitude + lngDif) {
      return false;
    }

    return true;
  });
}

export default function App() {
  const breweries = useBreweries();
  const [mapRegion, setMapRegion] = useMapRegion();

  useEffect(() => {
    (async () => {
      await getVisits();
    })()
  }, []);

  return (
    <View style={styles.container}>
      <BreweryMap 
        breweries={breweries} 
        initialRegion={mapRegion}
        onRegionChangeComplete={(region => setMapRegion(region))}
      />
      <View style={styles.bottom} >
        <BreweryList breweries={filterBreweries(breweries, mapRegion)} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    justifyContent: 'flex-end'
  },
  bottom: {
    height: '20%',
    width: '100%',
  },
});
