import { RECEIVE_EVENTS, RECEIVE_EVENT, EDIT_EVENT, DELETE_EVENT, RECEIVE_NEW_EVENT } from '../actions/event_actions';

const EventsReducer = (state = { all: {}, selected: {} , new: undefined }, action) => {
  Object.freeze(state);
  let newState = Object.assign({}, state);
  switch (action.type) {
    case EDIT_EVENT:
      // debugger
      return newState;
    case RECEIVE_EVENT:
      newState.selected = action.event.data;
      return newState
    case RECEIVE_EVENTS:
      newState.all = action.events.data;
      return newState;
    // case RECEIVE_USER_EVENTS:
    //   newState.user = action.events.data;
    //   return newState;
    case RECEIVE_NEW_EVENT:
      newState.new = action.event.data;
      return newState;
    default:
      return state;
  }
};

export default EventsReducer;