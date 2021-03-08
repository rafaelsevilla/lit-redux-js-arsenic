import { combineReducers } from 'redux';
import dialogSlice from './dialogSlice';

const reducers = combineReducers({
  counter: dialogSlice
});

export default reducers;