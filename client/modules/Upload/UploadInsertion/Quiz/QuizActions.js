export const ADD_MULTIPLE_CHIOICE_QUESTION = 'add_multiple_choice_question';
export const ADD_ANSWER_QUESTION = 'add_answer_question';
export const CANCEL_ADDING_QUESTION = 'cancel_adding_question';
export const COMPLETE_ADDING_QUESTION = 'complete_adding_question';
export const SAVE_MULTIPLE_CHOICE_QUESTION = 'save_multiple_choice_question';
export const ADD_QUESTION_SECS = 'add_question_secs';

export function addMultipleChoiceQuestion() {
  return { type: ADD_MULTIPLE_CHIOICE_QUESTION };
}

export function addAnswerQuestion() {
  return { type: ADD_ANSWER_QUESTION };
}

export function cancelAddingQuestion() {
  return { type: CANCEL_ADDING_QUESTION };
}

export function completeAddingQuestion() {
  return { type: COMPLETE_ADDING_QUESTION };
}

export function saveMultipleChoiceQuestion({  numOfQuiz,
                                              numOfChoice,
                                              checkedQuizIndex,
                                              TitleInputValue,
                                              SingleChoiceValues,
                                              duration,
                                              played,
                                              secsOfQuiz }) {
  return {
    type: SAVE_MULTIPLE_CHOICE_QUESTION,
    payload: {
      numOfQuiz,
      numOfChoice,
      checkedQuizIndex,
      TitleInputValue,
      SingleChoiceValues,
      duration,
      played,
      secsOfQuiz
    }
  };
}

export function addQuestionSecs({ playedSeconds }) {
  return {
    type: ADD_QUESTION_SECS,
    payload: { playedSeconds }
  };
}
