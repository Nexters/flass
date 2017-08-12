import * as actions from './Actions';

const initialState = {
  step: 0,
  title: '',
  description: '',
  thumbStatus: actions.NO_THUMB,
  thumbURL: '',
  method: actions.URL_METHOD,
  isGoogleAuth: null
};

const UploadReducer = (state = initialState, action) => {
  switch(action.type) {
    case actions.SET_STEP:
      return {
        ...state,
        step: action.step
      };
    case actions.SET_VIDEO_DATA:
      return {
        ...state,
        title: action.title,
        description: action.description
      };
    case actions.SET_THUMB_URL:
      return {
        ...state,
        thumbStatus: action.thumbStatus,
        thumbURL: action.thumbURL
      };
    case actions.SET_VIDEO_URL:
      return {
        ...state,
        videoURL: action.videoURL
      };
    case actions.SET_UPLOAD_METHOD:
      return {
        ...state,
        method: action.method
      };
    case actions.SET_GOOGLE_AUTH_STATUS:
      return {
        ...state,
        isGoogleAuth: action.isGoogleAuth
      };
    default:
      return state;
  }
};

export default UploadReducer;
