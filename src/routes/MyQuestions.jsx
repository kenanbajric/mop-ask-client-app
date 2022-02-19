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
    console.log("token " + token);
    const fetchQuestions = async () => {
      const response = await fetch(
        "http://localhost:5000/questions/my-questions",
        { headers: { Authorization: "Bearer " + token } }
      );
      const responseData = await response.json();

      console.log(responseData);

      const latestQuestionData = [...responseData.data.latestQuestions];

      setLatestQuestionsList(latestQuestionData);
    };
    fetchQuestions();
  }, [loginCtx]);

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
        showAnswers={false}
        showForm={false}
        answers={question.answers}
        creatorName={question.user.first_name || question.user.last_name}
        createdDate={question.createdAt.split("T")[0]}
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
