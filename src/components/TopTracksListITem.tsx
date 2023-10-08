import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {TrackInfo, getTrackInfo} from '../services/lastFmService';

type Props = {
  track: string;
  artist: string;
  mbid: string;
};
function TopTracksListItem({track, artist, mbid}: Props) {
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
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={
          picture ? {uri: picture} : require('../../assets/albumFallback.png')
        }
      />
      <View>
        <Text style={styles.trackName}>{track}</Text>
        <Text style={styles.artist}>{artist}</Text>
      </View>
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
  trackName: {
    color: 'white',
    fontWeight: '600',
    fontSize: 18,
  },
  artist: {
    color: 'rgba(255,255,255,0.7)',
  },
});
export default TopTracksListItem;
