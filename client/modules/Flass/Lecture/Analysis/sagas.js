import { all, call, put, takeEvery } from 'redux-saga/effects';
import _ from 'lodash';
import {
  REQUEST_LECTURE_ANALYSIS,
  SUCCESS_REQUEST_LECTURE_ANALYSIS,
  FAIL_REQUEST_LECTURE_ANALYSIS
} from './actions';
import agent from '../../../agent';

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
  } catch (e) {
    console.error(e);
    yield put({
      type: FAIL_REQUEST_LECTURE_ANALYSIS
    });
  }
}

export default function* rootSaga() {
  yield takeEvery(REQUEST_LECTURE_ANALYSIS, requestLectureAnalysis);
}