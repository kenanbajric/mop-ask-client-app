import React, { useState, useEffect, useContext } from "react";
import { Container, Alert } from "react-bootstrap";

import QuestionCard from "../components/Cards/QuestionCard";
import LoginContext from "../storage/login-context";

const MyQuestions = () => {
  const loginCtx = useContext(LoginContext);

  const [latestQuestionsList, setLatestQuestionsList] = useState([]);

  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    const token = loginCtx.sendToken();
    const fetchQuestions = async () => {
      const response = await fetch(
        "http://localhost:5000/questions/my-questions",
        { headers: { Authorization: "Bearer " + token } }
      );
      const responseData = await response.json();

      const latestQuestionData = [...responseData.data.latestQuestions];

      setLatestQuestionsList(latestQuestionData);
    };
    fetchQuestions();
  }, [loginCtx]);

  const loadMoreQuestions = async () => {
    setIsFetching(true);
    const skip = latestQuestionsList.length;
    const token = loginCtx.sendToken();
    const response = await fetch(
      `http://localhost:5000/questions/my-questions?skip=${skip}&limit=20`,
      { headers: { Authorization: "Bearer " + token } }
    );
    const responseData = await response.json();

    setLatestQuestionsList((prevState) => [
      ...prevState,
      ...responseData.data.latestQuestions,
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
        showAnswers={false}
        showForm={false}
        answers={question.answers}
        createdDate={question.createdAt.split("T")[0]}
        upvotes={question.upvote}
      />
    );
  });

  return (
    <Container>
      <h3>My Questions</h3>

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

export default MyQuestions;
