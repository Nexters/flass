import _ from 'lodash';
import {
  FETCH_READY_COMMENT,
  FETCH_COMMENT_SUCCESS,
  FETCH_COMMENT_ERROR,
  ADD_READY_COMMENT,
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_ERROR,
  DELETE_COMMENT_SUCCESS,
  DELETE_COMMENT_ERROR
} from './CommentActions';
import { createReducer } from '../../../reduxHelper';

const initialState = {
  comments: [],
  commentchild: {}
};

/*
{
	"comments": [
		{
			"id": 1,
			"user_id": 21,
			"lecture_id": 1,
			"content": "test",
			"created_at": "2017-01-01T00:00:00.000Z",
			"updated_at": "2017-01-01T00:00:00.000Z"
		}
	],
	"commentchild": {
		"1": []
	}
}
 */

const fetchCommentReducer = {
  [FETCH_READY_COMMENT]: (state, action) => state,
  [FETCH_COMMENT_SUCCESS]: (state, action) => ({
    ...state,
    comments: action.comments,
    commentchild: action.commentchild
  }),
  [FETCH_COMMENT_ERROR]: (state, action) => state
};

const addCommentReducer = {
  [ADD_READY_COMMENT]: (state, { parentId, comment }) => {
    if (parentId) {
      const existCommentChild = state.commentchild[parentId] || [];
      return {
        ...state,
        commentchild: {
          ...state.commentchild,
          [parentId]: [comment, ...existCommentChild]
        }
      };
    }
    return ({
      ...state,
      comments: [...state.comments, comment]
    });
  },
  [ADD_COMMENT_SUCCESS]: (state, { parentId, id, newId }) => {
    if (parentId) {
      return {
        ...state,
        commentchild: {
          ...state.commentchild,
          [parentId]: _.map(state.commentchild[parentId] || [],
            comment => (comment.id === id ? { ...comment, id: newId } : comment))
        }
      };
    }
    return {
      ...state,
      comments: _.map(state.comments,
        comment => (comment.id === id ? { ...comment, id: newId } : comment))
    };
  },
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
