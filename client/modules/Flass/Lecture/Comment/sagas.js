import { all, call, fork, take, select, put, cancel, takeLatest } from 'redux-saga/effects';
import agent from '../../../agent';
import {
  ADD_COMMENT,
  ADD_COMMENT_ERROR,
  ADD_COMMENT_SUCCESS,
  ADD_READY_COMMENT, DELETE_COMMENT, DELETE_COMMENT_ERROR,
  DELETE_COMMENT_SUCCESS, FETCH_COMMENT,
  FETCH_COMMENT_ERROR, FETCH_COMMENT_SUCCESS,
  FETCH_READY_COMMENT, UPDATE_COMMENT, UPDATE_COMMENT_ERROR,
  UPDATE_COMMENT_SUCCESS,
} from './actions';

export function* fetchComment({ lectureId }) {
  yield put({ type: FETCH_READY_COMMENT });

  try {
    const response = yield call(agent.Comment.byLectureId, lectureId);
    yield put({
      type: FETCH_COMMENT_SUCCESS,
      comments: response.comments,
      commentchild: response.commentchild,
    });
  } catch (err) {
    yield put({
      type: FETCH_COMMENT_ERROR,
      message: err.message
    });
  }
}

export function* addComment({ tempId, commentId, lectureId, userId, userName, content }) {
  const tempCommentId = tempId || Date.now().toString();
  yield put({
    type: ADD_READY_COMMENT,
    parentId: commentId,
    comment: {
      id: tempCommentId,
      lectureId,
      userId,
      userName,
      content
    }
  });
  try {
    const res = !commentId ? yield call(agent.Comment.postComment, lectureId, content) :
      yield call(agent.Comment.postReplyComment, commentId, content);
    yield put({
      type: ADD_COMMENT_SUCCESS,
      parentId: commentId,
      id: tempCommentId,
      newComment: res,
    });
  } catch (err) {
    yield put({
      type: ADD_COMMENT_ERROR,
      message: err.message,
      id: tempCommentId
    });
  }
}

function* updateComment({ parentId, commentId, content }) {
  try {
    const res = !parentId ? yield call(agent.Comment.putComment, commentId, content) :
      yield call(agent.Comment.putReplyComment, commentId, content);
    yield put({
      type: UPDATE_COMMENT_SUCCESS,
      parentId,
      id: commentId,
      content
    });
  } catch (err) {
    yield put({
      type: UPDATE_COMMENT_ERROR,
      message: err.message,
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
  yield takeLatest(UPDATE_COMMENT, updateComment);
  yield takeLatest(ADD_COMMENT, addComment);
  yield takeLatest(DELETE_COMMENT, deleteComment);
}
