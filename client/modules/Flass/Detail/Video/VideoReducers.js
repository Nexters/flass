import _ from 'lodash';
import {
  createReducer
} from '../../../reducerHelper';
import {
  FETCH_VIDEO,
  UPDATE_SEARCHABLE_SECS,
  SET_VIDEO_COMPLETE,
  RESET_VIDEO_COMPLETE
} from './VideoActions';

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
  [UPDATE_SEARCHABLE_SECS]: (state, { searchableSecs }) => {
    return ({
      ...state,
      searchableSecs
    });
  }
};

const updateVideoCompleteReducer = {
  [SET_VIDEO_COMPLETE]: (state, action) => {
    return {
      ...state,
      isVideoComplete: true
    };
  },
  [RESET_VIDEO_COMPLETE]: (state, action) => {
    return {
      ...state,
      isVideoComplete: false
    }
  }
};

const VideoReducers = createReducer(initialState, {
  ...fetchVideoReducer,
  ...updateSearchableSecsReducer,
  ...updateVideoCompleteReducer
});

export default VideoReducers;
