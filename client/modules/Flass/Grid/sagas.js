import { takeEvery, takeLatest } from 'redux-saga';
import { all, call, fork, take, select, put, cancel } from 'redux-saga/effects';
import _ from 'lodash';
import agent from '../../agent';
import {
  FETCH_MY_CHANNEL,
  FETCH_READY_MY_CHANNEL,
  FETCH_MY_CHANNEL_SUCCESS,
  FETCH_MY_CHANNEL_ERROR,

  DELETE_MY_CHANNEL_ITEM,
  DELETE_READY_MY_CHANNEL_ITEM,
  DELETE_MY_CHANNEL_ITEM_SUCCESS,
  DELETE_MY_CHANNEL_ITEM_ERROR,
  DELETE_MY_CHANNEL_ITEM_FIN
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
    console.error(err);
    yield put({
      type: FETCH_MY_CHANNEL_ERROR,
      message: err.message
    });
  }
}

function* deleteMyChannelItem({ id }) {
  yield put({
    type: DELETE_READY_MY_CHANNEL_ITEM
  });

  try {
    yield call(agent.Lecture.delete, id);
    yield put({
      type: DELETE_MY_CHANNEL_ITEM_SUCCESS,
      id
    });
    yield put({
      type: DELETE_MY_CHANNEL_ITEM_FIN
    });
  } catch (e) {
    yield put({
      type: DELETE_MY_CHANNEL_ITEM_ERROR,
      message: err.message
    });
  }
}

export default function* rootSaga() {
  yield takeLatest(FETCH_MY_CHANNEL, fetchMyChannelItems);
  yield takeLatest(DELETE_MY_CHANNEL_ITEM, deleteMyChannelItem);
}
