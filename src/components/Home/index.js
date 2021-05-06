import 'App.css';
import React, { Component } from 'react';
import { Route, Link, withRouter } from 'react-router-dom';
import BoardView from 'components/Board/BoardView.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Button, Container } from 'react-bootstrap';
import { withAuthorization } from '../Session';
import * as ROUTES from 'constants/routes';


class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { answer: false, obj: null, isInitialized: false, date: new Date() };
  }


  render() {
    let match = this.props.match;
    console.log(this.props.location);
    return (
      <React.Fragment>
        {this.props.location.pathname == "/home" ?
        <Container className="first">
          <Container className="mx-auto my-4 text-lg-center">
            <h2>Please Choose a Jeopardy Date:</h2>
          </Container>
          <Calendar className="mx-auto"
            defaultValue={this.state.date}
            onClickDay={(val) => {
              this.setState({ date: val });
            }}
            value={this.state.date}
          />
          <Link to={`${match.url}/${this.state.date}`}>
            <Container className="mx-auto my-2 text-md-center">
              Start Game?
          </Container>
          </Link>
        </Container> :
        <Route path={`${match.path}/:date`} component={BoardView} />
      }
      </React.Fragment>


    );
  }
}

const condition = authUser => !!authUser;

export default withRouter(withAuthorization(condition)(Home));