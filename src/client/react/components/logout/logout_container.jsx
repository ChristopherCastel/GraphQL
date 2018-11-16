import React from "react";
import { Redirect } from "react-router-dom";

import { withAuthentication } from "react/contexts/authentication.js";

const LogoutContainer = ({ logout }) => {
  logout();
  return (
    <React.Fragment>
      <Redirect to="/login" />
    </React.Fragment>
  );
};

// class LogoutContainer extends React.Component {
//   constructor(props) {
//     super(props);
//   }

//   componentDidMount() {
//     this.props.logout();
//   }

//   render() {
//     return (
//       <React.Fragment>
//         <Redirect to="/login" />
//       </React.Fragment>
//     );
//   }
// }

export default withAuthentication(LogoutContainer);
