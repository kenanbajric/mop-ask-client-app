import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import QuestionCard from "../components/Cards/QuestionCard";

const SingleQuestionPage = () => {
  const [question, setQuestion] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    const fetchQuestion = async () => {
      const response = await fetch(
        `http://localhost:5000/questions/single/${id}`
      );
      const responseData = await response.json();

      setQuestion([responseData.data]);
    };
    fetchQuestion();
  }, [id]);

  const createQuestionComponent = question.map((question) => {
    console.log(question.question.answers);
    return (
      <QuestionCard
        key={question.question.id}
        id={question.question.id}
        title={question.question.question_title}
        text={question.question.question_text}
        answers={question.question.answers}
        showAnswers={true}
        upvotes={question.question.upvote}
        createdDate={question.question.createdAt.split("T")[0]}
        creatorName={
          question.question.user.first_name || question.question.user.last_name
        }
      />
    );
  });

  return <Container>{createQuestionComponent}</Container>;
};

export default SingleQuestionPage;
