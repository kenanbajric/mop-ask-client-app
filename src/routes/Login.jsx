import React from "react";

import { Form, Button } from "react-bootstrap";

const SignUp = () => {
  return (
    <div className="d-flex justify-content-center mt-4">
      <Form className="col-lg-4 col-md-6 col-sm-10 col-12">
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>

        <Button className="mt-2" variant="primary" type="submit">
          Login
        </Button>
      </Form>
    </div>
  );
};

export default SignUp;
