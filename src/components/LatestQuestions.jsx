import React, { useState, useEffect } from "react";
import { Alert, Container } from "react-bootstrap";

// Components import
import QuestionCard from "./Cards/QuestionCard";

const LatestQuestions = () => {
  const [latestQuestionsList, setLatestQuestionsList] = useState([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      const response = await fetch("http://localhost:5000/home");
      const responseData = await response.json();

      const latestQuestionData = [...responseData.data.latestQuestions];

      setLatestQuestionsList(latestQuestionData);

    };
    fetchQuestions();
  }, []);

  const latestQuestionsCards = latestQuestionsList.map((question) => {
    return (
      <QuestionCard
        key={question.id}
        id={question.id}
        title={question.question_title}
        text={question.question_text}
        creatorName={question.user.first_name || question.user.last_name}
        createdDate={question.createdAt.split('T')[0]}
      />
    );
  });

  return (
    <Container>
      <h3>Latest Questions</h3>
      {latestQuestionsCards}

      <Alert className="text-center mt-3"> LOAD MORE.. </Alert>
    </Container>
  );
};

export default LatestQuestions;
