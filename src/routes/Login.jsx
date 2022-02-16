import React, { useState } from "react";

import { Form, Button } from "react-bootstrap";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [passwordHasErrors, setPasswordHasErrors] = useState(false);

  // Change handlers
  // Email
  const emailInputChangeHandler = (event) => {
    setEmail(event.target.value);
  };

  // Password
  const passwordInputChangeHandler = (event) => {
    setPassword(event.target.value);
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
    const response = await fetch("http://localhost:5000/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    console.log(response);
  };

  return (
    <div
      onSubmit={formSubmitionHandler}
      className="d-flex justify-content-center mt-4"
    >
      <Form className="col-lg-4 col-md-6 col-sm-10 col-12">
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
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
          Login
        </Button>
      </Form>
    </div>
  );
};

export default SignUp;
