import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import CampusMapScreen from '../screens/CampusMap';
import SettingsScreen from '../screens/Settings';
import LocationSettingsScreen from '../screens/Settings/locationmap.js';
import LocationScreen from '../screens/Rooms/location';
// new
import RoomNavigatorScreen from '../screens/Rooms';


const RoomStack = createStackNavigator({
  Room: RoomNavigatorScreen,
  Settings: SettingsScreen,
  LocationSettings: LocationSettingsScreen,
  Location: LocationScreen,
});

RoomStack.navigationOptions = {
  tabBarLabel: 'Room Navigator',
  tabBarOptions: {
    activeTintColor: '#064bcb',
  },
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-search' : 'md-search'}
    />
  ),
};

const CampusMapStack = createStackNavigator({
  CampusMap: CampusMapScreen,
});

CampusMapStack.navigationOptions = {
  tabBarLabel: 'Campus Map',
  tabBarOptions: {
    activeTintColor: 'grey',
  },
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-book' : 'md-book'}
    />
  ),
};

export default createBottomTabNavigator({
  RoomStack,
  CampusMapStack,
});
