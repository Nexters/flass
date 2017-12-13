import { all, call, put, takeEvery } from 'redux-saga/effects';
import {
  createReducer
} from '../../../reducerHelper';
import logger from '../../../../util/LogUtil';
import agent from '../../../agent';

export const REQUEST_LECTURE_ANALYSIS = 'REQUEST_LECTURE_ANALYSIS';
export const SUCCESS_REQUEST_LECTURE_ANALYSIS = 'SUCCESS_REQUEST_LECTURE_ANALYSIS';
export const EMPTY_QUESTION_ANALYSIS = 'EMPTY_QUESTION_ANALYSIS';
export const FAIL_REQUEST_LECTURE_ANALYSIS = 'FAIL_REQUEST_LECTURE_ANALYSIS';
export const UNMOUNT_ANALYSIS = 'UNMOUNT_ANALYSIS';

const initialState = {
  questions: [],
  answers: [],
  question_answers: []
};

const requestStatisticsReducer = {
  [SUCCESS_REQUEST_LECTURE_ANALYSIS]: (state, { payload }) => returnAnswersAndQuestions(state, payload),
  [EMPTY_QUESTION_ANALYSIS]: (state, { payload }) => returnAnswersAndQuestions(state, payload),
  [FAIL_REQUEST_LECTURE_ANALYSIS]: state => state,
  [UNMOUNT_ANALYSIS]: () => initialState
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

export function* makeSelectedAnswer(answer) {
  const user = yield call(agent.User.byId, answer['user_id']);
  return {
    ...answer,
    userName: user.username,
  };
}

export function* requestLectureAnalysis({ lectureId, questionIndex }) {
  try {
    const { questions, answers } = yield call(agent.Analysis.fetch, lectureId);

    if (isLectureHasQuestions(questions)) {
      const questionId = questions[questionIndex].id || -1;

      const selectedAnswers = yield all(answers[questionId].map(answer => makeSelectedAnswer(answer)));
      const questionAnswers = yield call(agent.Choice.fetch, questionId);

      yield put({
        type: SUCCESS_REQUEST_LECTURE_ANALYSIS,
        payload: {
          questions,
          answers: selectedAnswers,
          question_answers: questionAnswers
        }
      });
    } else {
      yield put({
        type: EMPTY_QUESTION_ANALYSIS,
        payload: {
          questions: [],
          answers: [],
          question_answers: []
        }
      });
    }
  } catch (e) {
    logger.error(e);
    yield put({
      type: FAIL_REQUEST_LECTURE_ANALYSIS
    });
  }
}

export function isLectureHasQuestions(questions) {
  return questions.length !== 0;
}

export function* rootSaga() {
  yield takeEvery(REQUEST_LECTURE_ANALYSIS, requestLectureAnalysis);
}
