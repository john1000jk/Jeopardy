import React from 'react';
import { withRouter } from 'react-router-dom';
import { withFirebase } from 'components/Firebase';
import { Button } from 'react-bootstrap';
 
const GoogleButtonBase = ({ firebase, fn },) => (
  <Button variant="outline-dark" className="my-1" onClick={() => {
    firebase.doSignInWithGoogle()
    .then((user) => {
      fn();
    })
    }}>
    Sign In With Google
  </Button>

);

const GoogleButton = withRouter(withFirebase(GoogleButtonBase));
 
export { GoogleButton }