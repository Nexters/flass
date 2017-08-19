import _ from 'lodash';
import {
  createReducer
} from '../../../reducerHelper';
import { FETCH_READY_COMMENT, FETCH_COMMENT_SUCCESS, FETCH_COMMENT_ERROR,
  ADD_READY_COMMENT, ADD_COMMENT_SUCCESS, ADD_COMMENT_ERROR, DELETE_COMMENT_SUCCESS, DELETE_COMMENT_ERROR } from './CommentActions';
import { createReducer } from '../../../reduxHelper';

const initialState = {
  comments: []
};

const fetchCommentReducer = {
  [FETCH_READY_COMMENT]: (state, action) => state,
  [FETCH_COMMENT_SUCCESS]: (state, action) => ({
    ...state,
    comments: action.comments
  }),
  [FETCH_COMMENT_ERROR]: (state, action) => state
};

const addCommentReducer = {
  [ADD_READY_COMMENT]: (state, action) => ({
    ...state,
    comments: [...state.comments, action.comment]
  }),
  [ADD_COMMENT_SUCCESS]: (state, action) => ({
    ...state,
    comments: _.map(state.comments, comment =>
      (comment.id === action.id ? { ...comment, id: action.newId } : comment))
  }),
  [ADD_COMMENT_ERROR]: (state, action) => ({
    ...state,
    comments: _.filter(state.comments, comment => (comment.id !== action.id))
  })
};

const removeCommentReducer = {
  [DELETE_COMMENT_SUCCESS]: (state, action) => ({
    ...state,
    comments: _.filter(state.comments, comment => (comment.id !== action.id))
  }),
  [DELETE_COMMENT_ERROR]: (state, action) => state
};

const CommentReducer = createReducer(initialState, {
  ...fetchCommentReducer,
  ...addCommentReducer,
  ...removeCommentReducer
});

export default CommentReducer;
