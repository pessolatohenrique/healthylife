/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { Provider } from 'react-redux';
import { AppRegistry } from 'react-native';
import { Root } from 'native-base';
import './src/config/ReactotronConfig';
import Navigator from './src/Navigator';
import { name as appName } from './app.json';
import storeConfig from './src/config/store';

const store = storeConfig();

const Redux = () => (
  <Root>
    <Provider store={store}>
      <Navigator />
    </Provider>
  </Root>
);

AppRegistry.registerComponent(appName, () => Redux);
