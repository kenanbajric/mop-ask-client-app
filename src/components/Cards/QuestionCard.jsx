import React from "react";
import { Card } from "react-bootstrap";

const Navigation = () => {
  return (
    <Card className="mt-2">
      <Card.Body>
        <Card.Title>Question 1</Card.Title>
        <Card.Text>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium
          perspiciatis vero nesciunt tenetur cupiditate et velit, est deleniti
          unde amet neque sequi sunt, libero quam ex, eos commodi omnis a.
        </Card.Text>
      </Card.Body>
      <Card.Footer>
        <small className="text-muted">Asked by - User Name</small>
      </Card.Footer>
    </Card>
  );
};

export default Navigation;
