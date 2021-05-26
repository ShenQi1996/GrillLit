import axios from 'axios';

export const fetchEvents = () => {
  return axios.get('/api/events')
};

// export const fetchUserEvents = id => {
//   return axios.get(`/api/events/user/${id}`)
// };

// export const createEvent = data => {
//   return axios.post('/api/events/', data)
// }