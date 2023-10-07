import Config from 'react-native-config';

export type TopTracksResponse = {
  track: {
    name: string;
    duration: number;
    listeners: number;
    mbid: string;
    url: string;
    streamable: {
      '#text': number;
      fulltrack: number;
    };
    artist: {
      name: string;
      mbid: string;
      url: string;
    };
    image: {
      '#text': string;
      size: string;
    }[];
    '@attr': {
      rank: number;
    };
  }[];
  '@attr': {
    country: string;
    page: number;
    perPage: number;
    totalPages: number;
    total: number;
  };
};
export async function getTopTracks() {
  const response = await fetch(
    `${Config.API_URL}/?method=geo.getTopTracks&country=mexico&api_key=${Config.LAST_FM_KEY}&format=json`,
  );

  const tracks = await response.json();
  return tracks as TopTracksResponse;
}
