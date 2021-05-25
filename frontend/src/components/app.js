import React from "react";
import { Route, Redirect, Switch, Link, HashRouter } from 'react-router-dom';
import HeaderNavContainer from './header/header_nav_container';
import SignupFormContainer from './session/signup_form_container';
import Hero from './splash/hero';
import Home from './splash/home';

const App = () => (
  <div>
    <HeaderNavContainer/>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/signup" component={SignupFormContainer} />
    </Switch>

  </div>
);

export default App;