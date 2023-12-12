// index.js
import { AppRegistry } from 'react-native';
import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './src/Redux/reducer/reducer';// Update the path

import App from './App';
import { name as appName } from './app.json';

const store = createStore(rootReducer);

const ReduxApp = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

AppRegistry.registerComponent(appName, () => ReduxApp);
