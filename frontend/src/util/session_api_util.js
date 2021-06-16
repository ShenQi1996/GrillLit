import axios from 'axios';
const keys = require('../keys');

export const setAuthToken = token => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = token;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};

export const signup = (userData) => {
  return axios.post('/api/users/register', userData, {
    headers: {
      'Authorization': keys.secretOrKey
    }
  });
};

// export const editUser = event => {
//   return axios.patch(`/api/users//likeadd/${user.id}`, user);
// };

export const login = (userData) => {

  return axios.post('/api/users/login', userData, {
    headers: {
      'Authorization': keys.secretOrKey
    }});
  
};