import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {RootStackProps} from '../navigation/RootStackNavigator';

export default function ProfileScreen({navigation}: RootStackProps<'Profile'>) {
  const onPressFavoritesOption = () => {
    navigation.navigate('Favorites');
  };

  const onPressHistoryOption = () => {};
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
      <OptionItem
        iconName="heart"
        text="Favorites artists"
        onPress={onPressFavoritesOption}
      />
      <OptionItem
        iconName="time-outline"
        text="Reproduction history"
        onPress={onPressHistoryOption}
      />
    </View>
  );
}

function OptionItem({
  iconName,
  text,
  onPress,
}: {
  iconName: string;
  text: string;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.optionContainer}>
      <Icon name={iconName} size={24} color={'white'} />
      <Text style={styles.optionText}>{text}</Text>
    </TouchableOpacity>
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
