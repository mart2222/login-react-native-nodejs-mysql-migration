import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import {ToastAndroid} from 'react-native';
import {baseURL} from '../../app.json';

const api = axios.create({
  baseURL,
  timeout: 5000,
});

api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('@token');
  return {
    ...config,
    headers: {
      ...config.headers,
      ['x-access-token']: token,
    },
  };
});

api.interceptors.response.use(
  (response) => response,
  (err) => {
    if (err.response.status > 400) {
      switch (err.response.status) {
        case 401:
        case 404:
          ToastAndroid.show(err.response.data, 0);
          break;
        default:
          ToastAndroid.show(
            'Ocorreu um erro. Verifique sua conexão com a internet!',
            0,
          );
          break;
      }
    }
    return Promise.reject(err.response);
  },
);

export default api;
