import {
  LOAD_VIDEO
} from './VideoActions';

const INITIAL_STATE = {
  videoUrl: ''
};

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case LOAD_VIDEO:
      return {
        ...state,
        videoUrl: 'https://www.youtube.com/watch?v=PTkKJI27NlE'
      };
    default:
      return state;
  }
}
