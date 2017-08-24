import { call, put, takeLatest } from 'redux-saga/effects';
import agent from '../../../agent';
import requestBodyAdapter from '../../../../RequestBodyAdapter';
import {
  REQUEST_ON_ENDED
} from './VideoActions';

function* requestOnEnded({ solvedQuestionsState }) {
  for (let i = 0; i < solvedQuestionsState.length; i += 1) {
    const questionId = 1;
    const { indexOfSelectedChoice } = solvedQuestionsState[i];
    const requestBody = requestBodyAdapter.Answer
      .uploadByQuestionId(questionId, indexOfSelectedChoice.toString());

    yield call(agent.Answer.uploadByQuestionId, requestBody);
  }
}

export default function* rootSaga() {
  yield takeLatest(REQUEST_ON_ENDED, requestOnEnded);
}
