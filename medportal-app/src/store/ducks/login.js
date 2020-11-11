import {createReducer, createActions} from 'reduxsauce';
import Immutable from 'seamless-immutable';
import AsyncStorage from '@react-native-community/async-storage';

function saveTokenStorage(token) {
  AsyncStorage.setItem('@token', token || '');
}

const {Types, Creators} = createActions({
  verifyLogin: [],
  registrar: ['name', 'password', 'login'],
  login: ['name', 'password'],
  logout: [],
  getVinculos: [],
  loading: ['loading'],
  save: ['token', 'user'],
  vincular: [],
  desvincular: [],
  setVinculos: ['vinculos'],
  updateOneSignal: ['onesignalId'],
});

export const LoginTypes = Types;
export default Creators;

export const INITIAL_STATE = Immutable({
  loading: false,
  user: null,
  vinculos: [],
});

export const reducer = createReducer(INITIAL_STATE, {
  [Types.LOADING]: (state, {loading}) => state.merge({loading}),
  [Types.SET_VINCULOS]: (state, {vinculos}) => state.merge({vinculos}),
  [Types.SAVE]: (state, {token, user}) => {
    saveTokenStorage(token);
    return state.merge({user});
  },
});
