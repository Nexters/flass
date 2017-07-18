import _ from 'lodash';

const ADD_QUIZ = 'quiz/ADD_QUIZ';
const RESET_QUIZ = 'quiz/RESET_QUIZ';

const INITIAL_STATE = {
  isAddQuizSuccess: false,
  quizTimeArray: []
};

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case ADD_QUIZ:
      return { ...state, isAddQuizSuccess: true, quizTimeArray: _.concat(state.quizTimeArray, action.payload) };
    case RESET_QUIZ:
      return { ...state, isAddQuizSuccess: false };
    default:
      return state;
  }
}

export function addQuiz({ playedSeconds }) {
  return { type: ADD_QUIZ, payload: playedSeconds };
}

export function resetQuizState() {
  return { type: RESET_QUIZ };
}
