import _ from 'lodash';
import {
  createReducer
} from '../../../reducerHelper';
import {
  FETCH_QUESTION_SUCCESS,
  UPDATE_SOLVED_QUESTION
} from './actions';

const initialState = {
  totalCount: 0,
  questions: {
    textStateOfQuestions: [],
    secsStateOfQuestions: []
  },
  solvedQuestionsState: []
};

const fetchQuestionReducer = {
  [FETCH_QUESTION_SUCCESS]: (state, { questions }) => ({
    ...state,
    questions
  })
};

const updateSolvedQuestion = {
  [UPDATE_SOLVED_QUESTION]: (state, action) => {
    const { id, indexOfQuestion, isCorrect, indexOfSelectedChoice, indexOfAnswer } = action.payload;

    return {
      ...state,
      solvedQuestionsState: _.concat(
        state.solvedQuestionsState,
        { id, indexOfQuestion, isCorrect, indexOfSelectedChoice, indexOfAnswer }
      )
    };
  }
};

const QuestionReducers = createReducer(initialState, {
  ...fetchQuestionReducer,
  ...updateSolvedQuestion
});

export default QuestionReducers;
