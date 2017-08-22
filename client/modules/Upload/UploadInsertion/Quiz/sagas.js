import { call, put, takeLatest } from 'redux-saga/effects';
import {
  REQUEST_UPLOAD_QUESTIONS,
  SUCCESS_UPLOAD_QUESTIONS,
  FAIL_UPLOAD_QUESTIONS
} from './QuizActions';

function* requestUploadQuestions({ questionState }) {
  console.log('questionState');
  console.log(questionState);
  try {
    yield put({ type: SUCCESS_UPLOAD_QUESTIONS });
  } catch (error) {
    yield put({ type: FAIL_UPLOAD_QUESTIONS, error });
  }
}

export default function* rootSaga() {
  yield takeLatest(REQUEST_UPLOAD_QUESTIONS, requestUploadQuestions);
}
