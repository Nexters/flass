import _ from 'lodash';
import {
  ADD_MULTIPLE_CHIOICE_QUESTION,
  ADD_ANSWER_QUESTION,
  CANCEL_ADDING_QUESTION,
  COMPLETE_ADDING_QUESTION,
  SAVE_MULTIPLE_CHOICE_QUESTION,
  ADD_QUESTION_SECS
} from './QuizActions';

const INITIAL_STATE = {
  questionSecsArray: [],
  isAdding: false,
  type: null,
  numOfQuiz: 0,
  quizState: []
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
    case COMPLETE_ADDING_QUESTION:
      return { ...state, type: null, isAdding: false };
    case SAVE_MULTIPLE_CHOICE_QUESTION: {
      const {
        TitleInputValue,
        checkedQuizIndex,
        numOfChoice,
        SingleChoiceValues,
        secsOfQuiz
      } = action.payload;

      const newMultipleChoiceState = {
        TitleInputValue,
        checkedQuizIndex,
        numOfChoice,
        SingleChoiceValues,
        secsOfQuiz
      };

      return {
        ...state,
        quizState: _.concat(state.quizState, newMultipleChoiceState),
        numOfQuiz: state.numOfQuiz + 1
      };
    }
    case ADD_QUESTION_SECS: {
      const { playedSeconds } = action.payload;

      return {
        ...state,
        questionSecsArray: _.concat(state.questionSecsArray, parseFloat(playedSeconds))
      };
    }
    default:
      return state;
  }
}
