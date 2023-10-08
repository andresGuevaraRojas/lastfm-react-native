import React, {useState, useEffect} from 'react';
import {
  FlatList,
  ListRenderItemInfo,
  StyleSheet,
  View,
  StatusBar,
} from 'react-native';
import {
  TopTracks,
  TopTracksTrack,
  TrackInfo,
  getTopTracks,
} from '../services/lastFmService';
import TopTracksListItem from '../components/TopTracksListITem';
import {RootStackProps} from '../navigation/RootStackNavigator';

export default function HomeScreen({navigation}: RootStackProps<'Home'>) {
  const [topTracksResponse, setTopTracksResponse] = useState<TopTracks>({
    track: [],
    '@attr': {
      country: '',
      page: 1,
      perPage: 0,
      totalPages: 0,
      total: 0,
    },
  });

  const topTracks = topTracksResponse.track;

  useEffect(() => {
    async function fetchData() {
      const tracks = await getTopTracks();
      setTopTracksResponse(tracks);
    }
    fetchData();
  }, []);

  const onPressMenuItem = (item: TrackInfo | null) => {
    if (!item) {
      return;
    }
    const pictures = item.album.image.map(p => ({
      size: p.size,
      url: p['#text'],
    }));

    navigation.navigate('TrackOptions', {
      id: item.mbid,
      pictures: pictures,
      track: item.name,
      artist: item.artist.name,
      artistId: item.artist.mbid,
    });
  };

  function renderItem({item}: ListRenderItemInfo<TopTracksTrack>) {
    return (
      <TopTracksListItem
        track={item.name}
        artist={item.artist.name}
        mbid={item.mbid}
        onPressMenu={onPressMenuItem}
      />
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={'#142036'} />
      <FlatList
        contentContainerStyle={styles.list}
        data={topTracks}
        renderItem={renderItem}
        keyExtractor={item => item.url}
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
