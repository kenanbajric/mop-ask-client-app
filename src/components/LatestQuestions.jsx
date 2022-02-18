import React, { useState, useEffect } from "react";
import { Alert, Container } from "react-bootstrap";

// Components import
import QuestionCard from "./Cards/QuestionCard";

const LatestQuestions = (props) => {
  const [latestQuestionsList, setLatestQuestionsList] = useState([]);

  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    const fetchQuestions = async () => {
      const response = await fetch("http://localhost:5000/home");
      const responseData = await response.json();

      const latestQuestionData = [...responseData.data.latestQuestions];

      setLatestQuestionsList(latestQuestionData);
    };
    fetchQuestions();
  }, []);

  const loadMoreQuestions = async () => {
    setIsFetching(true);
    const skip = latestQuestionsList.length;
    const response = await fetch(
      `http://localhost:5000/home/loadmore?skip=${skip}&limit=20`
    );
    const responseData = await response.json();

    setLatestQuestionsList((prevState) => [
      ...prevState,
      ...responseData.data.loadedQuestions,
    ]);
    setIsFetching(false);
  };

  const latestQuestionsCards = latestQuestionsList.map((question) => {
    return (
      <QuestionCard
        key={question.id}
        id={question.id}
        title={question.question_title}
        text={question.question_text}
        showAnswers={props.showAnswers}
        showForm={props.showForm}
        answers={question.answers}
        creatorName={question.user.first_name || question.user.last_name}
        createdDate={question.createdAt.split("T")[0]}
      />
    );
  });

  return (
    <Container>
      <h3>Latest Questions</h3>

      {latestQuestionsCards}

      {isFetching && (
        <Alert className="text-center mt-3"> FEATCHING QUESTIONS... </Alert>
      )}

      {!isFetching && (
        <Alert className="text-center mt-3" onClick={loadMoreQuestions}>
          {" "}
          LOAD MORE{" "}
        </Alert>
      )}
    </Container>
  );
};

export default LatestQuestions;
