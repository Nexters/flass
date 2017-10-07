import {
  createReducer
} from '../../../reducerHelper';
import {
  SUCCESS_REQUEST_LECTURE_ANALYSIS,
  EMPTY_QUESTION_ANALYSIS,
  FAIL_REQUEST_LECTURE_ANALYSIS
} from './actions';

const initialState = {
  questions: [],
  answers: [],
  question_answers: []
};

const requestStatisticsReducer = {
  [SUCCESS_REQUEST_LECTURE_ANALYSIS]: (state, { payload }) => returnAnswersAndQuestions(state, payload),
  [EMPTY_QUESTION_ANALYSIS]: (state, { payload }) => returnAnswersAndQuestions(state, payload),
  [FAIL_REQUEST_LECTURE_ANALYSIS]: state => state
};

function returnAnswersAndQuestions(state, payload) {
  const { answers, questions, question_answers } = payload;
  return {
    ...state,
    answers,
    questions,
    question_answers
  };
}

const AnalysisReducer = createReducer(initialState, {
  ...requestStatisticsReducer
});

export default AnalysisReducer;
