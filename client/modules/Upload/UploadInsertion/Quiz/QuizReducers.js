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
  questionSecsStateArray: [],
  isAdding: false,
  type: null,
  numOfQuestion: 0,
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
        numOfQuestion: state.numOfQuestion
      };
    }
    case ADD_QUESTION_SECS: {
      const { playedSeconds, label } = action.payload;
      const newSecsState = {
        playedSeconds: parseFloat(playedSeconds),
        label
      };

      return {
        ...state,
        questionSecsStateArray: _.concat(state.questionSecsStateArray, newSecsState)
      };
    }
    default:
      return state;
  }
}
