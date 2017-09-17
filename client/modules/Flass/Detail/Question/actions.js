import fetch from 'axios';

export const FETCH_QUESTION = 'FETCH_QUESTION';
export const FETCH_READY_QUESTION = 'FETCH_READY_QUESTION';
export const FETCH_QUESTION_SUCCESS = 'FETCH_QUESTION_SUCCESS';
export const FETCH_QUESTION_ERROR = 'FETCH_QUESTION_ERROR';

export const ADD_QUESTION = 'ADD_QUESTION';

export const UPDATE_SOLVED_QUESTION = 'UPDATE_SOLVED_QUESTION';

export function updateSolvedQuestion({ id, indexOfQuestion, isCorrect, indexOfSelectedChoice, indexOfAnswer }) {
  return {
    type: UPDATE_SOLVED_QUESTION,
    payload: { id, indexOfQuestion, isCorrect, indexOfSelectedChoice, indexOfAnswer }
  };
}
