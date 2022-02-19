import React, { Fragment } from "react";
import { Card, ListGroup } from "react-bootstrap";

import AnswerForm from "./AnswerForm";

const QuestionCard = (props) => {
  // Would number of answers be displayed on Card
  let showUpvotes;
  if (props.upvotes !== undefined) {
    showUpvotes = true;
  }

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
                  <ListGroup.Item key={answer.id}>
                    {answer.answer_text}
                    {+answer.userId ===
                      +window.sessionStorage.getItem("userId") && (
                      <Fragment>
                        <span className="btn btn-link">Edit</span>
                        <span className="text-danger btn btn-link">Delete</span>
                      </Fragment>
                    )}
                    <p className="text-muted small">
                      Answered on {answer.createdAt.split("T")[0]}
                    </p>
                  </ListGroup.Item>
                );
              })}
            </ListGroup>
          )}
          {props.showForm && <AnswerForm questionId={props.id} />}
        </Card.Body>
        {showUpvotes && (
          <ListGroup className="list-group-flush">
            <small className="list-group-item">
              Number of upvotes: {props.upvotes}
            </small>
          </ListGroup>
        )}
        <Card.Footer>
          <small className="text-muted">
            Asked by {props.creatorName} on {props.createdDate}
          </small>
        </Card.Footer>
      </Card>
  );
};

export default QuestionCard;
