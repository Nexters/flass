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

const AnswerBodyAdapter = {
  uploadByQuestionId: (questionId, indexOfSelectedChoice) => Promise.resolve({
    question_id: parseInt(questionId),
    answer: indexOfSelectedChoice
  })
};

const LectureBodyAdapter = {
  upload: ({
    questionState,
    title,
    description,
    subject,
    textbook,
    videoURL,
    thumbURL
  }) => Promise.resolve({
    title,
    subject,
    content: description,
    textbook_range: textbook,
    url: videoURL,
    thumbnail_url: thumbURL,
    duration: questionState.duration
  })
};

export {
  QuestionBodyAdapter,
  ChoiceBodyAdapter,
  AnswerBodyAdapter,
  LectureBodyAdapter
};
