import {
  ADD_MULTIPLE_CHIOICE_QUESTION,
  ADD_ANSWER_QUESTION,
  CANCEL_ADDING_QUESTION
} from './QuizActions';

const INITIAL_STATE = {
  isAdding: false,
  type: null
};
const MULTIPLE_CHOICE_TYPE = 'multiple_choice_type';
const ANSWER_QUESTION_TYPE = 'answer_question_type';

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case ADD_MULTIPLE_CHIOICE_QUESTION:
      return { ...state, type: MULTIPLE_CHOICE_TYPE, isAdding: true };
    case ADD_ANSWER_QUESTION:
      return { ...state, type: ANSWER_QUESTION_TYPE, isAdding: true };
    case CANCEL_ADDING_QUESTION:
      return { ...state, type: null, isAdding: false };
    default:
      return state;
  }
}
