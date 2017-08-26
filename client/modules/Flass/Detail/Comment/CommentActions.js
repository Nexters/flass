import { call, fork, take, select, put, cancel, takeLatest } from 'redux-saga/effects';
import _ from 'lodash';
import agent from '../../../agent';

export const FETCH_COMMENT = 'FETCH_COMMENT';
export const FETCH_READY_COMMENT = 'FETCH_READY_COMMENT';
export const FETCH_COMMENT_SUCCESS = 'FETCH_COMMENT_SUCCESS';
export const FETCH_COMMENT_ERROR = 'FETCH_COMMENT_ERROR';

function* fetchComment({ detailId }) {
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

export const ADD_COMMENT = 'ADD_COMMENT';
export const ADD_READY_COMMENT = 'ADD_READY_COMMENT';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_ERROR = 'ADD_COMMENT_ERROR';

function* addComment({ commentId, detailId, userId, userName, content }) {
  console.log(commentId, detailId, userId, userName, content);
  const tmpCommentId = Date.now().toString();
  yield put({
    type: ADD_READY_COMMENT,
    parentId: commentId,
    comment: {
      id: tmpCommentId,
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
      id: tmpCommentId,
      newId: res.id
    });
  } catch (err) {
    yield put({
      type: ADD_COMMENT_ERROR,
      message: err.message,
      id: tmpCommentId
    });
  }
}

export const DELETE_COMMENT = 'DELETE_COMMENT';
export const DELETE_READY_COMMENT = 'DELETE_READY_COMMENT';
export const DELETE_COMMENT_SUCCESS = 'DELETE_COMMENT_SUCCESS';
export const DELETE_COMMENT_ERROR = 'DELETE_COMMENT_ERROR';

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


export const FETCH_REPLY_COMMENT = 'FETCH_REPLY_COMMENT';

function fetchReplyComment(commentId) {
  return {
    type: FETCH_READY_COMMENT,
    commentId
  };
}

export default function* rootSaga() {
  yield takeLatest(FETCH_COMMENT, fetchComment);
  yield takeLatest(ADD_COMMENT, addComment);
  yield takeLatest(DELETE_COMMENT, deleteComment);
}
