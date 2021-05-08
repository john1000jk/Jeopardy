import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { GoogleButton } from './google';
import { FacebookButton } from './facebook';
import { GithubButton } from './github';
import { SignUpLink } from '../SignUp';
import Firebase, { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import { Button } from 'react-bootstrap';

const SignInPage = () => (
  <div className="auth-wrapper py-2">
    <div className="auth-inner">
      <h3>Sign In</h3>
      <SignInForm />
      <SignUpLink />
    </div>
  </div>
);

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};

class SignInFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { email, password } = this.state;
    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then((user) => {
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
    const { email, password, error } = this.state;

    const isInvalid = password === '' || email === '';

    return (
      <React.Fragment>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Username</label>
            <input
              className="form-control"
              name="email"
              value={email}
              onChange={this.onChange}
              type="text"
              placeholder="Email Address"
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              className="form-control"
              name="password"
              value={password}
              onChange={this.onChange}
              type="password"
              placeholder="Enter Password"
            />
          </div>
          <Button variant="outline-dark" className="my-1" disabled={isInvalid} type="submit">
            Sign In
          </Button>
          {error && <p>{error.message}</p>}
        </form>
        
        <GoogleButton fn={() => {
          this.setState({ ...INITIAL_STATE });
          this.props.history.push(ROUTES.HOME);
        }} />
        <FacebookButton fn={() => {
          this.setState({ ...INITIAL_STATE });
          this.props.history.push(ROUTES.HOME);
        }} />
        <GithubButton fn={() => {
          this.setState({ ...INITIAL_STATE });
          this.props.history.push(ROUTES.HOME);
        }} />
      </React.Fragment>
    );
  }
}

const SignInForm = compose(
  withRouter,
  withFirebase,
)(SignInFormBase);

export default SignInPage;

export { SignInForm };