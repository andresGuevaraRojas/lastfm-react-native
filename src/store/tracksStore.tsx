import {create} from 'zustand';
import {TopTracksTrack} from '../services/lastFmService';
import {createJSONStorage, persist} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface Tracks {
  tracks: TopTracksTrack[];
  setTracks: (tracks: TopTracksTrack[]) => void;
  playingTrackIndex: number;
  setPlayingTrack: (index: number, includeToHistory?: boolean) => void;
  historyPlayedTracksIndex: number[];
  isPlaying: boolean;
  setIsPlaying: (isPlaying: boolean) => void;
}
export const useTracksStore = create<Tracks>()(
  persist(
    (set, get) => ({
      tracks: [],
      playingTrackIndex: -1,
      historyPlayedTracksIndex: [],
      isPlaying: false,
      setTracks: tracks => set({tracks: tracks}),
      setPlayingTrack: (index, includeToHistory) =>
        set(_ => {
          if (includeToHistory) {
            return {
              playingTrackIndex: index,
              historyPlayedTracksIndex: [
                ...get().historyPlayedTracksIndex,
                index,
              ],
            };
          }
          return {playingTrackIndex: index};
        }),
      setIsPlaying: isPlaying => set({isPlaying: isPlaying}),
    }),
    {
      name: 'history-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: state => ({
        historyPlayedTracksIndex: state.historyPlayedTracksIndex,
      }),
    },
  ),
);
