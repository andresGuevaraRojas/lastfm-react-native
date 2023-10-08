import React from 'react';
import {View, StyleSheet, FlatList, ListRenderItemInfo} from 'react-native';
import {RootStackProps} from '../navigation/RootStackNavigator';
import {
  ArtistFavorite,
  useFavoritesStore,
} from '../store/artistsFavoritesStore';
import ArtistFavoriteListItem from '../components/ArtistFavoriteListItem';

export default function FavoritesScreen({}: RootStackProps<'Favorites'>) {
  const favorites = useFavoritesStore(store => store.artists);
  const removeFavorite = useFavoritesStore(store => store.removeArtist);

  const onPressFavoriteIcon = (id: string, isFavorite: boolean) => {
    if (isFavorite) {
      removeFavorite(id);
    }
  };

  const renderItem = ({item}: ListRenderItemInfo<ArtistFavorite>) => {
    const isFavorite = favorites.some(f => f.id === item.id);
    return (
      <ArtistFavoriteListItem
        name={item.name}
        picture={item.picture}
        isFavorite={isFavorite}
        onPressIcon={() => onPressFavoriteIcon(item.id, isFavorite)}
      />
    );
  };
  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={styles.list}
        data={favorites}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#142036',
    paddingHorizontal: 16,
  },
  list: {
    gap: 40,
  },
});
