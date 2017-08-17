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
