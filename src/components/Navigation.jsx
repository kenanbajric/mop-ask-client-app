import React from "react";
import { Container, Navbar, Nav } from "react-bootstrap";

const Navigation = () => {
  return (
    <Navbar sticky="top" bg="light" expand="lg">
      <Container fluid>
        <Navbar.Brand href="#home">Ask.me</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">Questions</Nav.Link>
            <Nav.Link href="#link">My Questions</Nav.Link>
            <Nav.Link href="#link2">Link</Nav.Link>
          </Nav>
          <Nav className="d-flex">
            <Nav.Link href="#link3">My Profile</Nav.Link>
            <Nav.Link href="#link4">Signup</Nav.Link>
            <Nav.Link href="#link5">Login / Logout</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
