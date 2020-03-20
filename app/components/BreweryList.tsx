import React, { useRef, useState } from 'react';
import { StyleSheet, FlatList, SafeAreaView, Dimensions } from 'react-native';
import BreweryListItem from './BreweryListItem';

export default ({ breweries }) => {
  const flatList = useRef(undefined);
  const [refresh, setRefresh] = useState(true)

  const renderItem = ({ item }) => <BreweryListItem brewery={item} />;
  const itemWidth = Dimensions.get('window').width * .8;

  return (
    <SafeAreaView style={styles.holder}>
      <FlatList
        ref={flatList}
        style={{ height: '100%' }}
        data={breweries}
        renderItem={renderItem}
        keyExtractor={(item: any) => item.id}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        getItemLayout={(data, index) => (
          { length: itemWidth, offset: itemWidth * index, index }
        )}
        // Hack to not end up scrolled past end on Android
        onContentSizeChange={(size) => {
          setRefresh(!refresh)
        }}
        extraData={refresh}
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
