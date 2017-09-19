export const ADD_MULTIPLE_CHIOICE_QUESTION = 'add_multiple_choice_question';
export function addMultipleChoiceQuestion() {
  return { type: ADD_MULTIPLE_CHIOICE_QUESTION };
}

export const ADD_ANSWER_QUESTION = 'add_answer_question';
export function addAnswerQuestion() {
  return { type: ADD_ANSWER_QUESTION };
}

export const CANCEL_ADDING_QUESTION = 'cancel_adding_question';
export function cancelAddingQuestion() {
  return { type: CANCEL_ADDING_QUESTION };
}

export const COMPLETE_ADDING_QUESTION = 'complete_adding_question';
export function completeAddingQuestion() {
  return { type: COMPLETE_ADDING_QUESTION };
}

export const SAVE_MULTIPLE_CHOICE_QUESTION = 'save_multiple_choice_question';
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


export const ADD_QUESTION_SECS = 'add_question_secs';
export function addQuestionSecs({ playedSeconds, indexOfQuestion }) {
  return {
    type: ADD_QUESTION_SECS,
    payload: { playedSeconds, indexOfQuestion, isFocused: false }
  };
}


export const FOCUS_ON_QUESTION = 'focus_on_question';
export function focusOnQuestion({ label }) {
  return {
    type: FOCUS_ON_QUESTION,
    payload: { label }
  };
}


export const COMPLETE_EDIT_QUESTION = 'complete_edit_question';
export function completeEditQuestion({ EditedTextStateOfFocusedQuestion }) {
  return {
    type: COMPLETE_EDIT_QUESTION,
    payload: { EditedTextStateOfFocusedQuestion }
  };
}


export const DELETE_COMPLETE_QUESTION = 'delete_complete_question';
export function deleteCompleteQuestion({ indexOfQuestion }) {
  return {
    type: DELETE_COMPLETE_QUESTION,
    payload: { indexOfQuestion }
  };
}

export const REQUEST_UPLOAD_QUESTIONS = 'request_upload_questions';
export const INIT_UPLOAD_QUESTIONS = 'INIT_UPLOAD_QUESTIONS';
export function initUploadQuestions() {
  return {
    type: INIT_UPLOAD_QUESTIONS
  };
}

export const SUCCESS_UPLOAD_QUESTIONS = 'success_upload_questions';
export const FAIL_UPLOAD_QUESTIONS = 'fail_upload_questions';
