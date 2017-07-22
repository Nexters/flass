import * as actions from './Actions';

const initialState = {
  step: 0,
  title: '',
  description: ''
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
    default:
      return state;
  }
};

export default UploadReducer;
