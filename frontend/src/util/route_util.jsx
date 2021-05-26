import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, Switch, Link, HashRouter, withRouter } from 'react-router-dom';

const Auth = ({ component: Component, path, signedIn, exact }) => (
  <Route
    path={path}
    exact={exact}
    render={props =>
      !signedIn ? <Component {...props} /> : <Redirect to="/" />
    }
  />
);

const Protected = ({ component: Component, path, signedIn, exact }) => (
  <Route
    path={path}
    exact={exact}
    render={props =>
      signedIn ? <Component {...props} /> : <Redirect to="/signin" />
    }
  />
);

const mapSTP = state => {
  return { signedIn: state.session.isAuthenticated };
};

export const AuthRoute = withRouter(connect(mapSTP)(Auth));
export const ProtectedRoute = withRouter(connect(mapSTP)(Protected));