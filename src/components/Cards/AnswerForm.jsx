import React, { useState, useContext } from "react";
import { Form, Button } from "react-bootstrap";

import LoginContext from "../../storage/login-context";

const AnswerForm = (props) => {
  const [answer, setAnswer] = useState("");

  const loginCtx = useContext(LoginContext);

  // Change handlers
  // Answer
  const answerInputChangeHandler = (event) => {
    setAnswer(event.target.value);
  };

  const formSubmitionHandler = async (event) => {
    event.preventDefault();

    const token = loginCtx.sendToken();

    // Sent request to API
    const response = await fetch(
      `http://localhost:5000/questions/${props.questionId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({
          answerText: answer,
        }),
      }
    );
    const responseData = await response.json();

    console.log(responseData);

    setAnswer("");

    // Umjesto setTimeout treba dodati odgovor na ekran
    setTimeout(() => {
      window.location.reload();
    }, 400);
  };

  return (
    <div onSubmit={formSubmitionHandler} className="d-flex mt-4">
      <Form className="col-lg-4 col-md-6 col-sm-10 col-12">
        <Form.Group className="mb-2" controlId="formBasicAnswer">
          <Form.Control
            type="text"
            required
            placeholder="Write you answer here.."
            onChange={answerInputChangeHandler}
            value={answer}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Post answer
        </Button>
      </Form>
    </div>
  );
};

export default AnswerForm;
