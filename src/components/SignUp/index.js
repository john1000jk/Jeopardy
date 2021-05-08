import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import "App.css";

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import { Button } from 'react-bootstrap';

const SignUpPage = () => (
  <div className="auth-wrapper py-2">
    <div className="auth-inner">    
      <h3>Sign Up</h3>
      <SignUpForm />
    </div>
  </div>
);

const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: null,
};

class SignUpFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { username, email, passwordOne } = this.state;

    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        this.setState({ error });
      });

    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const {
      username,
      email,
      passwordOne,
      passwordTwo,
      error,
    } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      username === '';

    return (
      <form onSubmit={this.onSubmit}>
        <div className="form-group">
          <label>Username</label>
          <input
            className="form-control"
            name="username"
            value={username}
            onChange={this.onChange}
            type="text"
            placeholder="Enter username"
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            className="form-control"
            name="email"
            value={email}
            onChange={this.onChange}
            type="text"
            placeholder="Enter email address"
        />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            className="form-control"
            name="passwordOne"
            value={passwordOne}
            onChange={this.onChange}
            type="password"
            placeholder="Enter Password"
          />
        </div>
        <div className="form-group">
          <label>Username</label>
          <input
            className="form-control"
            name="passwordTwo"
            value={passwordTwo}
            onChange={this.onChange}
            type="password"
            placeholder="Confirm password"
          />
         </div>
        <Button variant="outline-dark" className="my-1" disabled={isInvalid} type="submit">
          Sign Up
        </Button>
        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

const SignUpLink = () => (
  <p>
    Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
  </p>
);

const SignUpForm = withRouter(withFirebase(SignUpFormBase));


export default SignUpPage;

export { SignUpForm, SignUpLink };