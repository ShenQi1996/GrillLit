import axios from "axios";

export const fetchEvents = () => {
  return axios.get("/api/events/index");
};

export const fetchEvent = eventId => {
  return axios.get(`/api/events/${eventId}`);
};

export const fetchUserEvents = id => {
  return axios.get(`/api/events/user/${id}`);
};

export const createEvent = data => {
  return axios.post("/api/events/event", data);
};

export const deleteEvent = eventId => {
  return axios.delete(`/api/events/event/${eventId}`);
};

export const editEvent = event => {
  return axios.patch(`/api/events/event/${event._id}`, event);
};
