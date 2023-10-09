import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {TrackInfo, getTrackInfo} from '../services/lastFmService';
import Icon from 'react-native-vector-icons/Ionicons';

type Props = {
  track: string;
  artist: string;
  mbid: string;
  onPressMenu: (trackInfo: TrackInfo | null) => void;
  onPress: (trackInfo: TrackInfo | null) => void;
};
function TopTracksListItem({track, artist, mbid, onPressMenu, onPress}: Props) {
  const [info, setInfo] = useState<TrackInfo | null>(null);

  useEffect(() => {
    async function fetchData() {
      if (mbid === '') {
        return;
      }
      const response = await getTrackInfo(mbid);
      setInfo(response);
    }
    fetchData();
  }, [mbid]);

  const picture = info?.album.image.find(image => image.size === 'large')?.[
    '#text'
  ];

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        onPress(info);
      }}>
      <Image
        style={styles.image}
        source={
          picture ? {uri: picture} : require('../../assets/albumFallback.png')
        }
      />
      <View style={styles.info}>
        <Text style={styles.trackName}>{track}</Text>
        <Text style={styles.artist}>{artist}</Text>
      </View>
      <TouchableOpacity
        onPress={() => {
          onPressMenu(info);
        }}>
        <Icon name="ellipsis-horizontal" size={30} color={'white'} />
      </TouchableOpacity>
    </TouchableOpacity>
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
  trackName: {
    color: 'white',
    fontWeight: '600',
    fontSize: 18,
  },
  artist: {
    color: 'rgba(255,255,255,0.7)',
  },
  info: {
    flex: 1,
  },
});
export default TopTracksListItem;
