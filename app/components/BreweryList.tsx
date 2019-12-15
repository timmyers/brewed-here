import React from 'react';
import { StyleSheet, View, Text, FlatList, SafeAreaView, Dimensions } from 'react-native';
import BreweryListItem from './BreweryListItem';


export default ({ breweries }) => {
  return (
    <SafeAreaView style={styles.holder}>
      <FlatList
        style={{ height: '100%' }}
        data={breweries}
        renderItem={({ item }) => <BreweryListItem brewery={item} />}
        keyExtractor={(item: any) => item.id}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      />
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  holder: {
    height: '100%',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'scroll',
  },
});
