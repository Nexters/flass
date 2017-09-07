import {
  createReducer
} from '../../../reducerHelper';
import {
  SUCCESS_REQUEST_LECTURE_ANALYSIS,
  FAIL_REQUEST_LECTURE_ANALYSIS
} from './actions';

const initialState = {
  questions: [],
  answers: {}
};

const requestStatisticsReducer = {
  [SUCCESS_REQUEST_LECTURE_ANALYSIS]: (state, { payload }) => {
    const { answers, questions, question_answers } = payload;
    return {
      ...state,
      answers,
      questions,
      question_answers,
    };
  },
  [FAIL_REQUEST_LECTURE_ANALYSIS]: state => state
};

const AnalysisReducer = createReducer(initialState, {
  ...requestStatisticsReducer
});

export default AnalysisReducer;
