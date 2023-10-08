import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../navigation/RootStackNavigator';

export function HomeHeaderRight() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const onPress = () => {
    navigation.navigate('Profile');
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text style={styles.text}>U</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    width: 40,
    aspectRatio: 1,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#142036',
    fontWeight: 'bold',
    fontSize: 18,
  },
});
