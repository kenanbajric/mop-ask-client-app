import React, { useContext, useState } from "react";
import { Button, Card, ListGroup } from "react-bootstrap";

import AnswerForm from "./AnswerForm";
import LoginContext from "../../storage/login-context";
import AnswerCard from "./AnswerCard";

const QuestionCard = (props) => {
  // Would number of answers be displayed on Card

  const [voted, setVoted] = useState(false);

  // Login context
  const loginCtx = useContext(LoginContext);

  const upvote = async () => {
    const token = loginCtx.sendToken();

    const response = await fetch(
      `http://localhost:5000/questions/${props.id}`,
      {
        method: "PUT",
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );

    const responseData = await response.json();

    if (responseData.status === 201) {
      setVoted(true);
    }
  };

  const addAnswer = {};

  return (
    <Card className="mt-3 shadow" key={props.id} id={props.id}>
      <Card.Body>
        <Card.Title>{props.title}</Card.Title>
        {props.text && <Card.Text className="py-2">{props.text}</Card.Text>}
        {props.showAnswers && (
          <ListGroup variant="flush">
            <Card.Text>Answers: </Card.Text>
            {/* Answers */}
            {props.answers.map((answer) => {
              return (
                <AnswerCard
                  key={answer.id}
                  answerId={answer.id}
                  answer_text={answer.answer_text}
                  userId={+answer.userId}
                  createdAt={answer.createdAt.split("T")[0]}
                  questionId={props.id}
                />
              );
            })}
          </ListGroup>
        )}
        {props.showForm && window.sessionStorage.isLoggedIn && (
          <AnswerForm questionId={props.id} addAnswer={addAnswer} />
        )}
      </Card.Body>

      <ListGroup className="list-group-flush">
        <small className="list-group-item">
          Number of upvotes: {!voted && props.upvotes}
          {voted && props.upvotes + 1}
        </small>
      </ListGroup>

      <Card.Footer className="d-flex justify-content-between">
        <small className="text-muted">
          Asked by {props.creatorName} on {props.createdDate}
        </small>
        {window.sessionStorage.getItem("isLoggedIn") && (
          <Button variant="outline-dark" className="btn-sm" onClick={upvote}>
            Upvote!
          </Button>
        )}
      </Card.Footer>
    </Card>
  );
};

export default QuestionCard;
