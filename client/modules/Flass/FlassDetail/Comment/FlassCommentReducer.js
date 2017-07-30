import { FETCH_COMMENT, FETCH_COMMENT_SUCCESS, FETCH_COMMENT_ERROR } from './FlassCommentActions';

const initialState = {
  totalCount: 0,
  comments: []
};

const FlassCommentReducer = (state = initialState, action) => {
  console.log(state, action);
  switch(action.type) {
    case FETCH_COMMENT:
      // TODO open loading bar
      return state;
    case FETCH_COMMENT_SUCCESS:
      return {
        ...state,
        totalCount: action.comments.length,
        comments: action.comments
      };
    case FETCH_COMMENT_ERROR:
    // TODO close loading bar
    default:
      return state;
  }
};

export default FlassCommentReducer;
