import React from 'react';
import {
  FlatList,
  ListRenderItemInfo,
  StyleSheet,
  View,
  StatusBar,
} from 'react-native';
import {TopTracksTrack, TrackInfo} from '../services/lastFmService';
import TopTracksListItem from '../components/TopTracksListITem';
import {RootStackProps} from '../navigation/RootStackNavigator';
import {useTracksStore} from '../store/tracksStore';

export default function HistoryScreen({navigation}: RootStackProps<'History'>) {
  const topTracks = useTracksStore(store => store.tracks);
  const historyTracksId = useTracksStore(
    store => store.historyPlayedTracksIndex,
  );
  const setPlayingTrack = useTracksStore(store => store.setPlayingTrack);
  const setIsPlaying = useTracksStore(store => store.setIsPlaying);
  const historyTracks = historyTracksId.map(index => topTracks[index]);

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

  const onPressItem = (item: TrackInfo | null) => {
    const indexOnTrackList = topTracks.findIndex(
      topTrack => topTrack.url === item?.url,
    );
    setPlayingTrack(indexOnTrackList);
    setIsPlaying(true);
  };

  function renderItem({item}: ListRenderItemInfo<TopTracksTrack>) {
    return (
      <TopTracksListItem
        track={item.name}
        artist={item.artist.name}
        mbid={item.mbid}
        onPressMenu={onPressMenuItem}
        onPress={itemTrack => {
          onPressItem(itemTrack);
        }}
      />
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={'#142036'} />
      <FlatList
        contentContainerStyle={styles.list}
        data={historyTracks}
        renderItem={renderItem}
        keyExtractor={(item, index) => `${item.url}-${index}`}
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
