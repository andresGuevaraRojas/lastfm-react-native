import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {RootStackProps} from '../navigation/RootStackNavigator';
import MenuOption from '../components/MenuOption';

export default function ProfileScreen({navigation}: RootStackProps<'Profile'>) {
  const onPressFavoritesOption = () => {
    navigation.navigate('Favorites');
  };

  const onPressHistoryOption = () => {
    navigation.navigate('History');
  };
  return (
    <View style={styles.container}>
      <View style={styles.userContainer}>
        <View style={styles.userImage}>
          <Text style={styles.userImageText}>U</Text>
        </View>
        <View>
          <Text style={styles.firstName}>User</Text>
          <Text style={styles.userName}>@user</Text>
        </View>
      </View>
      <MenuOption
        iconName="heart"
        iconSize={24}
        iconColor="white"
        text="Favorites artists"
        onPress={onPressFavoritesOption}
        style={styles.optionContainer}
        textStyle={styles.optionText}
      />
      <MenuOption
        iconName="time-outline"
        iconSize={24}
        iconColor="white"
        text="Listening history"
        onPress={onPressHistoryOption}
        style={styles.optionContainer}
        textStyle={styles.optionText}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#142036',
    padding: 16,
  },
  userContainer: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    marginBottom: 16,
  },
  userImage: {
    backgroundColor: 'white',
    width: 60,
    aspectRatio: 1,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userImageText: {
    color: '#142036',
    fontWeight: 'bold',
    fontSize: 18,
  },
  firstName: {
    color: 'white',
    fontWeight: '500',
    fontSize: 16,
  },
  userName: {
    color: 'white',
    fontWeight: '500',
    fontSize: 16,
  },
  optionContainer: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    paddingVertical: 16,
  },
  optionText: {
    color: 'white',
    fontSize: 16,
  },
});
