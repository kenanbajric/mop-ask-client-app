import React from "react";
import { Container } from "react-bootstrap";

// Components import
import QuestionCard from "./Cards/QuestionCard";

const LatestQuestions = () => {
  return (
    <Container>
      <h3>Hot Questions</h3>
      <QuestionCard />
      <QuestionCard />
      <QuestionCard />
      <QuestionCard />
      <QuestionCard />
    </Container>
  );
};

export default LatestQuestions;
