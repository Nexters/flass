import { call, put, takeEvery } from 'redux-saga/effects';
import _ from 'lodash';
import {
  REQUEST_LECTURE_ANALYSIS,
  SUCCESS_REQUEST_LECTURE_ANALYSIS,
  FAIL_REQUEST_LECTURE_ANALYSIS
} from './actions';
import agent from '../../../agent';

function* requestLectureAnalysis({ lectureId, questionIndex }) {
  try {
    const [analysis, answers] = yield [call(agent.Analysis.fetch, lectureId), call(agent.Answer.byLectureId, lectureId)];
    console.log('requestLectureAnalysis::statistics');
    console.log(analysis, answers);

    const { questions } = analysis;
    const questionId = questions[questionIndex] || -1;

    yield put({
      type: SUCCESS_REQUEST_LECTURE_ANALYSIS,
      payload: {
        ...analysis,
        question_answers: _.filter(answers, answer => answer['question_id'] == questionId)
      }
    });
  } catch (e) {
    yield put({
      type: FAIL_REQUEST_LECTURE_ANALYSIS
    });
  }
}

export default function* rootSaga() {
  yield takeEvery(REQUEST_LECTURE_ANALYSIS, requestLectureAnalysis);
}
