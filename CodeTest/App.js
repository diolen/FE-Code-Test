/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React, { Component } from 'react'
import {
  AppRegistry,
  StatusBar,
  Text,
  View
} from 'react-native'
import {createStackNavigator, createAppContainer} from 'react-navigation';
import Cocktails from './screens/Cocktails';
import Cocktail from './screens/Cocktail';

const RootApp = createStackNavigator({
  Cocktails: {screen: Cocktails},
  Cocktail: {screen: Cocktail},
});

const App = createAppContainer(RootApp);

export default App;