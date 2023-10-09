import React from 'react';
import {createStackNavigator, StackScreenProps} from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import ArtistScreen from '../screens/ArtistScreen';
import PlayerScreen from '../screens/PlayerScreen';
import ProfileScreen from '../screens/ProfileScreen';
import TrackOptionsScreen from '../screens/TrackOptionsScreen';
import FavoritesScreen from '../screens/FavortitesScreen';
import {HomeHeaderRight} from '../components/HomeHeaderRight';
import ProfileHeaderBackImage from '../components/ProfileHeaderBackImage';
import Player from '../components/Player';
import HistoryScreen from '../screens/HistoryScreen';

export type RootStackParamList = {
  Home: undefined;
  Artist: {id: string; pictures: {size: string; url: string}[]};
  Player: undefined;
  Profile: undefined;
  TrackOptions: {
    id: string;
    pictures: {size: string; url: string}[];
    artist: string;
    artistId: string;
    track: string;
  };
  Favorites: undefined;
  History: undefined;
};

const RootStack = createStackNavigator<RootStackParamList>();

export type RootStackProps<T extends keyof RootStackParamList> =
  StackScreenProps<RootStackParamList, T>;

function RootStackNavigator() {
  return (
    <>
      <RootStack.Navigator
        screenOptions={{
          headerTintColor: 'white',
          headerStyle: {backgroundColor: '#142036'},
          headerShadowVisible: false,
        }}>
        <RootStack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: 'Top Tracks',
            headerTitleStyle: {fontSize: 20},
            headerRight: HomeHeaderRight,
            headerRightContainerStyle: {paddingRight: 16},
          }}
        />
        <RootStack.Screen
          name="Artist"
          component={ArtistScreen}
          options={{headerShown: false}}
        />
        <RootStack.Screen
          name="Player"
          component={PlayerScreen}
          options={{
            presentation: 'transparentModal',
            headerShadowVisible: false,
          }}
        />
        <RootStack.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            presentation: 'modal',
            headerBackImage: ProfileHeaderBackImage,
            headerTitle: '',
            headerShadowVisible: false,
          }}
        />
        <RootStack.Screen
          name="TrackOptions"
          component={TrackOptionsScreen}
          options={{presentation: 'transparentModal', headerShown: false}}
        />
        <RootStack.Screen name="Favorites" component={FavoritesScreen} />
        <RootStack.Screen name="History" component={HistoryScreen} />
      </RootStack.Navigator>
      <Player />
    </>
  );
}

export default RootStackNavigator;
