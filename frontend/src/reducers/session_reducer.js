import {
  RECEIVE_CURRENT_USER,
  RECEIVE_USER_LOGOUT,
  RECEIVE_USER_SIGN_IN,
} from "../actions/session_actions";
import { RECEIVE_USER_EVENTS, DELETE_EVENT } from "../actions/event_actions";

const initialState = {
  isAuthenticated: false,
  user: {},
  userEvents: {},
};

const SessionReducer = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !!action.currentUser,
        user: action.currentUser,
      };
    case DELETE_EVENT:
      let newState = Object.assign({}, state);

      const filtered = newState.userEvents.filter(
        event => event._id !== action.eventId.data.eventId
      );
      return {
        ...newState,
        userEvents: filtered,
      };
    case RECEIVE_USER_EVENTS:
      return {
        ...state,
        userEvents: action.events.data,
      };
    case RECEIVE_USER_LOGOUT:
      return {
        isAuthenticated: false,
        user: {},
        userEvents: {},
      };
    case RECEIVE_USER_SIGN_IN:
      return {
        ...state,
        isAuthenticated: true,
      };
    default:
      return state;
  }
};

export default SessionReducer;
