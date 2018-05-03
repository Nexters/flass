import { all, call, fork, take, select, put, cancel, takeLatest } from 'redux-saga/effects';
import _ from 'lodash';
import moment from 'moment';
import { createReducer } from '../reducerHelper';
import { dateTimeFormat } from '../../util/TimeUtil';
import agent from '../agent';

export const FETCH_COMMENT = 'FETCH_COMMENT';
export const FETCH_READY_COMMENT = 'FETCH_READY_COMMENT';
export const FETCH_COMMENT_SUCCESS = 'FETCH_COMMENT_SUCCESS';
export const FETCH_COMMENT_ERROR = 'FETCH_COMMENT_ERROR';

export const ADD_COMMENT = 'ADD_COMMENT';
export const ADD_READY_COMMENT = 'ADD_READY_COMMENT';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_ERROR = 'ADD_COMMENT_ERROR';

export const UPDATE_COMMENT = 'UPDATE_COMMENT';
export const UPDATE_READY_COMMENT = 'UPDATE_READY_COMMENT';
export const UPDATE_COMMENT_SUCCESS = 'UPDATE_COMMENT_SUCCESS';
export const UPDATE_COMMENT_ERROR = 'UPDATE_COMMENT_ERROR';

export const DELETE_COMMENT = 'DELETE_COMMENT';
export const DELETE_READY_COMMENT = 'DELETE_READY_COMMENT';
export const DELETE_COMMENT_SUCCESS = 'DELETE_COMMENT_SUCCESS';
export const DELETE_COMMENT_ERROR = 'DELETE_COMMENT_ERROR';

export const FETCH_REPLY_COMMENT = 'FETCH_REPLY_COMMENT';

const initialState = {
  comments: [],
  commentchild: {}
};

const mapToComments = comments => _.map(comments, mapToComment);

const mapToComment = comment => ({
  ...comment,
  createdAt: dateTimeFormat(comment['created_at']),
  updatedAt: dateTimeFormat(comment['updated_at'])
});

const orderByCreatedAtDesc = (items) => _.orderBy(items, ["created_at"], ["desc"]);

const fetchCommentReducer = {
  [FETCH_READY_COMMENT]: (state, action) => state,
  [FETCH_COMMENT_SUCCESS]: (state, action) => ({
    ...state,
    comments: _.flow([orderByCreatedAtDesc, mapToComments])(action.comments),
    commentchild: _.reduce(Object.keys(action.commentchild), (res, key) => {
      res[key] = mapToComments(action.commentchild[key]);
      return res;
    }, {})
  }),
  [FETCH_COMMENT_ERROR]: (state, action) => state
};

const getUpdatedComment = (func, state, parentId, id) => {
  if (parentId) {
    return {
      ...state,
      commentchild: {
        ...state.commentchild,
        [parentId]: _.map(
          state.commentchild[parentId],
          comment => (comment.id === id ? func(comment) : comment)
        )
      }
    };
  }
  return {
    ...state,
    comments: _.map(
      state.comments,
      comment => (comment.id === id ? func(comment) : comment)
    )
  };
};

const addCommentReducer = {
  [ADD_READY_COMMENT]: (state, { parentId, comment }) => {
    const newComment = { ...comment, like: 0 };
    if (parentId) {
      const existCommentChild = state.commentchild[parentId] || [];
      return {
        ...state,
        commentchild: {
          ...state.commentchild,
          [parentId]: [newComment, ...existCommentChild]
        }
      };
    }
    return ({
      ...state,
      comments: [...state.comments, newComment]
    });
  },
  [ADD_COMMENT_SUCCESS]: (state, { parentId, id, newComment }) =>
    getUpdatedComment(comment => ({ ...comment, ...mapToComment(newComment) }), state, parentId, id),
  [ADD_COMMENT_ERROR]: (state, action) => ({
    ...state,
    comments: _.filter(state.comments, comment => (comment.id !== action.id))
  })
};

const updateCommentReducer = {
  [UPDATE_READY_COMMENT]: state => state,
  [UPDATE_COMMENT_SUCCESS]: (state, { parentId, id, content }) => getUpdatedComment(comment => ({ ...comment, content }), state, parentId, id),
  [UPDATE_COMMENT_ERROR]: (state, action) => ({
    ...state,
    comments: _.filter(state.comments, comment => (comment.id !== action.id))
  })
};

const removeCommentReducer = {
  [DELETE_COMMENT_SUCCESS]: (state, { parentId, id }) => {
    if (parentId) {
      return ({
        ...state,
        commentchild: {
          [parentId]: _.filter(state.commentchild[parentId], comment => (comment.id !== id))
        }
      });
    }
    return ({
      ...state,
      comments: _.filter(state.comments, comment => (comment.id !== id))
    });
  },
  [DELETE_COMMENT_ERROR]: (state, action) => state
};

const CommentReducer = createReducer(initialState, {
  ...fetchCommentReducer,
  ...addCommentReducer,
  ...updateCommentReducer,
  ...removeCommentReducer
});

export default CommentReducer;

export function* fetchComment({ lectureId }) {
  yield put({ type: FETCH_READY_COMMENT });

  try {
    const response = yield call(agent.Comment.byLectureId, lectureId);
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

export function* addComment({
  tempId, commentId, lectureId, userId, userName, content
}) {
  const tempCommentId = tempId || Date.now().toString();
  yield put({
    type: ADD_READY_COMMENT,
    parentId: commentId,
    comment: {
      id: tempCommentId,
      lectureId,
      userId,
      userName,
      content,
      createdAt: moment().format()
    }
  });
  try {
    const res = !commentId ? yield call(agent.Comment.postComment, lectureId, content) :
      yield call(agent.Comment.postReplyComment, commentId, content);
    yield put({
      type: ADD_COMMENT_SUCCESS,
      parentId: commentId,
      id: tempCommentId,
      newComment: res
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
      message: err.message
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

export function* rootSaga() {
  yield takeLatest(FETCH_COMMENT, fetchComment);
  yield takeLatest(UPDATE_COMMENT, updateComment);
  yield takeLatest(ADD_COMMENT, addComment);
  yield takeLatest(DELETE_COMMENT, deleteComment);
}
