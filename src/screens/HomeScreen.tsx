import React, {useEffect} from 'react';
import {
  FlatList,
  ListRenderItemInfo,
  StyleSheet,
  View,
  StatusBar,
} from 'react-native';
import {
  TopTracksTrack,
  TrackInfo,
  getTopTracks,
} from '../services/lastFmService';
import TopTracksListItem from '../components/TopTracksListITem';
import {RootStackProps} from '../navigation/RootStackNavigator';
import {useTracksStore} from '../store/tracksStore';

export default function HomeScreen({navigation}: RootStackProps<'Home'>) {
  const setTracks = useTracksStore(store => store.setTracks);
  const setPlayingTrack = useTracksStore(store => store.setPlayingTrack);
  const setIsPlaying = useTracksStore(store => store.setIsPlaying);
  const topTracks = useTracksStore(store => store.tracks);
  const setShowPlayer = useTracksStore(store => store.setShowPlayer);

  useEffect(() => {
    async function fetchData() {
      const tracks = await getTopTracks();
      setTracks(tracks.track);
    }
    fetchData();
  }, [setTracks]);

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

  const onPressItem = (index: number) => {
    setPlayingTrack(index, true);
    setIsPlaying(true);
    setShowPlayer(true);
  };

  function renderItem({item, index}: ListRenderItemInfo<TopTracksTrack>) {
    return (
      <TopTracksListItem
        track={item.name}
        artist={item.artist.name}
        mbid={item.mbid}
        onPressMenu={onPressMenuItem}
        onPress={_ => {
          onPressItem(index);
        }}
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
    paddingBottom: 70,
  },
});
