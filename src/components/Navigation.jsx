import React from "react";
import { Container, Navbar, Nav } from "react-bootstrap";

const Navigation = () => {
  return (
    <Navbar sticky="top" bg="light" expand="lg">
      <Container fluid>
        <Navbar.Brand href="/">Ask.me</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="questions">Questions</Nav.Link>
            <Nav.Link href="my-questions">My Questions</Nav.Link>
          </Nav>
          <Nav className="d-flex">
            <Nav.Link href="my-profile">My Profile</Nav.Link>
            <Nav.Link href="sign-up">Sign Up</Nav.Link>
            <Nav.Link href="login">Login</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
