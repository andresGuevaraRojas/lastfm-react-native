import React, {useState, useEffect} from 'react';
import {Text, View} from 'react-native';
import {TopTracksResponse, getTopTracks} from '../services/lastFmService';

export default function HomeScreen() {
  const [topTracks, setTopTracks] = useState<TopTracksResponse>({
    track: [],
    '@attr': {
      country: '',
      page: 0,
      perPage: 0,
      totalPages: 0,
      total: 0,
    },
  });

  useEffect(() => {
    async function fetchData() {
      const tracks = await getTopTracks();
      setTopTracks(tracks);
    }
    fetchData();
  }, []);

  return (
    <View>
      <Text>Home</Text>
    </View>
  );
}
