import { call, put, takeLatest, take } from 'redux-saga/effects';
import agent from '../../../agent';
import {
  QuestionBodyAdapter,
  ChoiceBodyAdapter
} from '../../../../RequestBodyAdapter';

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
      const { SingleChoiceValues } = questionstate;
      const questionBody = yield call(QuestionBodyAdapter.uploadByQuestionId, lectureId, questionstate);
      const { id } = yield call(agent.Question.uploadByLectureId, questionBody);

      for (let choiceIndex = 0; choiceIndex < SingleChoiceValues.length; choiceIndex += 1) {
        const singleChoiceValues = SingleChoiceValues[choiceIndex];
        const choiceBody = yield call(ChoiceBodyAdapter.upload, id, singleChoiceValues);
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
