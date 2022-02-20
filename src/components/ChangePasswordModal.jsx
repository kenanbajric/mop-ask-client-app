import React, { useState, useContext } from "react";
import { Modal, Button, Form } from "react-bootstrap";

import LoginContext from "../storage/login-context";

const ChangePasswordModal = (props) => {
  const loginCtx = useContext(LoginContext);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmedNewPassword, setConfirmedNewPassword] = useState("");

  const [passwordHasError, setPasswordHasErrors] = useState(false);
  const [passwordMatched, setPasswordMatched] = useState(true);
  const [oldPasswordMatched, setOldPasswordMatched] = useState(true);
  const [passwordSuccess, setPasswordSuccess] = useState(false);

  const changeOldPasswordHandler = (event) => {
    setOldPassword(event.target.value);
    setOldPasswordMatched(true);
  };
  const changeNewPasswordHandler = (event) => {
    setNewPassword(event.target.value);
    if (event.target.value.length >= 5) {
      setPasswordHasErrors(false);
      setPasswordMatched(true);
    }
  };
  const changeConfirmedNewPasswordHandler = (event) => {
    setConfirmedNewPassword(event.target.value);
    setPasswordMatched(true);
    if (event.target.value.length >= 5) {
      setPasswordHasErrors(false);
    }
  };

  // Call handleClose function from parent component and reset all states
  const closeModal = () => {
    setOldPassword("");
    setNewPassword("");
    setConfirmedNewPassword("");
    setPasswordHasErrors(false);
    setPasswordMatched(true);
    setOldPasswordMatched(true);
    setPasswordSuccess(false);
    props.handleClose();
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

    if (responseData.data.statusCode === 401) {
      setOldPasswordMatched(false);
      return;
    } else if (responseData.data.statusCode === 201) {
      setPasswordSuccess(true);
    }

    setOldPasswordMatched(true);
    setPasswordMatched(true);

    setTimeout(() => {
      closeModal();
    }, 1000);
  };

  return (
    <Modal show={props.show} onHide={closeModal}>
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
          {!oldPasswordMatched && (
            <p className="text-danger">Incorrect password!</p>
          )}

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
            <p className="text-danger">Password does not match!</p>
          )}
        </Form>
      </Modal.Body>
      <Modal.Footer className="justify-content-center">
        <Button variant="secondary" onClick={closeModal}>
          Close
        </Button>
        <Button type="submit" variant="primary" onClick={formSubmitionHandler}>
          Confirm Changes
        </Button>
        <br></br>
        {passwordSuccess && (
          <p className="text-success">Password successfully changed!</p>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default ChangePasswordModal;
