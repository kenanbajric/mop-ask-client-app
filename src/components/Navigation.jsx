import React, { useContext } from "react";
import { Container, Navbar, Nav } from "react-bootstrap";

import LoginContext from "../storage/login-context";

const Navigation = () => {
  const loginCtx = useContext(LoginContext);
  // const isLoggedIn = window.sessionStorage.getItem("isLoggedIn");

  return (
    <Navbar sticky="top" bg="light" expand="lg">
      <Container fluid>
        <Navbar.Brand className="text-danger" href="/">
          Ask.me
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="questions">Questions</Nav.Link>
            {window.sessionStorage.getItem("isLoggedIn") && (
              <Nav.Link href="my-questions">My Questions</Nav.Link>
            )}
          </Nav>
          <Nav className="d-flex">
            {window.sessionStorage.getItem("isLoggedIn") && (
              <Nav.Link href="my-profile">My Profile</Nav.Link>
            )}
            {!window.sessionStorage.getItem("isLoggedIn") && (
              <Nav.Link href="sign-up">Sign Up</Nav.Link>
            )}
            {!window.sessionStorage.getItem("isLoggedIn") && (
              <Nav.Link href="login">Login</Nav.Link>
            )}
            {window.sessionStorage.getItem("isLoggedIn") && (
              <Nav.Link href="/" onClick={loginCtx.logout}>
                Logout
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
