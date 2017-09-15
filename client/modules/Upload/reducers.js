import * as actions from './actions';
import { STEP_1, NO_URL, METHOD_NOT_SELECTED, INIT, NOT_STARTED } from '../constants';

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

const UploadReducer = (state = initialState, action) => {
  switch(action.type) {
    case actions.SET_STEP:
      return {
        ...state,
        step: action.step
      };
    case actions.SET_UPLOAD_METHOD:
      return {
        ...state,
        method: action.method
      };
    case actions.SET_VIDEO_INFO:
      return {
        ...state,
        title: action.title,
        subject: action.subject,
        textbook: action.textbook,
        description: action.description
      };
    case actions.SET_URL_STATUS:
      return {
        ...state,
        urlStatus: action.urlStatus
      };
    case actions.SET_VIDEO_URL:
      return {
        ...state,
        videoURL: action.videoURL
      };
    case actions.SET_THUMB_URL:
      return {
        ...state,
        thumbURL: action.thumbURL
      };
    case actions.SET_GOOGLE_AUTH_STATUS:
      return {
        ...state,
        isGoogleAuth: action.isGoogleAuth
      };
    case actions.SET_UPLOAD_STATUS:
      return {
        ...state,
        uploadStatus: action.uploadStatus
      };
    case actions.SET_UPLOAD_PROGRESS:
      return {
        ...state,
        uploadProgress: action.uploadProgress
      };
    case actions.SET_PROCESS_PROGRESS:
      return {
        ...state,
        processProgress: action.processProgress
      };
    default:
      return state;
  }
};

export default UploadReducer;
