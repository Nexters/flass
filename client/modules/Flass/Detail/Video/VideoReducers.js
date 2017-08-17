import _ from 'lodash';
import {
  FETCH_VIDEO,
  SOLVED_ONE_QUESTION
} from './VideoActions';

const INITIAL_STATE = {
  videoUrl: '',
  solvedQuestionsState: []
};

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case FETCH_VIDEO: {
      console.log('HEY!');
      return {
        ...state,
        videoUrl: 'https://www.youtube.com/watch?v=PTkKJI27NlE'
      };
    }

    case SOLVED_ONE_QUESTION: {
      const { indexOfQuestion, isCorrect, indexOfSelectedChoice, indexOfAnswer } = action.payload;

      return {
        ...state,
        solvedQuestionsState: _.concat(
          state.solvedQuestionsState,
          { indexOfQuestion, isCorrect, indexOfSelectedChoice, indexOfAnswer }
        )
      };
    }
    default:
      return state;
  }
}
