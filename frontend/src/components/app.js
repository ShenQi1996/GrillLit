import React from "react";
import { Route, Redirect, Switch, Link, HashRouter } from 'react-router-dom';
import HeaderNavContainer from './header/header_nav_container';
import SignupFormContainer from './session/signup_form_container';
import LoginFormContainer from './session/login_form_container';
import UserProfileContainer from './user/user_profile_container';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import Hero from './splash/hero';
import Home from './splash/home';

const App = () => (
  <div>
    <HeaderNavContainer/>
    <Switch>
      <AuthRoute  path="/signin" component={LoginFormContainer} />
      <AuthRoute  path="/signup" component={SignupFormContainer} />
      <ProtectedRoute path="/profile" component={UserProfileContainer} />
      <Route  path="/" component={Home} />
    </Switch>

  </div>
);

export default App;