import { call, put, takeEvery } from 'redux-saga/effects';
import {
  REQUEST_LECTURE_ANALYSIS,
  SUCCESS_REQUEST_LECTURE_ANALYSIS,
  FAIL_REQUEST_LECTURE_ANALYSIS
} from './actions';
import agent from '../../../agent';

function* requestLectureAnalysis({ id }) {
  try {
    const [analysis, answers] = yield [call(agent.Analysis.fetch, id), call(agent.Answer.byLectureId, id)];
    console.log('requestLectureAnalysis::statistics');
    console.log(analysis, answers);
    yield put({
      type: SUCCESS_REQUEST_LECTURE_ANALYSIS,
      payload: analysis
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
