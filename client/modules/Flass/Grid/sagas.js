import { takeEvery } from 'redux-saga';
import { all, call, fork, take, select, put, cancel } from 'redux-saga/effects';
import _ from 'lodash';
import agent from '../../agent';
import {
  FETCH_MY_CHANNEL,
  FETCH_MY_CHANNEL_ERROR, FETCH_MY_CHANNEL_SUCCESS,
  FETCH_READY_MY_CHANNEL,
} from './actions';

function* makeWithQuestionCount(item) {
  const res = yield call(agent.Comment.byLectureId, item.id);
  return { ...item, questionCount: res.comments.length };
}

function* fetchMyChannelItems() {
  yield put({
    type: FETCH_READY_MY_CHANNEL
  });
  try {
    const items = yield call(agent.Grid.all);
    const itemsWithQuestion = yield all(_.map(items, item => makeWithQuestionCount(item)));
    yield put({
      type: FETCH_MY_CHANNEL_SUCCESS,
      items: itemsWithQuestion
    });
  } catch (err) {
    console.log(err);
    yield put({
      type: FETCH_MY_CHANNEL_ERROR,
      message: err.message
    });
  }
}

export default function* rootSaga() {
  yield takeEvery(FETCH_MY_CHANNEL, fetchMyChannelItems);
}
