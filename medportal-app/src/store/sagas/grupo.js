import {call, put} from 'redux-saga/effects';
import api from '../../services/api';
import GrupoActions from '../ducks/grupo';

export function* buscaGrupos() {
  try {
    yield put(GrupoActions.loading(true));

    const {data} = yield call(api.get, '/grupos');

    yield put(GrupoActions.setGrupos(data));
  } catch (error) {
    if (__DEV__) {
      console.tron.log(error);
    }
  } finally {
    yield put(GrupoActions.loading(false));
  }
}

export function* salvar({descricao}) {
  try {
    yield put(GrupoActions.loading(true));

    yield call(api.post, '/grupo', {descricao});

    yield call(buscaGrupos);
  } catch (error) {
    if (__DEV__) {
      console.tron.log(error);
    }
  } finally {
    yield put(GrupoActions.loading(false));
  }
}

export function* deletar({grupoId}) {
  try {
    yield put(GrupoActions.loading(true));

    yield call(api.delete, `/grupo/${grupoId}`);

    yield call(buscaGrupos);
  } catch (error) {
    if (__DEV__) {
      console.tron.log(error);
    }
  } finally {
    yield put(GrupoActions.loading(false));
  }
}
