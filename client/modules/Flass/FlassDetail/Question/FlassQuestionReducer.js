import { FETCH_QUESTION, FETCH_QUESTION_SUCCESS, FETCH_QUESTION_ERROR } from './FlassQuestionActions';

const initialState = {
  totalCount: 0,
  questions: []
};

const FlassQuestionReducer = (state = initialState, action) => {
  switch(action.type) {
    case FETCH_QUESTION:
      // TODO open loading bar
      return state;
    case FETCH_QUESTION_SUCCESS:
      return {
        ...state,
        questions: action.questions
      };
    case FETCH_QUESTION_ERROR:
    // TODO close loading bar
    default:
      return state;
  }
};

export default FlassQuestionReducer;
