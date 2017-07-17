const ADD_QUIZ = 'quiz/ADD_QUIZ';
const RESET_QUIZ = 'quiz/RESET_QUIZ';

const INITIAL_STATE = {
  isAddQuizSuccess: false
};

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case ADD_QUIZ:
      return { ...state, isAddQuizSuccess: true };
    case RESET_QUIZ:
      return { ...state, isAddQuizSuccess: false };
    default:
      return state;
  }
}

export function addQuiz() {
  return { type: ADD_QUIZ };
}

export function resetQuizState() {
  return { type: RESET_QUIZ };
}
