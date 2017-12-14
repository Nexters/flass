import { call, put, takeLatest } from 'redux-saga/effects';
import _ from 'lodash';
import {
  createReducer
} from '../reducerHelper';
import logger from '../../util/LogUtil';
import agent from '../agent';
import { AnswerBodyAdapter } from '../../RequestBodyAdapter';

export const FETCH_VIDEO = 'FLASS_LECTURE/FETCH_VIDEO';
export function fetchdVideo() {
  return {
    type: FETCH_VIDEO
  };
}

export const UPDATE_SEARCHABLE_SECS = 'UPDATE_SEARCHABLE_SECS';

export function updateSearchableSecs({ searchableSecs }) {
  return {
    type: UPDATE_SEARCHABLE_SECS,
    searchableSecs
  };
}

export const SET_VIDEO_COMPLETE = 'SET_VIDEO_COMPLETE';

export function setCompleteVideoFlag() {
  return {
    type: SET_VIDEO_COMPLETE
  };
}

export const RESET_VIDEO_COMPLETE = 'RESET_VIDEO_COMPLETE';

export function resetCompleteVideoFlag() {
  return {
    type: RESET_VIDEO_COMPLETE
  };
}

export const REQUEST_ON_ENDED = 'REQUEST_ON_ENDED';

const initialState = {
  videoUrl: '',
  searchableSecs: 0,
  isVideoComplete: false
};

const fetchVideoReducer = {
  [FETCH_VIDEO]: (state, { url }) => ({
    ...state,
    videoUrl: url
  })
};

const updateSearchableSecsReducer = {
  [UPDATE_SEARCHABLE_SECS]: (state, { searchableSecs }) => ({
    ...state,
    searchableSecs
  })
};

const updateVideoCompleteReducer = {
  [SET_VIDEO_COMPLETE]: (state, action) => ({
    ...state,
    isVideoComplete: true
  }),
  [RESET_VIDEO_COMPLETE]: (state, action) => ({
    ...state,
    isVideoComplete: false
  })
};

const VideoReducers = createReducer(initialState, {
  ...fetchVideoReducer,
  ...updateSearchableSecsReducer,
  ...updateVideoCompleteReducer
});

export default VideoReducers;

function* requestOnEnded({ solvedQuestionsState, userId, isForExternal }) {
  try {
    if (isSolvedQuestionsExist(solvedQuestionsState)) {
      const id = getQuestionId(solvedQuestionsState);
      const response = yield call(agent.Answer.getAnswerByQuestionId, id);

      if (!isUserIdExist(response, userId) && isForExternal) {
        yield call(solvedQuestionsUploadApi, solvedQuestionsState);
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

function* solvedQuestionsUploadApi(solvedQuestionsState) {
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

export function* rootSaga() {
  yield takeLatest(REQUEST_ON_ENDED, requestOnEnded);
}
