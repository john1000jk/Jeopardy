import React from 'react';
import { withRouter } from 'react-router-dom';
import { withFirebase } from 'components/Firebase';
import { Button } from 'react-bootstrap';
 
const FacebookButtonBase = ({ firebase, fn },) => (
  <Button variant="outline-dark" size="sm" className="my-1" onClick={() => {
    firebase.doSignInWithFacebook()
    .then((user) => {
      fn();
    })
    }}>
    Sign In With Facebook
  </Button>

);

const FacebookButton = withRouter(withFirebase(FacebookButtonBase));
 
export { FacebookButton }