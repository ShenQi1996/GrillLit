import { combineReducers } from 'redux';
import session from './session_reducer';
import errors from './errors_reducer';
import events from './event_reducer';

const RootReducer = combineReducers({
  errors,
  session,
  events
});

export default RootReducer;