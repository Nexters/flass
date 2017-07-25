import fetch from 'axios';

export const FETCH_QUESTION = 'FETCH_QUESTION';
export const FETCH_QUESTION_SUCCESS = 'FETCH_QUESTION_SUCCESS';
export const FETCH_QUESTION_ERROR = 'FETCH_QUESTION_ERROR';

export const fetchRequestQuestion = detailId => dispatch => {
  dispatch(() => ({ type: FETCH_QUESTION }));
  fetch('/json/FlassQuestion.json')
  .then(res => dispatch(fetchQuestionSuccess(res.data)))
  .catch(err => dispatch(fetchQuestionError(err)));
};

export const fetchQuestionSuccess = (questions => ({
  type: FETCH_QUESTION_SUCCESS,
  questions
}));

export const fetchQuestionError = err => ({
  type: FETCH_QUESTION_ERROR,
  message: err.message
});

export const ADDD_QUESTION = 'ADD_QUESTION';

export const addQuestion = (question) => dispatch => {
  // TODO
  dispatch(() => ({ type: ADDD_QUESTION }));
  fetch('/json/FlassQuestion.json', {
    data: question
  })
  .then(res => dispatch(fetchQuestionSuccess(res.data)))
  .catch(err => dispatch(fetchQuestionError(err)));
};
