import React, { useState, useContext } from "react";
import { Modal, Button, Form } from "react-bootstrap";

import LoginContext from "../storage/login-context";

const CustomModal = (props) => {
  const loginCtx = useContext(LoginContext);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmedNewPassword, setConfirmedNewPassword] = useState("");

  const [passwordHasError, setPasswordHasErrors] = useState(false);
  const [passwordMatched, setPasswordMatched] = useState(true);

  const changeOldPasswordHandler = (event) => {
    setOldPassword(event.target.value);
  };
  const changeNewPasswordHandler = (event) => {
    setNewPassword(event.target.value);
    if (event.target.value.length >= 5) {
      setPasswordHasErrors(false);
    }
  };
  const changeConfirmedNewPasswordHandler = (event) => {
    setConfirmedNewPassword(event.target.value);
    if (event.target.value.length >= 5) {
      setPasswordHasErrors(false);
    }
  };

  const formSubmitionHandler = async (event) => {
    event.preventDefault();

    if (newPassword.length < 5 || confirmedNewPassword.length < 5) {
      setPasswordHasErrors(true);
      return;
    }

    if (newPassword !== confirmedNewPassword) {
      setPasswordMatched(false);
      return;
    }
    const token = loginCtx.sendToken();

    const response = await fetch("http://localhost:5000/users/updatepw", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        oldPw: oldPassword,
        newPw: confirmedNewPassword,
      }),
    });
    const responseData = await response.json();

    console.log(responseData);

    setPasswordMatched(true);
  };

  return (
    <Modal show={props.show} onHide={props.handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Change your password</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicOldPassword">
            <Form.Label>Old Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Old Password"
              required
              onChange={changeOldPasswordHandler}
              value={oldPassword}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicNewPassword">
            <Form.Label>New Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="New Password"
              required
              onChange={changeNewPasswordHandler}
              value={newPassword}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicConfirmNewPassword">
            <Form.Label>Confirm New Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm New Password"
              required
              onChange={changeConfirmedNewPasswordHandler}
              value={confirmedNewPassword}
            />
          </Form.Group>
          {passwordHasError && (
            <p className="text-danger">
              Your password must be minimum 5 characters long.
            </p>
          )}
          {!passwordMatched && (
            <p className="text-danger">
              New Password and Confirmed New Password does not match.
            </p>
          )}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.handleClose}>
          Close
        </Button>
        <Button type="submit" variant="primary" onClick={formSubmitionHandler}>
          Confirm Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CustomModal;
