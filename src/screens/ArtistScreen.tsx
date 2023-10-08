import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {RootStackProps} from '../navigation/RootStackNavigator';

export default function ArtistScreen({route}: RootStackProps<'Artist'>) {
  const {id} = route.params;

  return (
    <View style={styles.container}>
      <Text>Artist</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#142036',
    paddingHorizontal: 16,
  },
});
