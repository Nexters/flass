import fetch from 'axios';
import { call, fork, take, select, put, cancel, takeLatest } from 'redux-saga/effects';

export const FETCH_QUESTION = 'FETCH_QUESTION';
export const FETCH_READY_QUESTION = 'FETCH_READY_QUESTION';
export const FETCH_QUESTION_SUCCESS = 'FETCH_QUESTION_SUCCESS';
export const FETCH_QUESTION_ERROR = 'FETCH_QUESTION_ERROR';

function* fetchRequestQuestion({ detailId }) {
  yield put({ type: FETCH_READY_QUESTION });

  try {
    const response = yield call(fetch, '/json/FlassQuestion.json');
    yield put({
      type: FETCH_QUESTION_SUCCESS,
      questions: response.data
    });
  } catch (err) {
    yield put({
      type: FETCH_QUESTION_ERROR,
      message: err.message
    });
  }
}

export const ADDD_QUESTION = 'ADD_QUESTION';

export const addQuestion = question => dispatch => {
  // TODO
  dispatch(() => ({ type: ADDD_QUESTION }));
  fetch('/json/FlassQuestion.json', {
    data: question
  })
  .then(res => dispatch(fetchQuestionSuccess(res.data)))
  .catch(err => dispatch(fetchQuestionError(err)));
};

export default function* rootSaga() {
  yield takeLatest(FETCH_QUESTION, fetchRequestQuestion);
}