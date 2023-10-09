import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {RootStackProps} from '../navigation/RootStackNavigator';
import {useTracksStore} from '../store/tracksStore';
import {TrackInfo, getTrackInfo} from '../services/lastFmService';
import PlayerControl from '../components/PlayerControl';
import {Slider} from '@miblanchard/react-native-slider';

export default function PlayerScreen({}: RootStackProps<'Player'>) {
  const tracks = useTracksStore(store => store.tracks);
  const currentTrackIndex = useTracksStore(store => store.playingTrackIndex);
  const setCurrentTrackIndex = useTracksStore(store => store.setPlayingTrack);
  const isPlaying = useTracksStore(store => store.isPlaying);
  const setIsPlaying = useTracksStore(store => store.setIsPlaying);

  const track = tracks[currentTrackIndex];
  const [info, setInfo] = useState<TrackInfo | null>(null);
  const picture = info?.album.image.find(
    image => image.size === 'extralarge',
  )?.['#text'];

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      if (currentTrackIndex < 0) {
        return;
      }

      if (!track) {
        return;
      }
      setIsLoading(true);
      const response = await getTrackInfo(track.mbid);
      setInfo(response);
      setIsLoading(false);
    }
    fetchData();
  }, [currentTrackIndex, track]);

  const onPressNext = () => {
    if (isLoading) {
      return;
    }
    if (currentTrackIndex === tracks.length - 1) {
      return;
    }
    setCurrentTrackIndex(currentTrackIndex + 1);
  };

  const onPressBack = () => {
    if (isLoading) {
      return;
    }
    if (currentTrackIndex === 0) {
      return;
    }
    setCurrentTrackIndex(currentTrackIndex - 1);
  };

  const onPressPlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const duration = Number.parseInt(track.duration, 10);

  return (
    <View style={styles.wraper}>
      <View style={styles.container}>
        <View style={styles.trackContainer}>
          <Image
            style={styles.picture}
            source={
              picture
                ? {uri: picture}
                : require('../../assets/albumFallback.png')
            }
          />
          <Text style={styles.trackName}>{info?.name}</Text>
          <Text style={styles.artist}>{info?.artist.name}</Text>
        </View>
        <View style={styles.optionsContainer}>
          <View>
            <Slider maximumValue={duration ?? 60} value={23} />
          </View>
          <View style={styles.controlsContainer}>
            <PlayerControl
              iconName="play-back"
              iconSize={50}
              iconColor="gray"
              onPress={onPressBack}
            />
            <PlayerControl
              iconName={isPlaying ? 'pause-circle' : 'play-circle'}
              iconSize={54}
              iconColor="gray"
              onPress={onPressPlayPause}
            />
            <PlayerControl
              iconName="play-forward"
              iconSize={50}
              iconColor="gray"
              onPress={onPressNext}
            />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wraper: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: '#142036',
  },
  container: {
    height: '80%',
    backgroundColor: 'rgba(255,255,255,0.96)',
    borderTopEndRadius: 60,
    borderTopStartRadius: 60,
    paddingTop: 40,
  },
  trackContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  optionsContainer: {
    paddingHorizontal: 20,
  },
  controlsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  picture: {
    width: 250,
    aspectRatio: 1,
    borderRadius: 40,
    marginBottom: 40,
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
    fontSize: 20,
  },
  artist: {
    color: 'gray',
    fontSize: 16,
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
