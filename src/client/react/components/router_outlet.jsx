import React from "react";

import { Route } from "react-router-dom";

import HelloWorld from "./hello_world/hello_world";
import HelloFromParams from "./hello_world/hello_from_params";
import TodoAppContainer from "./todo_app/todo_app_container";
import MessagesContainer from "./messages/messages_container";
import MessageContainer from "./message/message_container";
import LoginContainer from "./login/login_container";
import LogoutContrainer from "./logout/logout_container";

import PrivateRoute from "./private_routes";

function RouterOutlet() {
  return (
    <React.Fragment>
      <Route exact path="/" render={() => <HelloWorld name="bob" />} />
      <Route path="/login" component={LoginContainer} />
      <PrivateRoute path="/hello/:name" component={HelloFromParams} />
      <PrivateRoute path="/todo" component={TodoAppContainer} />
      <PrivateRoute path="/messages" component={MessagesContainer} />
      <PrivateRoute path="/message/:id" component={MessageContainer} />
      <PrivateRoute path="/logout" component={LogoutContrainer} />
    </React.Fragment>
  );
}

export default RouterOutlet;
