import fetch from 'axios';

export const FETCH_COMMENT = 'FETCH_COMMENT';
export const FETCH_COMMENT_SUCCESS = 'FETCH_COMMENT_SUCCESS';
export const FETCH_COMMENT_ERROR = 'FETCH_COMMENT_ERROR';

export const fetchRequestComment = detailId => dispatch => {
  dispatch(() => ({ type: FETCH_COMMENT }));
  fetch('/json/FlassComment.json')
  .then(res => dispatch(fetchCommentSuccess(res.data)))
  .catch(err => dispatch(fetchCommentError(err)));
};

export const fetchCommentSuccess = (comments => ({
  type: FETCH_COMMENT_SUCCESS,
  comments
}));

export const fetchCommentError = err => ({
  type: FETCH_COMMENT_ERROR,
  message: err.message
});

export const ADDD_COMMENT = 'ADD_COMMENT';

export const addComment = (comment) => dispatch => {
  // TODO 낙관적인 업데이트
  dispatch(() => ({ type: ADDD_COMMENT }));
  fetch('/json/FlassComment.json', {
    data: comment
  })
  .then(res => dispatch(fetchCommentSuccess(res.data)))
  .catch(err => dispatch(fetchCommentError(err)));
};
