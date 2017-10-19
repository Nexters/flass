import { call, put, takeLatest } from 'redux-saga/effects';
import logger from '../../../../util/LogUtil';
import agent from '../../../agent';
import { AnswerBodyAdapter } from '../../../../RequestBodyAdapter';
import {
  REQUEST_ON_ENDED
} from './actions';

function* requestOnEnded({ solvedQuestionsState, userId, isForExternal }) {
  try {
    if (isSolvedQuestionsExist(solvedQuestionsState)) {
      const id = getQuestionId(solvedQuestionsState);
      const response = yield call(agent.Answer.getAnswerByQuestionId, id);
      if (!isUserIdExist(response, userId) && isForExternal) {
        for (let i = 0; i < solvedQuestionsState.length; i += 1) {
          const { id, indexOfSelectedChoice } = solvedQuestionsState[i];
          const requestBody = yield call(
            AnswerBodyAdapter.uploadByQuestionId,
            id,
            indexOfSelectedChoice.toString()
          );

          yield call(agent.Answer.uploadByQuestionId, requestBody);
        }
      } else {
        !isForExternal ?
          logger.log('This is not external access') :
          logger.log('User already solved questions');
      }
    }
  } catch (e) {
    logger.error(e);
  }
}

function isSolvedQuestionsExist(solvedQuestions) {
  return solvedQuestions.length > 0;
}

function getQuestionId(questions) {
  return questions[0].id;
}

function isUserIdExist(answers, userId) {
  const filteredAnswers = answers.filter(answer => answer.user_id === userId);
  return filteredAnswers.length > 0;
}

export default function* rootSaga() {
  yield takeLatest(REQUEST_ON_ENDED, requestOnEnded);
}
