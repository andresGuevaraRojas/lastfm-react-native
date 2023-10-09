import Config from 'react-native-config';

export type TopTracksTrack = {
  name: string;
  duration: string;
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
};

export type TopTracksResponse = {
  tracks: {
    track: TopTracksTrack[];
    '@attr': {
      country: string;
      page: number;
      perPage: number;
      totalPages: number;
      total: number;
    };
  };
};

export type TopTracks = {
  track: TopTracksTrack[];
  '@attr': {
    country: string;
    page: number;
    perPage: number;
    totalPages: number;
    total: number;
  };
};

export type TrackInfoResponse = {
  track: TrackInfo;
};

export type TrackInfo = {
  name: string;
  mbid: string;
  url: string;
  duration: number;
  listeners: number;
  playcount: number;
  artist: {
    name: string;
    mbid: string;
    url: string;
  };
  album: {
    artist: string;
    title: string;
    mbid: string;
    url: string;
    image: {
      '#text': string;
      size: string;
    }[];
  };
};

export type ArtistInfoResponse = {
  artist: ArtistInfo;
};

export type ArtistInfo = {
  name: string;
  mbid: string;
  url: string;
  image: {
    '#text': string;
    size: string;
  }[];
  stats: {
    listeners: number;
    playcount: number;
  };
  bio: {
    links: {
      link: {
        '#text': string;
        rel: string;
        href: string;
      };
    };
    published: string;
    summary: string;
  };
};

export async function getTopTracks(limit = 10, page = 1, country = 'mexico') {
  const response = await fetch(
    `${Config.API_URL}/?method=geo.getTopTracks&country=${country}&limit=${limit}&page=${page}&api_key=${Config.LAST_FM_KEY}&format=json`,
  );

  const responseJson = (await response.json()) as TopTracksResponse;
  return responseJson.tracks;
}

export async function getTrackInfo(mbid: string) {
  const response = await fetch(
    `${Config.API_URL}/?method=track.getInfo&api_key=${Config.LAST_FM_KEY}&mbid=${mbid}&format=json`,
  );

  const responseJson = (await response.json()) as TrackInfoResponse;
  return responseJson.track;
}

export async function getArtistInfo(mbid: string) {
  const response = await fetch(
    `${Config.API_URL}/?method=artist.getInfo&api_key=${Config.LAST_FM_KEY}&mbid=${mbid}&format=json`,
  );

  const responseJson = (await response.json()) as ArtistInfoResponse;
  return responseJson.artist;
}
