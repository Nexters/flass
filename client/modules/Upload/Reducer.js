import * as actions from './Actions';

const initialState = {
  step: 0,
  title: '',
  description: '',
  thumb: actions.NO_THUMB,
  thumbURL: '',
  method: actions.URL_METHOD,
  isGoogleSignedIn: false
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
        thumb: action.thumb,
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
    case actions.SET_GOOGLE_SIGN_IN_STATUS:
      return {
        ...state,
        isGoogleSignedIn: action.isGoogleSignedIn
      };
    default:
      return state;
  }
};

export default UploadReducer;
