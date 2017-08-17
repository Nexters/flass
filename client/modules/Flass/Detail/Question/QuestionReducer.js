import { FETCH_READY_QUESTION, FETCH_QUESTION_SUCCESS, FETCH_QUESTION_ERROR } from './QuestionActions';

const initialState = {
  totalCount: 0,
  questions: {}
};

const QuestionReducer = (state = initialState, action) => {
  switch(action.type) {
    case FETCH_QUESTION_SUCCESS:
      return {
        ...state,
        questions: action.questions
      };
    case FETCH_READY_QUESTION:
    case FETCH_QUESTION_ERROR:
    default:
      return state;
  }
};

export default QuestionReducer;
