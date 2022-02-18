import React from "react";

import LatestQuestions from "../components/LatestQuestions";

const Questions = () => {
  return (
    <div className="mt-4">
      <LatestQuestions showAnswers={true} showForm={true} />
    </div>
  );
};

export default Questions;
