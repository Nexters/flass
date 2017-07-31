import { FETCH_READY_COMMENT, FETCH_COMMENT_SUCCESS, FETCH_COMMENT_ERROR } from './CommentActions';

const initialState = {
  totalCount: 0,
  comments: []
};

const CommentReducer = (state = initialState, action) => {
  switch(action.type) {
    case FETCH_COMMENT_SUCCESS:
      return {
        ...state,
        totalCount: action.comments.length,
        comments: action.comments
      };
    case FETCH_COMMENT_ERROR:
    case FETCH_READY_COMMENT:
    default:
      return state;
  }
};

export default CommentReducer;
