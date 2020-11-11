import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Login from './pages/Login';
import Registro from './pages/Registro';
import ListagemGrupo from './pages/ListagemGrupo';

const Stack = createStackNavigator();

const Routes = () => (
  <Stack.Navigator>
    <Stack.Screen
      options={{
        headerShown: false,
      }}
      name="Login"
      component={Login}
    />
    <Stack.Screen
      options={{
        headerStyle: {
          backgroundColor: '#04783b',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
      name="Registro"
      component={Registro}
    />
    <Stack.Screen
      options={{
        title: 'Grupos',
        headerStyle: {
          backgroundColor: '#04783b',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
          alignSelf: 'center',
        },
      }}
      name="ListagemGrupo"
      component={ListagemGrupo}
    />
  </Stack.Navigator>
);

export default Routes;
