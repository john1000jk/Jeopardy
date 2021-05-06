import React from 'react';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap'
import SignOutButton from 'components/SignOut';
import * as ROUTES from 'constants/routes';
import { AuthUserContext } from '../Session';
import { Navbar, Nav } from 'react-bootstrap';

const Navigation = () => (
  <div>
    <Navbar bg="light" expand="lg">
      <LinkContainer to="/">
        <Navbar.Brand>Jeopardy</Navbar.Brand>
      </LinkContainer>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <AuthUserContext.Consumer>

          {authUser =>
            authUser ? <NavigationAuth /> : <NavigationNonAuth />
          }
        </AuthUserContext.Consumer>

      </Navbar.Collapse>
    </Navbar>
  </div>
);

const NavigationAuth = () => (
  <React.Fragment>
    <Nav className="mr-auto">
      <LinkContainer to={ROUTES.HOME}>
        <Nav.Link>Home</Nav.Link>
      </LinkContainer>
      <LinkContainer to={ROUTES.ACCOUNT}>
        <Nav.Link>Account</Nav.Link>
      </LinkContainer>
    </Nav>
    <SignOutButton />
  </React.Fragment>
);

const NavigationNonAuth = () => (
  <React.Fragment>
    <Nav className="mr-auto">
      <LinkContainer to={ROUTES.LANDING}>
        <Nav.Link>Landing</Nav.Link>
      </LinkContainer>
      <LinkContainer to={ROUTES.SIGN_IN}>
        <Nav.Link>Sign In</Nav.Link>
      </LinkContainer>
    </Nav>
  </React.Fragment>
);

export default Navigation;
