import fetch from 'axios';
import { call, fork, take, select, put, cancel, takeLatest } from 'redux-saga/effects';

export const FETCH_COMMENT = 'FETCH_COMMENT';
export const FETCH_READY_COMMENT = 'FETCH_READY_COMMENT';
export const FETCH_COMMENT_SUCCESS = 'FETCH_COMMENT_SUCCESS';
export const FETCH_COMMENT_ERROR = 'FETCH_COMMENT_ERROR';

function* fetchRequestComment({ detailId }) {
  yield put({ type: FETCH_READY_COMMENT });

  try {
    const response = yield call(fetch, '/json/FlassComment.json');
    yield put({
      type: FETCH_COMMENT_SUCCESS,
      comments: response.data
    });
  } catch (err) {
    yield put({
      type: FETCH_COMMENT_ERROR,
      message: err.message
    });
  }
}

export const ADDD_COMMENT = 'ADD_COMMENT';

export const addComment = comment => dispatch => {
  // TODO 낙관적인 업데이트
  dispatch(() => ({ type: ADDD_COMMENT }));
  fetch('/json/FlassComment.json', {
    data: comment
  })
  .then(res => dispatch(fetchCommentSuccess(res.data)))
  .catch(err => dispatch(fetchCommentError(err)));
};

export default function* rootSaga() {
  yield takeLatest(FETCH_COMMENT, fetchRequestComment);
}
