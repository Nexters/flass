const Question = {
  uploadByQuestionId: (lectureId, questionState) => {
    const {
      TitleInputValue,
      checkedQuizIndex,
      secsOfQuiz
    } = questionState;

    return {
      lecture_id: lectureId,
      content: TitleInputValue,
      correct_answer: checkedQuizIndex.toString(),
      question_at: parseInt(secsOfQuiz)
    };
  }
};

const Choice = {
  upload: (questionId, singleChoiceValues) => {
    const {
      choiceTextValue
    } = singleChoiceValues;

    return {
      question_id: questionId,
      answer: choiceTextValue
    };
  }
};

const Answer = {
  uploadByQuestionId: (questionId, indexOfSelectedChoice) => ({
    question_id: questionId,
    answer: indexOfSelectedChoice
  })
};

export {
  Question,
  Choice,
  Answer
};
