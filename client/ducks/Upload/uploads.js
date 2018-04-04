import { call, put, takeLatest } from 'redux-saga/effects';
import {
  METHOD_NOT_SELECTED, FILE_METHOD, URL_METHOD,
  NO_URL, FAIL_URL, SUCC_URL,
  FAIL_AUTH, SUCC_AUTH,
  NOT_STARTED, UPLOADING, PROCESSING, COMPLETED,
  STEP_1, INIT
} from '../constants';
import Google from '../Google';
import agent from '../agent';
import {
  LectureBodyAdapter,
  QuestionBodyAdapter,
  ChoiceBodyAdapter
} from '../../RequestBodyAdapter';
import {
  SUCCESS_UPLOAD_QUESTIONS,
  FAIL_UPLOAD_QUESTIONS
} from './uploadInsertionQuizzes';
import { API_ROOT, API_ROOT_FRONT } from '../../config/EnvironmentConfig';
import { createReducer } from '../reducerHelper';

export const SET_STEP = 'SET_STEP';
export const SET_UPLOAD_METHOD = 'SET_UPLOAD_METHOD';
export const SET_VIDEO_INFO = 'SET_VIDEO_INFO';
export const SET_URL_STATUS = 'SET_URL_STATUS';
export const SET_VIDEO_URL = 'SET_VIDEO_URL';
export const SET_THUMB_URL = 'SET_THUMB_URL';
export const SET_GOOGLE_AUTH_STATUS = 'SET_GOOGLE_AUTH_STATUS';
export const SET_UPLOAD_STATUS = 'SET_UPLOAD_STATUS';
export const SET_UPLOAD_PROGRESS = 'SET_UPLOAD_PROGRESS';
export const SET_PROCESS_PROGRESS = 'SET_PROCESS_PROGRESS';

export const setStep = step => ({
  type: SET_STEP,
  step
});

export const setVideoInfo = videoInfo => ({
  type: SET_VIDEO_INFO,
  title: videoInfo.title,
  subject: videoInfo.subject,
  textbook: videoInfo.textbook,
  description: videoInfo.description
});

const setUploadMethod = method => ({
  type: SET_UPLOAD_METHOD,
  method
});

// handles upload method change and takes care of google api set up for accordingly
export const handleSetUploadMethod = method => (dispatch => {
  switch(method) {
    case FILE_METHOD:
      dispatch(initYoutubeUpload());
      break;
    case URL_METHOD:
      Google.initYoutubeThumbnail();
      break;
    default:
      break;
  }
  dispatch(setUploadMethod(method));
});

// checks URL status and retrieves thumbnail url from youtube
export const handleURLCheck = videoURL => (dispatch => {
  let youtubeVideoId = videoURL;
  if (videoURL.length != 11) {
    youtubeVideoId = parseYoutubeVideoId(videoURL);
  }
  let urlStatus = FAIL_URL;
  let thumbURL = '';
  Google.getYoutubeThumbnail(youtubeVideoId)
    .then(({ result }) => {
      if (result.pageInfo.totalResults == 1) {
        urlStatus = SUCC_URL;

        const thumbnails = result.items[0].snippet.thumbnails;
        thumbURL = getBestResolutionThumbnail(thumbnails);
        dispatch(setVideoURL(videoURL));
        dispatch(setThumbURL(thumbURL));
      }
      dispatch(setURLStatus(urlStatus));
    });
});

const getBestResolutionThumbnail = thumbnails => {
  const thumb = thumbnails.maxres || thumbnails.standard || thumbnails.high
    || thumbnails.medium || thumbnails.default;
  return thumb.url;
};

const parseYoutubeVideoId = videoURL => {
  const regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = videoURL.match(regExp);
  return (match && match[2].length == 11) ? match[2] : '';
};

const setVideoURL = videoURL => ({
  type: SET_VIDEO_URL,
  videoURL
});

const setThumbURL = thumbURL => ({
  type: SET_THUMB_URL,
  thumbURL
});

const setURLStatus = urlStatus => ({
  type: SET_URL_STATUS,
  urlStatus
});

export const resetVideo = () => (dispatch => {
  dispatch(setURLStatus(NO_URL));
  dispatch(setVideoURL(''));
  dispatch(setThumbURL(''));
  dispatch(setUploadMethod(METHOD_NOT_SELECTED));
  dispatch(setUploadStatus(NOT_STARTED));
  dispatch(setUploadProgress(0));
  dispatch(setProcessProgress(0));
});

const setGoogleAuthStatus = isGoogleAuth => ({
  type: SET_GOOGLE_AUTH_STATUS,
  isGoogleAuth
});

export const initYoutubeUpload = () => (dispatch => {
  Google.initYoutubeUpload(isGoogleAuth => {
    dispatch(setGoogleAuthStatus(isGoogleAuth ? SUCC_AUTH : FAIL_AUTH));
  });
});

export const goToGoogleAuthPage = () => (() => {
  Google.authorize();
});

const setUploadStatus = uploadStatus => ({
  type: SET_UPLOAD_STATUS,
  uploadStatus
});

const setUploadProgress = uploadProgress => ({
  type: SET_UPLOAD_PROGRESS,
  uploadProgress
});

