import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import Routes from './src/Routes';

export default class appcadastro extends Component {
  render() {
    return (
      <Routes />
    );
  }
}

AppRegistry.registerComponent('appcadastro', () => appcadastro);
