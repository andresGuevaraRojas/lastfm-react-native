import React from 'react';
import {Image, StyleSheet, Text, View, Pressable} from 'react-native';
import {RootStackProps} from '../navigation/RootStackNavigator';
import MenuOption from '../components/MenuOption';

export default function TrackOptionsScreen({
  route,
  navigation,
}: RootStackProps<'TrackOptions'>) {
  const {pictures, track, artist, artistId} = route.params;

  const picture = pictures.find(p => p.size === 'medium');

  const onPressModal = () => {
    navigation.goBack();
  };

  const onPressSeeArtist = () => {
    navigation.navigate('Artist', {id: artistId, pictures: pictures});
  };

  return (
    <Pressable style={styles.wraper} onPress={onPressModal}>
      <View style={styles.container}>
        <View style={styles.card}>
          <Image
            style={styles.picture}
            source={
              picture
                ? {uri: picture.url}
                : require('../../assets/albumFallback.png')
            }
          />
          <View>
            <Text style={styles.trackName}>{track}</Text>
            <Text style={styles.artist}>{artist}</Text>
          </View>
          <View />
        </View>
        <View style={styles.options}>
          <MenuOption
            iconName="person-outline"
            iconSize={30}
            iconColor="#142036"
            text="See artist"
            onPress={onPressSeeArtist}
          />
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wraper: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  container: {
    height: '60%',
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderRadius: 20,
  },
  picture: {
    width: 60,
    aspectRatio: 1,
    borderRadius: 8,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderBottomColor: 'rgba(255,255,255,0.80)',
    borderBottomWidth: 1,
    padding: 16,
  },
  trackName: {
    color: '#142036',
    fontWeight: '600',
    fontSize: 18,
  },
  artist: {
    color: '#142036',
  },
  options: {
    paddingHorizontal: 16,
  },
  option: {
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  optionText: {
    fontWeight: '600',
    color: '#142036',
    fontSize: 16,
  },
});
