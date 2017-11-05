import { call, fork, take, select, put, cancel, takeLatest } from 'redux-saga/effects';
import agent from '../../../agent';
import {
  FETCH_QUESTION,
  FETCH_QUESTION_ERROR, FETCH_QUESTION_SUCCESS,
  FETCH_READY_QUESTION,
} from './actions';
import { QuestionResDataAdapter } from '../../../../ResponseDataAdapter';

function* fetchQuestion({ lectureId }) {
  yield put({ type: FETCH_READY_QUESTION });

  try {
    const questions = yield call(agent.Question.byLectureId, lectureId);
    const questionsPayload = yield call(fetchChoiceApi, questions);

    yield put({
      type: FETCH_QUESTION_SUCCESS,
      questions: questionsPayload
    });
  } catch (err) {
    yield put({
      type: FETCH_QUESTION_ERROR,
      message: err.message
    });
  }
}

function* fetchChoiceApi(questions) {
  const questionsPayload = {
    textStateOfQuestions: [],
    secsStateOfQuestions: []
  };
  
  for (let qIndex = 0; qIndex < questions.length; qIndex += 1) {
    const question = questions[qIndex];
    const choices = yield call(agent.Choice.fetch, question.id);
    const questionState = yield call(
      QuestionResDataAdapter.fetch,
      question,
      choices,
      qIndex
    );
    questionsPayload.textStateOfQuestions.push(questionState.textStateOfQuestions);
    questionsPayload.secsStateOfQuestions.push(questionState.secsStateOfQuestions);
  }

  return questionsPayload;
}

export default function* rootSaga() {
  yield takeLatest(FETCH_QUESTION, fetchQuestion);
}
