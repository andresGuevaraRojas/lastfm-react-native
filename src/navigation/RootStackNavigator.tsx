import React from 'react';
import {createStackNavigator, StackScreenProps} from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import ArtistScreen from '../screens/ArtistScreen';
import PlayerScreen from '../screens/PlayerScreen';
import ProfileScreen from '../screens/ProfileScreen';
import TrackOptionsScreen from '../screens/TrackOptionsScreen';

export type RootStackParamList = {
  Home: undefined;
  Artist: {id: string; picture: string | undefined};
  Player: undefined;
  Profile: undefined;
  TrackOptions: {
    id: string;
    pictures: {size: string; url: string}[];
    artist: string;
    artistId: string;
    track: string;
  };
};

const RootStack = createStackNavigator<RootStackParamList>();

export type RootStackProps<T extends keyof RootStackParamList> =
  StackScreenProps<RootStackParamList, T>;

function RootStackNavigator() {
  return (
    <RootStack.Navigator
      screenOptions={{
        headerTintColor: 'white',
        headerStyle: {backgroundColor: '#142036'},
        headerShadowVisible: false,
      }}>
      <RootStack.Screen
        name="Home"
        component={HomeScreen}
        options={{title: 'Top Tracks', headerTitleStyle: {fontSize: 20}}}
      />
      <RootStack.Screen
        name="Artist"
        component={ArtistScreen}
        options={{headerShown: false}}
      />
      <RootStack.Screen name="Player" component={PlayerScreen} />
      <RootStack.Screen name="Profile" component={ProfileScreen} />
      <RootStack.Screen
        name="TrackOptions"
        component={TrackOptionsScreen}
        options={{presentation: 'transparentModal', headerShown: false}}
      />
    </RootStack.Navigator>
  );
}

export default RootStackNavigator;
