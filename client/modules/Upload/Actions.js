import Google from '../Google';

export const SET_STEP = 'SET_STEP';
export const SET_VIDEO_DATA = 'SET_VIDEO_DATA';
export const SET_VIDEO_URL = 'SET_VIDEO_URL';
export const SET_THUMB_URL = 'SET_THUMB_URL';
export const SET_UPLOAD_METHOD = 'SET_UPLOAD_METHOD';
export const CHANGE_UPLOAD_METHOD = 'CHANGE_UPLOAD_METHOD';
export const SET_GOOGLE_AUTH_STATUS = 'SET_GOOGLE_AUTH_STATUS';

export const NO_THUMB = 0;
export const SUCC_THUMB = 1;
export const FAIL_THUMB = -1;

export const URL_METHOD = 0;
export const FILE_METHOD = 1;

export const setStep = step => ({
  type: SET_STEP,
  step
});

export const setVideoData = (title, description) => ({
  type: SET_VIDEO_DATA,
  title,
  description
});

export const setThumbURL = (thumb, thumbURL) => ({
  type: SET_THUMB_URL,
  thumb,
  thumbURL
});

export const setVideoURL = videoURL => ({
  type: SET_VIDEO_URL,
  videoURL
});

const setUploadMethod = method => ({
  type: SET_UPLOAD_METHOD,
  method
});

// changes upload method and takes care of google api set up for the change
export const changeUploadMethod = method => (dispatch => {
  switch(method) {
    case URL_METHOD:
      Google.initThumbClient();
      break;
    case FILE_METHOD:
    default:
      Google.initUploadClient();
  }
  dispatch(setUploadMethod(method));
});

export const getThumbnail = videoURL => (dispatch => {
  const youtubeVideoId = parseYoutubeVideoId(videoURL);
  let thumb = FAIL_THUMB;
  let thumbURL = '';
  Google.requestThumbClient(youtubeVideoId)
  .then(({ result }) => {
    if (result.pageInfo.totalResults == 1) {
      thumb = SUCC_THUMB;
      thumbURL = result.items[0].snippet.thumbnails.high.url;
      dispatch(setVideoURL(videoURL));
    }
    dispatch(setThumbURL(thumb, thumbURL));
  });
});

const parseYoutubeVideoId = videoURL => {
  const regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = videoURL.match(regExp);
  return (match && match[2].length == 11) ? match[2] : '';
};

export const resetVideo = () => (dispatch => {
  dispatch(setVideoURL(''));
  dispatch(setThumbURL(NO_THUMB, ''));
});

const setGoogleAuthStatus = isGoogleAuth => ({
  type: SET_GOOGLE_AUTH_STATUS,
  isGoogleAuth
});

export const initYoutubeUpload = () => (async dispatch => {
  const isGoogleAuth = await Google.initUploadClient();
  dispatch(setGoogleAuthStatus(isGoogleAuth));
});

export const goToGoogleAuthPage = () => (() => {
  Google.authenticate();
});
