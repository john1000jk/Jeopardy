import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'components/App/index.css';
import Navigation from 'components/Navigation';
import LandingPage from 'components/Landing';
import SignUpPage from 'components/SignUp';
import SignInPage from 'components/SignIn';
import HomePage from 'components/Home';
import AccountPage from 'components/Account';
import AdminPage from 'components/Admin';
import * as ROUTES from 'constants/routes';
import { withAuthentication } from 'components/Session';
import { Container } from 'react-bootstrap';

const App = () => (
  <div className="overarching">
    <Router>
      <Navigation />
      <div className="routes">
        <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
        <Route path={ROUTES.SIGN_IN} component={SignInPage} />
        <Route path={ROUTES.HOME} component={HomePage} />
        <Route path={ROUTES.ACCOUNT} component={AccountPage} />
      </div>
    </Router>
  </div>

);

export default withAuthentication(App);