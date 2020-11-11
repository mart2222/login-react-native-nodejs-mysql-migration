import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {Provider} from 'react-redux';
import './config/ReactotronConfig';
import './config/StatusBarConfig';
import Routes from './routes';
import {setNavigator} from './services/navigate';
import store from './store';

function App() {
  return (
    <Provider store={store}>
      <NavigationContainer ref={setNavigator}>
        <Routes />
      </NavigationContainer>
    </Provider>
  );
}

export default App;
