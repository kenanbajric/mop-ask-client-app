import React from "react";
import { Alert, Container } from "react-bootstrap";

// Components import
import QuestionCard from "./Cards/QuestionCard";

const LatestQuestions = () => {
  return (
    <Container>
      <h3>Latest Questions</h3>
      <QuestionCard />
      <QuestionCard />
      <QuestionCard />
      <QuestionCard />
      <QuestionCard />
      <QuestionCard />
      <QuestionCard />
      <QuestionCard />
      <QuestionCard />
      <QuestionCard />
      <QuestionCard />
      <QuestionCard />
      <QuestionCard />
      <QuestionCard />
      <QuestionCard />
      <QuestionCard />
      <QuestionCard />
      <QuestionCard />
      <QuestionCard />
      <QuestionCard />
      <Alert className="text-center"> LOAD MORE.. </Alert>
    </Container>
  );
};

export default LatestQuestions;
