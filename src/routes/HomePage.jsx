import React from "react";
import { Row, Col } from "react-bootstrap";

// Components import
import HotQuestions from "../components/HotQuestions";
import LatestQuestions from "../components/LatestQuestions";
import TopUsers from "../components/TopUsers";

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
            <Col className="mt-5">
              <TopUsers />
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default HomePage;
