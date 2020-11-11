import {all, takeLatest} from 'redux-saga/effects';
import {GrupoTypes} from '../ducks/grupo';
import {LoginTypes} from '../ducks/login';
import {buscaGrupos, salvar, deletar} from './grupo';
import {
  buscaVinculos,
  desvincular,
  login,
  logout,
  registrar,
  updateOneSignal,
  verifyLogin,
  vincular,
} from './login';

export default function* rootSaga() {
  yield all([
    takeLatest(LoginTypes.VERIFY_LOGIN, verifyLogin),
    takeLatest(LoginTypes.LOGIN, login),
    takeLatest(LoginTypes.REGISTRAR, registrar),
    takeLatest(LoginTypes.LOGOUT, logout),
    takeLatest(LoginTypes.VINCULAR, vincular),
    takeLatest(LoginTypes.DESVINCULAR, desvincular),
    takeLatest(LoginTypes.GET_VINCULOS, buscaVinculos),
    takeLatest(LoginTypes.UPDATE_ONE_SIGNAL, updateOneSignal),
    takeLatest(GrupoTypes.GET_GRUPOS, buscaGrupos),
    takeLatest(GrupoTypes.SALVAR, salvar),
    takeLatest(GrupoTypes.DELETAR, deletar),
  ]);
}
