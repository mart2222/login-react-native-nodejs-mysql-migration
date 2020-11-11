import {createActions, createReducer} from 'reduxsauce';
import Immutable from 'seamless-immutable';

const {Types, Creators} = createActions({
  loading: ['loading'],
  getGrupos: [],
  setGrupos: ['grupos'],
  salvar: ['descrica'],
  deletar: ['grupoId'],
});

export const GrupoTypes = Types;
export default Creators;

export const INITIAL_STATE = Immutable({
  loading: false,
  grupos: [],
});

export const reducer = createReducer(INITIAL_STATE, {
  [Types.LOADING]: (state, {loading}) => state.merge({loading}),
  [Types.SET_GRUPOS]: (state, {grupos}) => state.merge({grupos}),
});
