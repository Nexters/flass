import { FETCH_READY_COMMENT, FETCH_COMMENT_SUCCESS, FETCH_COMMENT_ERROR,
  ADD_READY_COMMENT, ADD_COMMENT_SUCCESS, ADD_COMMENT_ERROR } from './CommentActions';
import _ from 'lodash';

const initialState = {
  comments: [],
  get totalCount() {
    return this.comments.length;
  }
};

const CommentReducer = (state = initialState, action) => {
  switch(action.type) {
    case FETCH_COMMENT_SUCCESS:
      return {
        ...state,
        comments: action.comments
      };
    case ADD_READY_COMMENT:
      return {
        ...state,
        comments: [...state.comments, action.comment]
      };
    case ADD_COMMENT_SUCCESS:
      return {
        ...state,
        comments: _.map(state.comments, comment =>
          (comment.id === action.id ? { ...comment, id: action.newId } : comment))
      };
    case FETCH_READY_COMMENT:
    case FETCH_COMMENT_ERROR:
    case ADD_COMMENT_ERROR:
    default:
      return state;
  }
};

export default CommentReducer;
