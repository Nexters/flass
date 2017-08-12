import fetch from 'axios';
import { call, fork, take, select, put, cancel, takeLatest } from 'redux-saga/effects';
import _ from 'lodash';

export const FETCH_COMMENT = 'FETCH_COMMENT';
export const FETCH_READY_COMMENT = 'FETCH_READY_COMMENT';
export const FETCH_COMMENT_SUCCESS = 'FETCH_COMMENT_SUCCESS';
export const FETCH_COMMENT_ERROR = 'FETCH_COMMENT_ERROR';

function* fetchRequestComment({ detailId }) {
  yield put({ type: FETCH_READY_COMMENT });

  try {
    const response = yield call(fetch, '/json/FlassComment.json');
    yield put({
      type: FETCH_COMMENT_SUCCESS,
      comments: response.data
    });
  } catch (err) {
    yield put({
      type: FETCH_COMMENT_ERROR,
      message: err.message
    });
  }
}

export const ADD_COMMENT = 'ADD_COMMENT';
export const ADD_READY_COMMENT = 'ADD_READY_COMMENT';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_ERROR = 'ADD_COMMENT_ERROR';

function* addComment({ detailId, userId, userName, content }) {
  const commentId = Date.now().toString();
  yield put({
    type: ADD_READY_COMMENT,
    comment: {
      id: commentId,
      detailId,
      userId,
      userName,
      content
    }
  });

  try {
    const response = yield call(fetch, '/json/FlassPostComment.json');
    yield put({
      type: ADD_COMMENT_SUCCESS,
      id: commentId,
      newId: response.data.id
    });
  } catch (err) {
    yield put({
      type: ADD_COMMENT_ERROR,
      message: err.message
    });
  }
}

export default function* rootSaga() {
  yield takeLatest(FETCH_COMMENT, fetchRequestComment);
  yield takeLatest(ADD_COMMENT, addComment);
}
