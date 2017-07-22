import * as actions from './Actions';

const initialState = {
  step: 0
};

const UploadReducer = (state = initialState, action) => {
  switch(action.type) {
    case actions.SET_STEP:
      return {
        ...state,
        step: action.step
      };
    default:
      return state;
  }
};

export default UploadReducer;
