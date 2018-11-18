import React from "react";

import Navbar from "react-bootstrap/lib/Navbar";
import Button from "react-bootstrap/lib/Button";
import { withAuthentication } from "react/contexts/authentication.js";
import { withTheme } from "react/contexts/theme.js";

const Navigation = ({ jwt, username, bg, variant, setBg, setVariant }) => {
  function switchTheme() {
    const theme = bg === "light" ? "dark" : "light";
    setBg(theme); // ne passe pas dedans
    setVariant(theme); // non plus
  }

  return (
    <Navbar bg={bg} variant={variant} fixed="bottom">
      <Button variant="outline-info" onClick={switchTheme}>
        Changer le thème
      </Button>
      <Navbar.Brand>Bonjour {username} !</Navbar.Brand>
    </Navbar>
  );
};

export default withAuthentication(withTheme(Navigation));
