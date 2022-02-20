import React, { useState, useEffect, useContext } from "react";
import { Modal, Form, Button } from "react-bootstrap";

import LoginContext from "../storage/login-context";

const EditAnswerModal = (props) => {
  const loginCtx = useContext(LoginContext);

  const [answerText, setAnswerText] = useState("");

  useEffect(() => {
    setAnswerText(props.answerText);
  }, [props]);

  const changeAnswerHandler = (event) => {
    setAnswerText(event.target.value);
  };

  // Form submit
  const formSubmitHandler = async (event) => {
    event.preventDefault();

    const token = loginCtx.sendToken();
    const response = await fetch(
      `http://localhost:5000/questions/answer/${props.answerId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({
          answerText: answerText,
        }),
      }
    );

    const responseData = await response.json();

    console.log(responseData);

    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  return (
    <Modal show={props.show} onHide={props.handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Update your answer</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formSubmitHandler}>
          <Form.Group className="mb-3" controlId="formBasicFirstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              value={answerText}
              onChange={changeAnswerHandler}
              type="text"
              placeholder="First Name"
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer className="justify-content-center">
        <Button variant="secondary" onClick={props.handleClose}>
          Close
        </Button>
        <Button type="submit" variant="primary" onClick={formSubmitHandler}>
          Confirm Changes
        </Button>
        <br></br>
      </Modal.Footer>
    </Modal>
  );
};

export default EditAnswerModal;
