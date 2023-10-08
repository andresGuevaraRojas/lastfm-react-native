import React from 'react';
import {Image, View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export type Props = {
  picture: string;
  name: string;
  isFavorite: boolean;
  onPressIcon: () => void;
};
export default function ArtistFavoriteListItem({
  picture,
  name,
  isFavorite,
  onPressIcon,
}: Props) {
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={
          picture ? {uri: picture} : require('../../assets/albumFallback.png')
        }
      />
      <View style={styles.info}>
        <Text style={styles.artist}>{name}</Text>
      </View>
      <TouchableOpacity style={styles.addFavoriteButton} onPress={onPressIcon}>
        {isFavorite ? (
          <Icon name="heart" size={30} color={'red'} />
        ) : (
          <Icon name="heart-outline" size={30} color={'white'} />
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  image: {
    width: 80,
    aspectRatio: 1,
    borderRadius: 8,
  },
  artist: {
    color: 'white',
    fontWeight: '600',
    fontSize: 18,
  },
  info: {
    flex: 1,
  },
  addFavoriteButton: {
    padding: 10,
  },
});
