import { combineReducers } from 'redux';
import polls from './polls';
import auth from './auth';

export default combineReducers({
  polls,
  auth
});