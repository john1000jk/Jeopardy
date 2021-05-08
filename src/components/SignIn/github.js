import React from 'react';
import { withRouter } from 'react-router-dom';
import { withFirebase } from 'components/Firebase';
import { Button } from 'react-bootstrap';
 
const GithubButtonBase = ({ firebase, fn },) => (
  <Button variant="outline-dark" className="my-1" onClick={() => {
    firebase.doSignInWithGithub()
    .then((user) => {
      fn();
    })
    }}>
    Sign In With Github
  </Button>

);

const GithubButton = withRouter(withFirebase(GithubButtonBase));
 
export { GithubButton }