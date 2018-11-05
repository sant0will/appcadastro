import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import Routes from './src/Routes';
import SplashScreen from 'react-native-splash-screen'


export default class appcadastro extends Component {
  componentDidMount() {
    // do stuff while splash screen is shown
      // After having done stuff (such as async tasks) hide the splash screen
      SplashScreen.hide();
  }

  render() {
    return (
      <Routes />
    );
  }
}

AppRegistry.registerComponent('appcadastro', () => appcadastro);
