import * as EventAPIUtil from "../util/event_api_util";

export const RECEIVE_EVENTS = "RECEIVE_EVENTS";
export const RECEIVE_EVENT = "RECEIVE_EVENT";
export const RECEIVE_USER_EVENTS = "RECEIVE_USER_EVENTS";
export const RECEIVE_NEW_EVENT = "RECEIVE_NEW_EVENT";
export const DELETE_EVENT = "DELETE_EVENT";
export const EDIT_EVENT = "EDIT_EVENT";

const receiveEvents = events => ({
  type: RECEIVE_EVENTS,
  events,
});

const receiveEvent = event => ({
  type: RECEIVE_EVENT,
  event,
});

const receiveUserEvents = events => ({
  type: RECEIVE_USER_EVENTS,
  events,
});

const receiveNewEvent = event => ({
  type: RECEIVE_NEW_EVENT,
  event,
});

const removeEvent = eventId => {
  return { type: DELETE_EVENT, eventId };
};

const alterEvent = eventId => {
  return { type: EDIT_EVENT, eventId };
};

export const fetchEvents = () => dispatch =>
  EventAPIUtil.fetchEvents()
    .then(events => dispatch(receiveEvents(events)))
    .catch(err => console.log(err));

export const fetchUserEvents = userId => dispatch =>
  EventAPIUtil.fetchUserEvents(userId)
    .then(events => dispatch(receiveUserEvents(events)))
    .catch(err => console.log(err));

// export const fetchEvents = () => dispatch => (
//   getEvents()
//     .then(events => dispatch(receiveEvents(events)))
//     .catch(err => console.log(err))
// );

export const fetchEvent = eventId => dispatch =>
  EventAPIUtil.fetchEvent(eventId)
    .then(event => dispatch(receiveEvent(event)))
    .catch(err => console.log(err));

export const createEvent = data => dispatch => {
  return EventAPIUtil.createEvent(data)
    .then(event => dispatch(receiveNewEvent(event)))
    .catch(err => console.log(err.response));
};

export const deleteEvent = eventId => dispatch => {
  return EventAPIUtil.deleteEvent(eventId)
    .then(eventId => dispatch(removeEvent(eventId)))
    .catch(err => console.log(err.response));
};

export const editEvent = eventId => dispatch => {
  debugger
  return EventAPIUtil.editEvent(eventId)
    .then(event => dispatch(alterEvent(event)))
    .catch(err => console.log(err.response));
};
