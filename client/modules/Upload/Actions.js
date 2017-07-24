import axios from 'axios';

import { GOOGLE_API_KEY } from '../../../config/Constants';

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
  let thumbURL = '';
  axios.get('https://www.googleapis.com/youtube/v3/videos', {
    params: {
      id: youtubeVideoId,
      part: 'snippet',
      key: GOOGLE_API_KEY
    }
  }).then(({ data }) => {
    // video doesn't exist
    if(data.pageInfo.totalResults != 1) {
      throw error;
    }
    // video exists
    thumbURL = data.items[0].snippet.thumbnails.standard.url;
    dispatch(setVideoURL(videoURL));
  }).catch(error => {
    thumb = failThumb;
  }).then(() => {
    dispatch(setThumbURL(thumb, thumbURL));
  });
});

const parseYoutubeVideoId = videoURL => {
  const regExp = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/ ]{11})/i;
  const match = videoURL.match(regExp);
  return (match && match[1].length == 11) ? match[1] : '';
};
