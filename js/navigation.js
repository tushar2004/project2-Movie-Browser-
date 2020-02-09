import React from 'react';

import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import Icon from 'react-native-vector-icons/Ionicons'

import SearchScreen from './../screens/SearchScreen'
import MovieDetailsScreen from './../screens/MovieDetailsScreen'
import SettingsScreen from './../screens/SettingsScreen'

const MainStack = createStackNavigator({
	Home: SearchScreen,
	MovieDetails: MovieDetailsScreen
},{
	initialRouteName: 'Home'
})

const SettingsStack = createStackNavigator({
	Settings: SettingsScreen
}, {
	initialRouteName: 'Settings',
})
	
const AppNavigator = createBottomTabNavigator(
{
	Movies: MainStack,
	Settings: SettingsStack 
}, {
	defaultNavigationOptions: ({ navigation }) => ({
		tabBarIcon: ({ focused, tintColor }) => {
			const { routeName } = navigation.state;
			let icon;
			if(routeName === 'Settings') {
				icon = 'ios-options';
			} else if (routeName === 'Movies') {
				icon = 'ios-videocam';
			}
			return <Icon name={icon} size={30} color={tintColor} />
		}	
	}),
	initialRouteName: 'Settings',
	tabBarOptions: {
		activeTintColor: 'orange',
		inactiveTintColor: 'grey',
	}
})

const AppContainer = createAppContainer(AppNavigator)
export default AppContainer;
