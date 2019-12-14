import React from 'react';
import { StyleSheet, View, Text, FlatList, SafeAreaView, Dimensions } from 'react-native';

const BreweryItem = ({ brewery }) => {
  return (
    <View 
      style={styles.listItem}
      key={brewery.id}
    >
      <Text style={styles.breweryTitle}>
        { brewery.name }
      </Text>
    </View>
  );
}


export default ({ breweries }) => {
  return (
    <SafeAreaView style={styles.holder}>
      <FlatList
        style={{ height: '100%' }}
        data={breweries}
        renderItem={({ item }) => <BreweryItem brewery={item} />}
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
  listItem: {
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    height: '80%',
    marginRight: 10,
    marginLeft: 10,
    width: Dimensions.get('window').width * .8,
  },
  breweryTitle: {
    fontSize: 18,
  },
});
