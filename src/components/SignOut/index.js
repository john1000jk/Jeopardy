import React from 'react';
 
import { withFirebase } from 'components/Firebase';
import { Button } from 'react-bootstrap';
 
const SignOutButton = ({ firebase }) => (
  <Button variant="outline-dark" size="sm" className="my-1" onClick={firebase.doSignOut}>
    Sign Out
  </Button>

);
 
export default withFirebase(SignOutButton);