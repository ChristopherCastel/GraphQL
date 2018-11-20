import React from "react";

import Navbar from "react-bootstrap/lib/Navbar";
import Nav from "react-bootstrap/lib/Nav";
import { Link } from "react-router-dom";
import SearchForm from "./search_form";

import { withAuthentication } from "react/contexts/authentication.js";
import { withTheme } from "react/contexts/theme.js";

const Navigation = ({ isAuthenticated, bg, variant }) => {
  if (isAuthenticated()) {
    return (
      <Navbar bg={bg} variant={variant}>
        <Navbar.Brand as={Link} to="/">
          Navbar
        </Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/">
            Hello
          </Nav.Link>
          <Nav.Link as={Link} to="/todo">
            Todo
          </Nav.Link>
          <Nav.Link as={Link} to="/messages">
            Messages
          </Nav.Link>
          <Nav.Link as={Link} to="/logout">
            Logout
          </Nav.Link>
        </Nav>
        <SearchForm />
      </Navbar>
    );
  } else {
    return (
      <Navbar bg={bg} variant={variant}>
        <Navbar.Brand as={Link} to="/login">
          Navbar
        </Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/login">
            Login
          </Nav.Link>
        </Nav>
        <SearchForm />
      </Navbar>
    );
  }
};

export default withTheme(withAuthentication(Navigation));
