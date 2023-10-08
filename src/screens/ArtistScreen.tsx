import React, {useEffect, useState} from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import {RootStackProps} from '../navigation/RootStackNavigator';
import {ArtistInfo, getArtistInfo} from '../services/lastFmService';
import Icon from 'react-native-vector-icons/Ionicons';
import {useFavoritesStore} from '../store/artistsFavoritesStore';

export default function ArtistScreen({route}: RootStackProps<'Artist'>) {
  const {id, pictures} = route.params;

  const [artist, setArtist] = useState<ArtistInfo | null>(null);
  const addToFavorites = useFavoritesStore(state => state.addArtist);
  const removeFromFavorites = useFavoritesStore(state => state.removeArtist);
  const favorites = useFavoritesStore(state => state.artists);

  const isFavorite = favorites.some(item => item.id === id);

  const largePicture = pictures.find(p => p.size === 'extralarge');
  const mediumPictute = pictures.find(p => p.size === 'medium');

  useEffect(() => {
    async function fetchData() {
      const reponse = await getArtistInfo(id);
      setArtist(reponse);
    }
    fetchData();
  }, [id]);

  const onPressAddFavorite = () => {
    if (!artist) {
      return;
    }
    if (isFavorite) {
      removeFromFavorites(artist.mbid);
      return;
    }
    addToFavorites({
      id: artist?.mbid,
      name: artist?.name,
      picture: mediumPictute?.url ?? '',
    });
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.picture}
        source={
          largePicture
            ? {uri: largePicture.url}
            : require('../../assets/albumFallback.png')
        }
        resizeMode="stretch">
        <View style={styles.imageContent}>
          <Text style={styles.artist}>{artist?.name}</Text>
        </View>
      </ImageBackground>
      <View style={styles.content}>
        <View style={styles.stats}>
          <Text style={styles.listeners}>
            {artist?.stats.listeners} listeners
          </Text>
          <View style={styles.favorite}>
            <Text style={styles.addFavoriteText}>Add to favorites</Text>
            <TouchableOpacity
              style={styles.addFavoriteButton}
              onPress={onPressAddFavorite}>
              {isFavorite ? (
                <Icon name="heart" size={30} color={'red'} />
              ) : (
                <Icon name="heart-outline" size={30} color={'white'} />
              )}
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.bio}>{artist?.bio.summary}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#142036',
  },
  picture: {
    width: '100%',
    aspectRatio: 4 / 3,
  },
  imageContent: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.2)',
    justifyContent: 'flex-end',
    padding: 16,
  },
  artist: {
    color: 'white',
    fontSize: 30,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  listeners: {
    color: 'white',
  },
  bio: {
    color: 'white',
    paddingHorizontal: 16,
    fontSize: 16,
  },
  content: {},
  favorite: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  addFavoriteText: {
    color: 'white',
  },
  addFavoriteButton: {
    padding: 10,
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-between',

    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    marginBottom: 16,
    paddingHorizontal: 16,
  },
});
