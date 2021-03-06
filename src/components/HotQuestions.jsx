import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";

// Components import
import QuestionCard from "./Cards/QuestionCard";

const HotQuestions = () => {
  const [latestQuestionsList, setLatestQuestionsList] = useState([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      const response = await fetch("http://localhost:5000/home");
      const responseData = await response.json();

      const hotQuestionData = [...responseData.data.hotQuestions];

      setLatestQuestionsList(hotQuestionData);
    };
    fetchQuestions();
  }, []);

  const hotQuestionsCards = latestQuestionsList.map((question) => {
    return (
      <QuestionCard
        key={question.id}
        id={question.id}
        title={question.question_title}
        creatorName={question.user.first_name}
        createdDate={question.createdAt.split('T')[0]}
        upvotes={question.upvote}
      />
    );
  });

  return (
    <Container className="shadow pb-3">
      <h3 className="pt-3">Hot Questions</h3>
      {hotQuestionsCards}
    </Container>
  );
};

export default HotQuestions;
