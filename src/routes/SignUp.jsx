import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";

const SignUp = () => {
  const history = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [passwordHasErrors, setPasswordHasErrors] = useState(false);
  const [userCreated, setUserCreated] = useState(false);

  // Change handlers
  // First Name
  const firstNameInputChangeHandler = (event) => {
    setFirstName(event.target.value);
    setUserCreated(false);
  };

  // Last Name
  const lastNameInputChangeHandler = (event) => {
    setLastName(event.target.value);
    setUserCreated(false);
  };

  // Email
  const emailInputChangeHandler = (event) => {
    setEmail(event.target.value);
    setUserCreated(false);
  };

  // Password
  const passwordInputChangeHandler = (event) => {
    setPassword(event.target.value);
    setUserCreated(false);
    if (event.target.value.length >= 5) {
      setPasswordHasErrors(false);
    }
  };

  // Form submission
  const formSubmitionHandler = async (event) => {
    event.preventDefault();
    if (password.length < 5) {
      setPasswordHasErrors(true);
      return;
    }
    await fetch("http://localhost:5000/users/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
      }),
    });
    setUserCreated(true);
    setTimeout(() => {
      history("/login");
    }, 1000);
  };

  return (
    <div
      onSubmit={formSubmitionHandler}
      className="d-flex justify-content-center mt-4"
    >
      <Form className="col-lg-4 col-md-6 col-sm-10 col-12">
        <Form.Group className="mb-3" controlId="formBasicFirstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your first name"
            onChange={firstNameInputChangeHandler}
            value={firstName}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicLastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your last name"
            onChange={lastNameInputChangeHandler}
            value={lastName}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            required
            onChange={emailInputChangeHandler}
            value={email}
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            required
            onChange={passwordInputChangeHandler}
            value={password}
          />
        </Form.Group>
        {passwordHasErrors && (
          <p className="text-danger">
            Your password must be minimum 5 characters long.
          </p>
        )}

        <Button className="mt-2" variant="primary" type="submit">
          Register
        </Button>
        {userCreated && (
          <p className="mt-3 text-success">
            Please stay on this screen. User successfully created, you will be
            redirected to Login page.
          </p>
        )}
      </Form>
    </div>
  );
};

export default SignUp;
