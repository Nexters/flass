import _ from 'lodash';
import {
  ADD_MULTIPLE_CHIOICE_QUESTION,
  ADD_ANSWER_QUESTION,
  CANCEL_ADDING_QUESTION,
  SAVE_MULTIPLE_CHOICE_QUESTION
} from './QuizActions';

const INITIAL_STATE = {
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
      
      console.log('secsOfQuiz', secsOfQuiz);
      return {
        ...state,
        quizState: _.concat(state.quizState, newMultipleChoiceState),
        numOfQuiz: state.numOfQuiz + 1
      };
    }
    default:
      return state;
  }
}
