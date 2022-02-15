import React from "react";
import { Card, ListGroup } from "react-bootstrap";

const QuestionCard = (props) => {
  // Would number of answers be displayed on Card
  let showUpvotes;
  if (props.upvotes !== undefined) {
    showUpvotes = true;
  }

  return (
    <Card className="mt-3" key={props.id} id={props.id}>
      <Card.Body>
        <Card.Title>{props.title}</Card.Title>
        {props.text && <Card.Text>{props.text}</Card.Text>}
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
