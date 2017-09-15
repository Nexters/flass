import { call, put, takeLatest } from 'redux-saga/effects';
import agent from '../../../agent';
import { AnswerBodyAdapter } from '../../../../RequestBodyAdapter';
import {
  REQUEST_ON_ENDED
} from './actions';

function* requestOnEnded({ solvedQuestionsState }) {
  for (let i = 0; i < solvedQuestionsState.length; i += 1) {
    const { id, indexOfSelectedChoice } = solvedQuestionsState[i];
    const requestBody = yield call(
      AnswerBodyAdapter.uploadByQuestionId,
      id,
      indexOfSelectedChoice.toString()
    );

    yield call(agent.Answer.uploadByQuestionId, requestBody);
  }
}

export default function* rootSaga() {
  yield takeLatest(REQUEST_ON_ENDED, requestOnEnded);
}
