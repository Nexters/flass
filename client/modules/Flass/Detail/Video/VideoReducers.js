import _ from 'lodash';
import {
  createReducer
} from '../../../reducerHelper';
import {
  FETCH_VIDEO,
  UPDATE_SEARCHABLE_SECS
} from './VideoActions';

const initialState = {
  videoUrl: '',
  searchableSecs: 0
};

const fetchVideoReducer = {
  [FETCH_VIDEO]: (state, action) => ({
    ...state,
    videoUrl: 'https://www.youtube.com/watch?v=PTkKJI27NlE'
  })
};

const updateSearchableSecsReducer = {
  [UPDATE_SEARCHABLE_SECS]: (state, { searchableSecs }) => ({
    ...state,
    searchableSecs
  })
};

const VideoReducers = createReducer(initialState, {
  ...fetchVideoReducer,
  ...updateSearchableSecsReducer
});

export default VideoReducers;
