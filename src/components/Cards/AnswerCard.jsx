import React, { Fragment, useState } from "react";
import { ListGroup } from "react-bootstrap";
import DeleteAnswerModal from "../DeleteAnswerModal";

import EditAnswerModal from "../EditAnswerModal";

const AnswerCard = (props) => {
  // Handling Edit Answer Modal
  const [showEditAnswerModal, setShowEditAnswerModal] = useState(false);
  const handleCloseEditAnswerModal = () => setShowEditAnswerModal(false);
  const handleShowEditAnswerModal = () => setShowEditAnswerModal(true);

  // Handling Delete Answer Modal
  const [showDeleteAnswerModal, setShowDeleteAnswerModal] = useState(false);
  const handleCloseDeleteAnswerModal = () => setShowDeleteAnswerModal(false);
  const handleShowDeleteAnswerModal = () => setShowDeleteAnswerModal(true);

  return (
    <Fragment>
      <ListGroup.Item id={props.answerId} key={props.answerId}>
        {props.answer_text}
        {props.userId === +window.sessionStorage.getItem("userId") && (
          <Fragment>
            <span className="btn btn-link" onClick={handleShowEditAnswerModal}>
              Edit
            </span>
            <span
              className="text-danger btn btn-link"
              onClick={handleShowDeleteAnswerModal}
            >
              Delete
            </span>
          </Fragment>
        )}
        <p className="text-muted small">Answered on {props.createdAt}</p>
      </ListGroup.Item>

      <EditAnswerModal
        answerId={props.answerId}
        show={showEditAnswerModal}
        handleClose={handleCloseEditAnswerModal}
        answerText={props.answer_text}
      />
      <DeleteAnswerModal
        answerId={props.answerId}
        show={showDeleteAnswerModal}
        handleClose={handleCloseDeleteAnswerModal}
      />
    </Fragment>
  );
};

export default AnswerCard;