const setProcessProgress = processProgress => ({
  type: SET_PROCESS_PROGRESS,
  processProgress
});

export const uploadYoutubeVideo = file => (dispatch => {
  dispatch(setUploadStatus(UPLOADING));

  const handleUploading = uploadProgress => {
    dispatch(setUploadProgress(uploadProgress));
  };
  const handleUploadingFinished = () => {
    dispatch(setUploadStatus(PROCESSING));
  };
  const handleProcessing = processProgress => {
    dispatch(setProcessProgress(processProgress));
  };
  const handleProcessingFinished = (videoId, thumbnails) => {
    dispatch(setVideoURL(`https://www.youtube.com/watch?v=${videoId}`));
    const thumbnail = getBestResolutionThumbnail(thumbnails);
    dispatch(setThumbURL(thumbnail));
    dispatch(setUploadStatus(COMPLETED));
    dispatch(setURLStatus(SUCC_URL));
  };
  Google.uploadVideo(
    file, handleUploading, handleUploadingFinished,
    handleProcessing, handleProcessingFinished
  );
});

export const UPLOAD_LECTURE_AND_QUESTIONS = 'UPLOAD_LECTURE_AND_QUESTIONS';

export const INIT_UPLOAD_STATES = 'INIT_UPLOAD_STATES';

const initialState = {
  step: STEP_1,
  title: '',
  subject: '',
  textbook: '',
  description: '',
  videoURL: '',
  urlStatus: NO_URL,
  thumbURL: '',
  method: METHOD_NOT_SELECTED,
  isGoogleAuth: INIT,
  uploadStatus: NOT_STARTED,
  uploadProgress: 0,
  processProgress: 0
};


const UploadReducer = {
  [SET_STEP]: (state, action) => ({
    ...state,
    step: action.step
  }),
  [SET_UPLOAD_METHOD]: (state, action) => ({
    ...state,
    method: action.method
  }),
  [SET_VIDEO_INFO]: (state, action) => ({
    ...state,
    title: action.title,
    subject: action.subject,
    textbook: action.textbook,
    description: action.description
  }),
  [SET_URL_STATUS]: (state, action) => ({
    ...state,
    urlStatus: action.urlStatus
  }),
  [SET_VIDEO_URL]: (state, action) => ({
    ...state,
    videoURL: action.videoURL
  }),
  [SET_THUMB_URL]: (state, action) => ({
    ...state,
    thumbURL: action.thumbURL
  }),
  [SET_GOOGLE_AUTH_STATUS]: (state, action) => ({
    ...state,
    isGoogleAuth: action.isGoogleAuth
  }),
  [SET_UPLOAD_STATUS]: (state, action) => ({
    ...state,
    uploadStatus: action.uploadStatus
  }),
  [SET_UPLOAD_PROGRESS]: (state, action) => ({
    ...state,
    uploadProgress: action.uploadProgress
  }),
  [SET_PROCESS_PROGRESS]: (state, action) => ({
    ...state,
    processProgress: action.processProgress
  }),
  [INIT_UPLOAD_STATES]: (state, action) => ({
    ...initialState
  })
};

export default createReducer(initialState, {
  ...UploadReducer
});

function* uploadLectureAndQuestions({
  questionState,
  title,
  description,
  subject,
  textbook,
  videoURL,
  thumbURL
}) {
  try {
    const lectureBody = yield call(LectureBodyAdapter.upload, {
      questionState,
      title,
      description,
      subject,
      textbook,
      videoURL,
      thumbURL
    });

    const lectureResponse = yield call(agent.Lecture.upload, lectureBody);
    const lectureUrl = `${API_ROOT_FRONT}/v/${lectureResponse.id}`;
    const urlResponse = yield call(agent.Google.getShortUrl, lectureUrl);
    yield call(agent.Lecture.putShortenUrl, lectureResponse.id, urlResponse.id);
    yield call(uploadQuestionApi, lectureResponse, questionState);

    yield put({
      type: SUCCESS_UPLOAD_QUESTIONS,
      payload: {
        lectureUrl: urlResponse.id
      }
    });
  } catch (error) {
    yield put({ type: FAIL_UPLOAD_QUESTIONS, error });
  }
}

function* uploadQuestionApi(lectureResponse, questionState) {
  for (let qIndex = 0; qIndex < questionState.length; qIndex += 1) {
    const questionstate = questionState[qIndex];
    const questionBody = yield call(
      QuestionBodyAdapter.uploadByQuestionId,
      lectureResponse.id,
      questionstate
    );
    const questionResponse = yield call(agent.Question.uploadByLectureId, questionBody);

    const { SingleChoiceValues } = questionstate;

    for (let cIndex = 0; cIndex < SingleChoiceValues.length; cIndex += 1) {
      const singleChoiceValues = SingleChoiceValues[cIndex];
      const choiceBody = yield call(
        ChoiceBodyAdapter.upload,
        questionResponse.id,
        singleChoiceValues
      );
      yield call(agent.Choice.upload, choiceBody);
    }
  }
}

export function* rootSaga() {
  yield takeLatest(UPLOAD_LECTURE_AND_QUESTIONS, uploadLectureAndQuestions);
}
