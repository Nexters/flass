const QuestionBodyAdapter = {
  uploadByQuestionId: (lectureId, questionState) => {
    const {
      TitleInputValue,
      checkedQuizIndex,
      secsOfQuiz
    } = questionState;

    return Promise.resolve({
      lecture_id: lectureId,
      content: TitleInputValue,
      correct_answer: checkedQuizIndex.toString(),
      question_at: parseInt(secsOfQuiz)
    });
  }
};

const ChoiceBodyAdapter = {
  upload: (questionId, singleChoiceValues) => {
    const {
      choiceTextValue
    } = singleChoiceValues;

    return Promise.resolve({
      question_id: questionId,
      answer: choiceTextValue
    });
  }
};

const Answer = {
  uploadByQuestionId: (questionId, indexOfSelectedChoice) => ({
    question_id: questionId,
    answer: indexOfSelectedChoice
  })
};

export {
  QuestionBodyAdapter,
  ChoiceBodyAdapter,
  Answer
};
