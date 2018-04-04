const QuestionResDataAdapter = {
  fetch: (question, choices, index) => {
    const {
      id,
      correct_answer,
      content,
      question_at
    } = question;

    const textStateOfQuestions = {
      id,
      answerIndex: parseInt(correct_answer),
      singleChoiceValues: choices.map((choice, cIndex) => ({
        isAnswer: cIndex === parseInt(correct_answer),
        textValue: choice.answer
      })),
      title: content
    };

    const secsStateOfQuestions = {
      playedSeconds: question_at,
      label: `Q${index + 1}`,
      indexOfQuestion: index
    };

    return Promise.resolve({
      textStateOfQuestions,
      secsStateOfQuestions
    });
  }
};

export { QuestionResDataAdapter };
