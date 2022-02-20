import React, { useContext } from "react";
import { Modal, Form, Button } from "react-bootstrap";

import LoginContext from "../storage/login-context";

const DeleteAnswerModal = (props) => {
  const loginCtx = useContext(LoginContext);

  // Form submit
  const formSubmitHandler = async (event) => {
    event.preventDefault();

    const token = loginCtx.sendToken();
    const response = await fetch(
      `http://localhost:5000/questions/answer/${props.answerId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
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
        <Modal.Title>Delete your answer</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formSubmitHandler}>
          <Form.Group className="mb-3" controlId="formBasicFirstName">
            <Form.Label>Are you sure?</Form.Label>
            
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer className="justify-content-center">
        <Button variant="secondary" onClick={props.handleClose}>
          No
        </Button>
        <Button type="submit" variant="primary" onClick={formSubmitHandler}>
          Yes
        </Button>
        <br></br>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteAnswerModal;
