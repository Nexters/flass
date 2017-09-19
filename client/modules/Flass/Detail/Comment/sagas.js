import { call, fork, take, select, put, cancel, takeLatest } from 'redux-saga/effects';
import _ from 'lodash';
import agent from '../../../agent';
import {
  ADD_COMMENT,
  ADD_COMMENT_ERROR,
  ADD_COMMENT_SUCCESS,
  ADD_READY_COMMENT, DELETE_COMMENT, DELETE_COMMENT_ERROR,
  DELETE_COMMENT_SUCCESS, FETCH_COMMENT,
  FETCH_COMMENT_ERROR, FETCH_COMMENT_SUCCESS,
  FETCH_READY_COMMENT,
} from './actions';

export function* fetchComment({ detailId }) {
  yield put({ type: FETCH_READY_COMMENT });

  try {
    const response = yield call(agent.Comment.byDetailId, detailId);
    yield put({
      type: FETCH_COMMENT_SUCCESS,
      comments: response.comments,
      commentchild: response.commentchild
    });
  } catch (err) {
    yield put({
      type: FETCH_COMMENT_ERROR,
      message: err.message
    });
  }
}

export function* addComment({ tempId, commentId, detailId, userId, userName, content }) {
  const tempCommentId = tempId || Date.now().toString();
  yield put({
    type: ADD_READY_COMMENT,
    parentId: commentId,
    comment: {
      id: tempCommentId,
      detailId,
      userId,
      userName,
      content
    }
  });
  try {
    const res = !commentId ? yield call(agent.Comment.postComment, detailId, content) :
      yield call(agent.Comment.postReplyComment, commentId, content);
    yield put({
      type: ADD_COMMENT_SUCCESS,
      parentId: commentId,
      id: tempCommentId,
      newId: res.id
    });
  } catch (err) {
    yield put({
      type: ADD_COMMENT_ERROR,
      message: err.message,
      id: tempCommentId
    });
  }
}

function* deleteComment({ parentId, commentId }) {
  try {
    parentId ? yield call(agent.Comment.deleteReplyById, commentId) : yield call(agent.Comment.deleteById, commentId);
    yield put({
      type: DELETE_COMMENT_SUCCESS,
      parentId,
      id: commentId
    });
  } catch (err) {
    yield put({
      type: DELETE_COMMENT_ERROR,
      message: err.message
    });
  }
}

export default function* rootSaga() {
  yield takeLatest(FETCH_COMMENT, fetchComment);
  yield takeLatest(ADD_COMMENT, addComment);
  yield takeLatest(DELETE_COMMENT, deleteComment);
}
