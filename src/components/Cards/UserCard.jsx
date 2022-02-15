import React from "react";
import { ListGroup, Badge } from "react-bootstrap";

const UserCard = (props) => {
  return (
    <ListGroup.Item
      as="li"
      className="d-flex justify-content-between align-items-start"
      id={props.id}
    >
      <div className="ms-2 me-auto">
        <div className="fw-bold">{props.firstName + " " + props.lastName}</div>
        This user has posted {props.answersNumber} answers.
      </div>
      <Badge bg="primary" pill>
        {props.answersNumber}
      </Badge>
    </ListGroup.Item>
  );
};

export default UserCard;
