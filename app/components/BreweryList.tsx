import React, { useRef } from 'react';
import { StyleSheet, FlatList, SafeAreaView } from 'react-native';
import BreweryListItem from './BreweryListItem';

export default ({ breweries }) => {
  const flatList = useRef(undefined);

  return (
    <SafeAreaView style={styles.holder}>
      <FlatList
        ref={flatList}
        style={{ height: '100%' }}
        data={breweries}
        renderItem={({ item }) => <BreweryListItem brewery={item} />}
        keyExtractor={(item: any) => item.id}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        onContentSizeChange={() => {
          flatList.current.scrollToOffset(0)
        }}
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
