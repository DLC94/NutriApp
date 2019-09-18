/*import {createStackNavigator} from 'react-navigation';
import Dashboard from '../screens/Dashboard';

let scenes = {Home:Dashboard}

const AppStack = createStackNavigator(scenes);

export default AppStack;*/

import React,{Component} from 'react';
import {Text, View} from 'react-native';
import {createBottomTabNavigator, createAppContainer} from 'react-navigation';

import Dashboard from '../screens/Dashboard';
import CalendarScreen from '../screens/CalendarScreen';
import RecipesScreen from '../screens/RecipesScreen';
//import FitScreen from '../screens/FitScreen';

import Ionicons from 'react-native-vector-icons/MaterialCommunityIcons';



const TabNavigator = createBottomTabNavigator({
    Home:Dashboard,
    Calendar:CalendarScreen,
    Recipes:RecipesScreen,
    //Fit:FitScreen
},
{
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'Home') {
          iconName = `home`;
        } else if (routeName === 'Recipes') {
          iconName = `food-apple`;
        } else if(routeName === 'Calendar'){
            iconName = `calendar`
        } /*else if(routeName === 'Fit'){
            iconName = `google-fit`
        }*/

        // You can return any component that you like here! We usually use an
        // icon component from react-native-vector-icons
        return <Ionicons name={iconName} size={horizontal ? 20 : 22} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: '#ffffff',
      inactiveTintColor: '#f8f8f8',
      activeBackgroundColor:'#ff9800',
      inactiveBackgroundColor:'#4db6ac',
      labelStyle:{fontSize:13,fontWeight:"bold"}
    },
  });

export default createAppContainer(TabNavigator);
