import React from "react";
import { Redirect } from "react-router-dom";

import LoginComponent from "./login_component";
import { withAuthentication } from "react/contexts/authentication.js";

class LoginContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: ""
    };

    this.authenticate = this.authenticate.bind(this);
    this.onFieldChange = this.onFieldChange.bind(this);
  }

  onFieldChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  authenticate(e) {
    e.preventDefault();
    this.props.login({
      email: this.state.email,
      password: this.state.password
    });
  }

  render() {
    const { email, password } = this.state;
    const authenticated = this.props.jwt;

    return (
      <React.Fragment>
        {authenticated && <Redirect to="/messages" />}
        {!authenticated && (
          <LoginComponent
            email={email}
            password={password}
            authenticate={this.authenticate}
            onFieldChange={this.onFieldChange}
          />
        )}
      </React.Fragment>
    );
  }
}

export default withAuthentication(LoginContainer);
