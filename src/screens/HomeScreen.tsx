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
  getTopTracks,
} from '../services/lastFmService';
import TopTracksListItem from '../components/TopTracksListITem';

export default function HomeScreen() {
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

  function renderItem({item}: ListRenderItemInfo<TopTracksTrack>) {
    return (
      <TopTracksListItem
        track={item.name}
        artist={item.artist.name}
        mbid={item.mbid}
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
