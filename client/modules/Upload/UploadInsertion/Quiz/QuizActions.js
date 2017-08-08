export const ADD_MULTIPLE_CHIOICE_QUESTION = 'add_multiple_choice_question';
export const ADD_ANSWER_QUESTION = 'add_answer_question';
export const CANCEL_ADDING_QUESTION = 'cancel_adding_question';

export function addMultipleChoiceQuestion() {
  return { type: ADD_MULTIPLE_CHIOICE_QUESTION };
}

export function addAnswerQuestion() {
  return { type: ADD_ANSWER_QUESTION };
}

export function cancelAddingQuestion() {
  return { type: CANCEL_ADDING_QUESTION };
}
