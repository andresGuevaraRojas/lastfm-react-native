import AsyncStorage from '@react-native-async-storage/async-storage';
import {create} from 'zustand';
import {createJSONStorage, persist} from 'zustand/middleware';

export interface ArtistFavorite {
  id: string;
  name: string;
  picture: string;
}

export interface ArtistsFavorites {
  artists: ArtistFavorite[];
  addArtist: (artist: ArtistFavorite) => void;
  removeArtist: (artistId: string) => void;
}

export const useFavoritesStore = create(
  persist<ArtistsFavorites>(
    (set, get) => ({
      artists: [],
      addArtist: artist => set({artists: [...get().artists, artist]}),
      removeArtist: artistId =>
        set({artists: get().artists.filter(artist => artist.id !== artistId)}),
    }),
    {
      name: 'favotitesArtists-storage',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
