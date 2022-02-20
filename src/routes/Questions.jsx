import React, { Fragment, useState } from "react";
import { Button } from "react-bootstrap";

import LatestQuestions from "../components/LatestQuestions";
import QuestionModal from "../components/QuestionModal";

const Questions = () => {
  const [showQuestionModal, setShowQuestionModal] = useState(false);
  const handleCloseQuestionModal = () => setShowQuestionModal(false);
  const handleShowQuestionModal = () => setShowQuestionModal(true);
  

  return (
    <Fragment>
      <div className="d-flex justify-content-center mt-4">
        {window.sessionStorage.getItem("isLoggedIn") && (
          <Button
            className="my-2 col-4"
            variant="primary"
            onClick={handleShowQuestionModal}
          >
            Ask anything
          </Button>
        )}
      </div>
      <LatestQuestions showAnswers={true} showForm={true} />
      <QuestionModal
        show={showQuestionModal}
        handleClose={handleCloseQuestionModal}
      />
    </Fragment>
  );
};

export default Questions;
