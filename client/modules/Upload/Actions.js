export const SET_STEP = 'SET_STEP';
export const SET_VIDEO_DATA = 'SET_VIDEO_DATA';
export const SET_VIDEO_URL = 'SET_VIDEO_URL';
export const SET_THUMB_URL = 'SET_THUMB_URL';

export const noThumb = 0;
export const succThumb = 1;
export const failThumb = -1;

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

export const displayVideoPreview = videoURL => (dispatch => {
  const youtubeVideoId = parseYoutubeVideoId(videoURL);
  let thumb = succThumb;
  if (!youtubeVideoId) {
    thumb = failThumb;
  }
  const thumbURL = `https://img.youtube.com/vi/${youtubeVideoId}/0.jpg`;
  dispatch(setThumbURL(thumb, thumbURL));
  dispatch(setVideoURL(videoURL));
});

const parseYoutubeVideoId = videoURL => {
  const regExp = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/ ]{11})/i;
  const match = videoURL.match(regExp);
  return (match && match[1].length == 11) ? match[1] : false;
};
