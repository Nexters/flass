import {
  createReducer
} from '../../../reducerHelper';
import {
  SUCCESS_REQUEST_LECTURE_ANALYSIS,
  EMPTY_QUESTION_ANALYSIS,
  FAIL_REQUEST_LECTURE_ANALYSIS,
  UNMOUNT_ANALYSIS
} from './actions';

const initialState = {
  questions: [],
  questionIndex: 0,
  answers: [],
  question_answers: [],
  loadingQuestions_: false
};

const requestStatisticsReducer = {
  [SUCCESS_REQUEST_LECTURE_ANALYSIS]: (state, { payload }) => returnAnswersAndQuestions(state, payload),
  [EMPTY_QUESTION_ANALYSIS]: (state, { payload }) => returnAnswersAndQuestions(state, payload),
  [FAIL_REQUEST_LECTURE_ANALYSIS]: state => state,
  [UNMOUNT_ANALYSIS]: () => initialState
};

function returnAnswersAndQuestions(state, payload) {
  const { answers, questions, question_answers, loadingQuestions_ } = payload;
  return {
    ...state,
    answers,
    questions,
    question_answers,
    loadingQuestions_
  };
}

const AnalysisReducer = createReducer(initialState, {
  ...requestStatisticsReducer
});

export default AnalysisReducer;
