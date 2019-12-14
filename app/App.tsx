import React, { useState, useEffect } from 'react';
import Map from './components/Map';
import BreweryList from './components/BreweryList';
import { StyleSheet, View, Dimensions, Text } from 'react-native';
import axios from 'axios';

export default function App() {
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

  return (
    <View style={styles.container}>
      <Map breweries={breweries} />
      <View style={styles.bottom} >
        <BreweryList breweries={breweries} />
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
    // backgroundColor: 'gray',
    // opacity: .2,
  },
});
