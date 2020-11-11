import {combineReducers} from 'redux';
import {reducer as login} from './login';
import {reducer as configs} from './configs';
import {reducer as grupo} from './grupo';

export default combineReducers({
  login,
  configs,
  grupo,
});
