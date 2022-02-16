import React, { useEffect, useState } from "react";
import { Container, ListGroup } from "react-bootstrap";
import UserCard from "./Cards/UserCard";

const TopUsers = () => {
  const [topUsersList, setTopUsersList] = useState([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      const response = await fetch("http://localhost:5000/home");
      const responseData = await response.json();

      const topUsersData = [...responseData.data.topUsers];

      setTopUsersList(topUsersData);
    };
    fetchQuestions();
  }, []);
  console.log(topUsersList);

  const topUsersCards = topUsersList.map((user) => {
    return (
      <UserCard
        key={user.id}
        id={user.id}
        firstName={user.first_name}
        lastName={user.last_name}
        answersNumber={user.number_of_answers}
      />
    );
  });

  return (
    <Container className="shadow pb-3">
      <h3 className="pt-3">Top 10 Users</h3>
      <ListGroup className="mt-3" as="ol" numbered>
        {topUsersCards}
      </ListGroup>
    </Container>
  );
};

export default TopUsers;
