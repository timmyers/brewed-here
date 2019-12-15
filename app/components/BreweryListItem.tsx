import React from 'react';
import { StyleSheet, View, Text, Dimensions, Switch } from 'react-native';

interface PropTypes {
  brewery: any;
}

export default ({ brewery }: PropTypes) => {
  return (
    <View 
      style={styles.holder}
      key={brewery.id}
    >
      <Text style={styles.breweryTitle}>
        { brewery.name }
      </Text>
      <View style={styles.visitedHolder}>
        <Text style={styles.visitedText}>Visited</Text>
        <Switch
          onValueChange={(value) => {
            console.log(`${brewery.name} visited`)

          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  holder: {
    justifyContent: 'flex-start',
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
  visitedHolder: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  visitedText: {
    fontSize: 14,
    marginRight: 5,
  },
});
