import React, { useState, useContext } from "react";
import { useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";

import LoginContext from "../storage/login-context";

const EditUserModal = (props) => {
  const loginCtx = useContext(LoginContext);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const [updateSuccess, setUpdateSuccess] = useState(false);

  useEffect(() => {
    setFirstName(props.firstName);
    setLastName(props.lastName);
    setEmail(props.email);
  }, [props]);

  const changeFirstNameHandler = (event) => {
    setFirstName(event.target.value);
  };
  const changeLastNameHandler = (event) => {
    setLastName(event.target.value);
  };
  const changeEmailHandler = (event) => {
    setEmail(event.target.value);
  };

  // Form submit
  const formSubmitHandler = async (event) => {
    event.preventDefault();

    const token = loginCtx.sendToken();
    await fetch("http://localhost:5000/users/my-profile", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        email: email,
      }),
    });
    setUpdateSuccess(true);
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  return (
    <Modal show={props.show} onHide={props.handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Update your information</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicFirstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              value={firstName}
              onChange={changeFirstNameHandler}
              type="text"
              placeholder="First Name"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicLastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              value={lastName}
              onChange={changeLastNameHandler}
              type="text"
              placeholder="Last Name"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              value={email}
              onChange={changeEmailHandler}
              type="email"
              placeholder="Email"
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
        {updateSuccess && (
          <p className="text-success">Information successfully updated!</p>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default EditUserModal;
