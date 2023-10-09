import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Image, Text, Pressable} from 'react-native';
import {useTracksStore} from '../store/tracksStore';
import PlayerControl from './PlayerControl';
import {TrackInfo, getTrackInfo} from '../services/lastFmService';
import {Slider} from '@miblanchard/react-native-slider';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../navigation/RootStackNavigator';

export default function Player() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const tracks = useTracksStore(store => store.tracks);
  const currentTrackIndex = useTracksStore(store => store.playingTrackIndex);
  const setCurrentTrackIndex = useTracksStore(store => store.setPlayingTrack);
  const isPlaying = useTracksStore(store => store.isPlaying);
  const setIsPlaying = useTracksStore(store => store.setIsPlaying);
  const showPlayer = useTracksStore(store => store.showPlayer);
  const setShowPlayer = useTracksStore(store => store.setShowPlayer);

  const track = tracks[currentTrackIndex];
  const [info, setInfo] = useState<TrackInfo | null>(null);
  const picture = info?.album.image.find(image => image.size === 'large')?.[
    '#text'
  ];

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

  if (currentTrackIndex < 0 || !showPlayer) {
    return null;
  }

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

  const onPressPlayer = () => {
    setShowPlayer(false);
    navigation.navigate('Player');
  };

  const duration = Number.parseInt(track.duration, 10);

  return (
    <Pressable style={styles.container} onPress={onPressPlayer}>
      <View style={styles.trackContainer}>
        <Image
          style={styles.picture}
          source={
            picture ? {uri: picture} : require('../../assets/albumFallback.png')
          }
        />
        <Text style={styles.trackName}>{info?.name}</Text>
        <Pressable style={styles.controlsContainer}>
          <PlayerControl
            iconName="play-back"
            iconSize={30}
            iconColor="gray"
            onPress={onPressBack}
          />
          <PlayerControl
            iconName={isPlaying ? 'pause-circle' : 'play-circle'}
            iconSize={34}
            iconColor="gray"
            onPress={onPressPlayPause}
          />
          <PlayerControl
            iconName="play-forward"
            iconSize={30}
            iconColor="gray"
            onPress={onPressNext}
          />
        </Pressable>
      </View>
      <View>
        <Slider maximumValue={duration ?? 60} value={23} />
      </View>
      <View />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
  trackContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  picture: {
    width: 50,
    aspectRatio: 1,
    borderRadius: 25,
  },
  trackName: {
    color: 'gray',
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
  },
  controlsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
