import React, { useState, useContext } from "react";
import { Modal, Form, Button } from "react-bootstrap";

import LoginContext from "../storage/login-context";

const QuestionModal = (props) => {
  const loginCtx = useContext(LoginContext);

  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  const [validTitle, setIsValidTitle] = useState(true);
  const [validText, setIsValidText] = useState(true);

  const changeTitlehandler = (event) => {
    setTitle(event.target.value);
    if (event.target.value.length >= 5) {
      setIsValidTitle(true);
    }
  };
  const changeTextHandler = (event) => {
    setText(event.target.value);
    if (event.target.value.length >= 10) {
      setIsValidText(true);
    }
  };

  const formSubmitHandler = async (event) => {
    event.preventDefault();

    if (title.length < 5) {
      setIsValidTitle(false);
      return;
    }
    setIsValidTitle(true);
    if (text.length < 10) {
      setIsValidText(false);
      return;
    }
    setIsValidText(true);

    const token = loginCtx.sendToken();

    await fetch("http://localhost:5000/questions/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        questionTitle: title,
        questionText: text,
      }),
    });

    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  // Call handleClose function from parent component and reset title and text state
  const closeModal = () => {
    setTitle("");
    setText("");
    props.handleClose();
  };

  return (
    <Modal show={props.show} onHide={closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>Post your question</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control
              value={title}
              type="text"
              placeholder="Question title"
              onChange={changeTitlehandler}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicText">
            <Form.Label>Question text</Form.Label>
            <Form.Control
              value={text}
              type="text"
              placeholder="Question text"
              onChange={changeTextHandler}
              required
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer className="justify-content-center">
        <Button variant="secondary" onClick={closeModal}>
          Close
        </Button>
        <Button type="submit" variant="primary" onClick={formSubmitHandler}>
          Submit
        </Button>
        <br></br>
        {!validTitle && (
          <p className="text-danger">
            Your title should have minumum 5 characters
          </p>
        )}
        {!validText && (
          <p className="text-danger">
            Your text should have minumum 10 characters
          </p>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default QuestionModal;
