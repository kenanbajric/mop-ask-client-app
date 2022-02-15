import React from "react";
import { Row, Col, Container } from "react-bootstrap";

// Components import
import HotQuestions from "./HotQuestions";
import LatestQuestions from "./LasestQuestions";

const HomePage = () => {
  return (
    <div className="mt-4">
      <Row>
        <Col sm={8}>
          <LatestQuestions />
        </Col>
        <Col>
          <Row>
            <Col>
              <HotQuestions />
            </Col>
          </Row>
          <Row>
            <Col className="mt-4">
              <Container>
                <h3>Top Users</h3>
                <h5>John Doe</h5>
                <p>Number od answers - 99</p>
                <h5>John Doe</h5>
                <p>Number od answers - 99</p>
                <h5>John Doe</h5>
                <p>Number od answers - 99</p>
                <h5>John Doe</h5>
                <p>Number od answers - 99</p>
                <h5>John Doe</h5>
                <p>Number od answers - 99</p>
              </Container>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default HomePage;
