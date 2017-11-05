export const ADD_MULTIPLE_CHIOICE_QUESTION = 'ADD_MULTIPLE_CHIOICE_QUESTION';
export function addMultipleChoiceQuestion() {
  return { type: ADD_MULTIPLE_CHIOICE_QUESTION };
}

export const ADD_ANSWER_QUESTION = 'ADD_ANSWER_QUESTION';
export function addAnswerQuestion() {
  return { type: ADD_ANSWER_QUESTION };
}

export const CANCEL_ADDING_QUESTION = 'CANCEL_ADDING_QUESTION';
export function cancelAddingQuestion() {
  return { type: CANCEL_ADDING_QUESTION };
}

export const COMPLETE_ADDING_QUESTION = 'COMPLETE_ADDING_QUESTION';
export function completeAddingQuestion() {
  return { type: COMPLETE_ADDING_QUESTION };
}

export const SAVE_MULTIPLE_CHOICE_QUESTION = 'SAVE_MULTIPLE_CHOICE_QUESTION';
export function saveMultipleChoiceQuestion({  numOfQuestion,
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
      numOfQuestion,
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


export const ADD_QUESTION_SECS = 'ADD_QUESTION_SECS';
export function addQuestionSecs({ playedSeconds, indexOfQuestion }) {
  return {
    type: ADD_QUESTION_SECS,
    payload: { playedSeconds, indexOfQuestion, isFocused: false }
  };
}


export const FOCUS_ON_QUESTION = 'FOCUS_ON_QUESTION';
export function focusOnQuestion({ label }) {
  return {
    type: FOCUS_ON_QUESTION,
    payload: { label }
  };
}


export const COMPLETE_EDIT_QUESTION = 'COMPLETE_EDIT_QUESTION';
export function completeEditQuestion({ EditedTextStateOfFocusedQuestion }) {
  return {
    type: COMPLETE_EDIT_QUESTION,
    payload: { EditedTextStateOfFocusedQuestion }
  };
}


export const DELETE_COMPLETE_QUESTION = 'DELETE_COMPLETE_QUESTION';
export function deleteCompleteQuestion({ indexOfQuestion }) {
  return {
    type: DELETE_COMPLETE_QUESTION,
    payload: { indexOfQuestion }
  };
}

export const REQUEST_UPLOAD_QUESTIONS = 'REQUEST_UPLOAD_QUESTIONS';
export const INIT_UPLOAD_QUESTIONS = 'INIT_UPLOAD_QUESTIONS';
export function initUploadQuestions() {
  return {
    type: INIT_UPLOAD_QUESTIONS
  };
}

export const SUCCESS_UPLOAD_QUESTIONS = 'SUCCESS_UPLOAD_QUESTIONS';
export const FAIL_UPLOAD_QUESTIONS = 'FAIL_UPLOAD_QUESTIONS';

export const INIT_QUESTION_STATES = 'INIT_QUESTION_STATES';
