import {createReducer, createActions} from 'reduxsauce';
import Immutable from 'seamless-immutable';
import {colors, getColor} from './../../styles';

const {Types, Creators} = createActions({
  setColors: ['isThemeBlack'],
});

export const NotificacaoTypes = Types;
export default Creators;

export const INITIAL_STATE = Immutable({
  colors,
  isThemeBlack: false,
});

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SET_COLORS]: (state, {isThemeBlack}) =>
    state.merge({colors: getColor(isThemeBlack), isThemeBlack}),
});
