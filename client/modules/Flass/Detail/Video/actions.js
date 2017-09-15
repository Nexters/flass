export const FETCH_VIDEO = 'flassdetail/fetch_video';

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
