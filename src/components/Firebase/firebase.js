import app from 'firebase/app';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyBpMa61brrQZbw1nTquE1Qvz9Tywau39UI",
  authDomain: "jeopardy-5104e.firebaseapp.com",
  projectId: "jeopardy-5104e",
  storageBucket: "jeopardy-5104e.appspot.com",
  messagingSenderId: "157394958333",
  appId: "1:157394958333:web:3102afce568aced08a0b94",
  measurementId: "G-574YKKVVLW"
};

class Firebase {
  constructor() {
    app.initializeApp(config);
    this.auth = app.auth();
  }

  // *** Auth API ***

  doCreateUserWithEmailAndPassword = (email, password) => {
    return this.auth.createUserWithEmailAndPassword(email, password);
  }

  doSignInWithEmailAndPassword = (email, password) => {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  doSignOut = () => {
    return this.auth.signOut();
  }

  doPasswordReset = email => { 
    return this.auth.sendPasswordResetEmail(email);
  };

  doPasswordUpdate = password => {
    return this.auth.currentUser.updatePassword(password);
  };

}

export default Firebase;