import React, { useContext } from "react";

import { ListGroup } from "react-bootstrap";
import LoginContext from "../../storage/login-context";

const NotificationCard = (props) => {
  const loginCtx = useContext(LoginContext);

  const openNotification = async () => {
    const token = loginCtx.sendToken();

    console.log(typeof(props.notificationId) + " " +  props.notificationId)

    await fetch(`http://localhost:5000/users/notifications/${props.notificationId}`, {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    window.location.href = `${props.questionId}`;
  };
  return (
    <ListGroup.Item id={props.notificationId} key={props.notificationId}>
      <p
        onClick={openNotification}
        className={props.isNew === false ? "text-muted small" : "text-danger"}
      >
        Your question {props.questionTitle} has been answered -{" "}
        {props.answerText}
      </p>
    </ListGroup.Item>
  );
};

export default NotificationCard;
