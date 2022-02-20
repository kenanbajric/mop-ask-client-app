import React, { useState, useEffect, useContext } from "react";
import { Container, ListGroup } from "react-bootstrap";

import NotificationCard from "../components/Cards/NotificationCard";

import LoginContext from "../storage/login-context";

const Notifications = () => {
  const loginCtx = useContext(LoginContext);

  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const token = loginCtx.sendToken();

    const fetchNotifications = async () => {
      const response = await fetch(
        `http://localhost:5000/users/notifications`,
        { headers: { Authorization: "Bearer " + token } }
      );
      const responseData = await response.json();

      setNotifications(responseData.data.notifications);
    };
    fetchNotifications();
  }, [loginCtx]);

  const notificationsComponent = notifications.map((notification) => {
    return (
      <NotificationCard
        key={notification.id}
        notificationId={notification.id}
        userId={notification.userId}
        questionTitle={notification.question_title}
        answerText={notification.answer_text}
        isNew={notification.isNew}
        questionId={notification.questionId}
      />
    );
  });
  return (
    <Container>
      <h3>Notifications</h3>
      <ListGroup></ListGroup>
      {notificationsComponent}
    </Container>
  );
};

export default Notifications;
