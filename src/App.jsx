import React from "react";

// React-Bootstrap imports
import { Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

// Components
import Navigation from "./components/Navigation";
import HomePage from "./components/HomePage";

const App = () => {
  return (
    <Container fluid>
      <Navigation />
      <HomePage />
    </Container>
  );
};

export default App;
