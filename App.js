import React, {Component} from 'react';
import {StyleSheet, View,AsyncStorage,ActivityIndicator,StatusBar} from 'react-native';

import { createSwitchNavigator, createStackNavigator, createAppContainer } from 'react-navigation';
//import AppStack from './src/config/AppStack';
import AuthStack from './src/config/AuthStack';
import AppStack from './src/config/HomeStack';

class AuthLoadingScreen extends Component{
  constructor(props){
    super(props);
    
    this._boostrapAsync();
  }

  _boostrapAsync = async() => {
    const userToken = await AsyncStorage.getItem('userToken');
    this.props.navigation.navigate(userToken?'App':'Auth');
  }

  render(){
    return(
      <View style={styles.container}>
        <ActivityIndicator/>
        <StatusBar barStyle="default"/>
      </View>
    )
  }
}
const Switch = createAppContainer(createSwitchNavigator(
  {
    AuthLoading:AuthLoadingScreen,
    App:AppStack,
    Auth:AuthStack
  },
  {
    initialRouteName:'AuthLoading'
  }
))

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <Switch/>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});
