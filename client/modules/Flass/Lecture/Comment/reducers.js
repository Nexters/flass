import _ from 'lodash';
import {
  FETCH_READY_COMMENT,
  FETCH_COMMENT_SUCCESS,
  FETCH_COMMENT_ERROR,
  ADD_READY_COMMENT,
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_ERROR,
  DELETE_COMMENT_SUCCESS,
  DELETE_COMMENT_ERROR, UPDATE_READY_COMMENT, UPDATE_COMMENT_SUCCESS,
  UPDATE_COMMENT_ERROR
} from './actions';
import { createReducer } from '../../../reduxHelper';
import { dateTimeFormat } from '../../../../util/TimeUtil';

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

const fetchCommentReducer = {
  [FETCH_READY_COMMENT]: (state, action) => state,
  [FETCH_COMMENT_SUCCESS]: (state, action) => ({
    ...state,
    comments: mapToComments(action.comments),
    commentchild: _.reduce(Object.keys(action.commentchild), (res, key) => {
      res[key] = mapToComments(action.commentchild[key]);
      return res;
    }, {})
  }),
  [FETCH_COMMENT_ERROR]: (state, action) => state
};

const updateComment = (func, state, parentId, id) => {
  if (parentId) {
    return {
      ...state,
      commentchild: {
        ...state.commentchild,
        [parentId]: _.map(state.commentchild[parentId],
          comment => (comment.id === id ? func(comment) : comment))
      }
    };
  }
  return {
    ...state,
    comments: _.map(state.comments,
      comment => (comment.id === id ? func(comment) : comment))
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
    updateComment(comment => ({ ...comment, ...mapToComment(newComment) }), state, parentId, id),
  [ADD_COMMENT_ERROR]: (state, action) => ({
    ...state,
    comments: _.filter(state.comments, comment => (comment.id !== action.id))
  })
};

const updateCommentReducer = {
  [UPDATE_READY_COMMENT]: state => state,
  [UPDATE_COMMENT_SUCCESS]: (state, { parentId, id, content }) => updateComment(comment => ({ ...comment, content }), state, parentId, id),
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
        commentchild: _.filter(state.commentchild[parentId], comment => (comment.id !== id))
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
