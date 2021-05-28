import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/root';
import configureStore from './store/store';
import './stylesheets/reset.css';
import './stylesheets/nav.css';
import './stylesheets/home.css';
import './stylesheets/event-index.css';
import './stylesheets/home-splash.css';

import jwt_decode from 'jwt-decode';
import { setAuthToken } from './util/session_api_util';
import { logout } from './actions/session_actions';
import { signup, login } from './util/session_api_util';
import { fetchEvents, fetchUserEvents, fetchEvent, createEvent, deleteEvent } from './util/event_api_util';


document.addEventListener('DOMContentLoaded', () => {
  let store;

  if (localStorage.jwtToken) {

    setAuthToken(localStorage.jwtToken);

    const decodedUser = jwt_decode(localStorage.jwtToken);

    const preloadedState = { session: { isAuthenticated: true, user: decodedUser } };

    store = configureStore(preloadedState);
  // store = configureStore();

    const currentTime = Date.now() / 1000;
    if (decodedUser.exp < currentTime) {
      store.dispatch(logout());
      window.location.href = '/login';
    }
  } else {
    store = configureStore({});
  }

  // Testing ----------------------------------

  window.getState = store.getState;

  // window.logout = store.dispatch(logout());

  window.deleteEvent = deleteEvent;
  window.createEvent = createEvent;
  window.fetchEvent = fetchEvent;
  window.fetchEvents = fetchEvents;
  window.fetchUserEvents = fetchUserEvents;

  window.signup = signup;
  window.login = login;

  //-------------------------------------------
 
  const root = document.getElementById('root');

  ReactDOM.render(<Root store={store} />, root);
});