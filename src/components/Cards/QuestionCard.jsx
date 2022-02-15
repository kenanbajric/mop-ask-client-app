import React from "react";
import { Card } from "react-bootstrap";

const Navigation = () => {
  return (
    <Card className="mt-2">
      <Card.Body>
        <Card.Title>Question 1</Card.Title>
        <Card.Text>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores
          explicabo neque id quod quae laudantium similique autem at, maiores
          quis doloremque, dignissimos a reiciendis. Numquam qui maiores
          mollitia excepturi dolore reiciendis quae cum fugiat vel! Ea
          dignissimos et, veniam sequi dolorum architecto id enim nobis, iusto
          facere, repellendus animi eius.
        </Card.Text>
      </Card.Body>
      <Card.Footer>
        <small className="text-muted">Asked by - User Name</small>
      </Card.Footer>
    </Card>
  );
};

export default Navigation;
