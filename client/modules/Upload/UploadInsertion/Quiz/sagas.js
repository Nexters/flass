import { call, put, takeLatest } from 'redux-saga/effects';
import agent from '../../../agent';
import requestBodyAdapter from '../../../../RequestBodyAdapter';
import {
  REQUEST_UPLOAD_QUESTIONS,
  SUCCESS_UPLOAD_QUESTIONS,
  FAIL_UPLOAD_QUESTIONS
} from './QuizActions';

function* requestUploadQuestions({ questionState }) {
  const lectureId = 2;

  try {
    for (let questionIndex = 0; questionIndex < questionState.length; questionIndex += 1) {
      const questionstate = questionState[questionIndex];
      const { SingleChoiceValues } = questionState;
      const questionBody = requestBodyAdapter.Question.uploadByQuestionId(lectureId, questionstate);

      const { id } = yield call(agent.Question.uploadByLectureId, questionBody);

      for (let choiceIndex = 0; i < SingleChoiceValues.length; choiceIndex += 1) {
        const singleChoiceValues = SingleChoiceValues[choiceIndex];
        const choiceBody = requestBodyAdapter.Choice.upload(id, singleChoiceValues);

        yield call(agent.Choice.upload, choiceBody);
      }
    }
    yield put({ type: SUCCESS_UPLOAD_QUESTIONS });
  } catch (error) {
    yield put({ type: FAIL_UPLOAD_QUESTIONS, error });
  }
}

export default function* rootSaga() {
  yield takeLatest(REQUEST_UPLOAD_QUESTIONS, requestUploadQuestions);
}
