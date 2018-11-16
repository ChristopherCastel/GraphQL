import React from "react";
import withContextConsumer from "react/utils/with_context_consumer.jsx";
import * as Session from "react/services/session.js";
import decode from "jsonwebtoken/decode";

const AuthenticationContext = React.createContext({
  jwt: undefined,
  username: undefined,
  login: () => {},
  logout: () => {},
  isAuthenticated: () => {}
});

const AuthenticationConsumer = AuthenticationContext.Consumer;

class AuthenticationProvider extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      jwt: localStorage.getItem("JWT")
    };

    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
  }

  login({ email, password }) {
    Session.createSession(email, password).then(jwt => {
      const decoded = decode(jwt);
      this.setState({
        jwt: jwt,
        username: decoded.firstName
      });
    });
  }

  logout() {
    Session.deleteSession();
    this.setState({
      jwt: null,
      username: null
    });
  }

  isAuthenticated() {
    return this.state.jwt != undefined;
  }

  render() {
    const { login, logout, isAuthenticated } = this;
    const { jwt, username } = this.state;
    const { children } = this.props;

    const providerValues = {
      jwt,
      username,
      isAuthenticated,
      login,
      logout
    };
    return (
      <AuthenticationContext.Provider value={providerValues}>
        {children}
      </AuthenticationContext.Provider>
    );
  }
}

const withAuthentication = withContextConsumer(AuthenticationConsumer);

export { AuthenticationConsumer, AuthenticationProvider, withAuthentication };
