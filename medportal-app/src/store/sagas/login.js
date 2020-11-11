import AsyncStorage from '@react-native-community/async-storage';
import {call, put} from 'redux-saga/effects';
import api from '../../services/api';
import LoginActions from '../ducks/login';
import {navigateReset} from './../../services/navigate';

function getTokenStorage() {
  return AsyncStorage.getItem('@token');
}

export function* registrar({name: nameParam, login: loginParam, password}) {
  try {
    yield put(LoginActions.loading(true));

    const {data} = yield call(api.post, '/user', {
      name: nameParam,
      login: loginParam,
      password,
    });

    yield put(LoginActions.save(data, nameParam));

    navigateReset('ListagemGrupo');
  } catch (error) {
    if (__DEV__) {
      console.tron.log(error);
    }
  } finally {
    yield put(LoginActions.loading(false));
  }
}

export function* login({login, password}) {
  try {
    yield put(LoginActions.loading(true));

    const {data} = yield call(api.post, '/login', {login, password});

    yield put(LoginActions.save(data.token, data.name));

    navigateReset('ListagemGrupo');
  } catch (error) {
    if (__DEV__) {
      console.tron.log(error);
    }
  } finally {
    yield put(LoginActions.loading(false));
  }
}

export function* verifyLogin() {
  try {
    yield put(LoginActions.loading(true));

    const token = yield call(getTokenStorage);
    if (!token) {
      return;
    }

    const {data} = yield call(api.get, '/user/logado');

    yield put(LoginActions.save(token, data.name));

    navigateReset('ListagemGrupo');
  } catch (error) {
    if (__DEV__) {
      console.tron.log(error);
    }
  } finally {
    yield put(LoginActions.loading(false));
  }
}

export function* logout() {
  try {
    yield call(sendIdOneSignal, null);
    yield put(LoginActions.save());
    navigateReset('Login');
  } catch (error) {
    if (__DEV__) {
      console.tron.log(error);
    }
  }
}

export function* buscaVinculos() {
  try {
    yield put(LoginActions.loading(true));

    const {data} = yield call(api.get, '/user/vinculos');

    yield put(LoginActions.setVinculos(data));
  } catch (error) {
    if (__DEV__) {
      console.tron.log(error);
    }
  } finally {
    yield put(LoginActions.loading(false));
  }
}

export function* vincular({grupoId}) {
  try {
    yield put(LoginActions.loading(true));

    yield call(api.post, '/users/vincular', {grupoId});

    yield call(buscaVinculos);
  } catch (error) {
    if (__DEV__) {
      console.tron.log(error);
    }
  } finally {
    yield put(LoginActions.loading(false));
  }
}

export function* desvincular({grupoId}) {
  try {
    yield put(LoginActions.loading(true));

    yield call(api.post, '/users/desvincular', {grupoId});

    yield call(buscaVinculos);
  } catch (error) {
    if (__DEV__) {
      console.tron.log(error);
    }
  } finally {
    yield put(LoginActions.loading(false));
  }
}

export function* updateOneSignal({onesignalId}) {
  try {
    yield call(sendIdOneSignal, onesignalId);
  } catch (error) {
    if (__DEV__) {
      console.tron.log(error);
    }
  }
}

function sendIdOneSignal(onesignalId) {
  return api.post('/users/notificacao', {onesignalId});
}
