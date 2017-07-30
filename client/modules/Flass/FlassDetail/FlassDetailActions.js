import fetch from 'axios';
import { fetchRequestComment } from './Comment/CommentActions';
import { fetchRequestQuestion } from './Question/QuestionActions';

export const FETCH_DETAIL = 'FETCH_DETAIL';
export const FETCH_DETAIL_SUCCESS = 'FETCH_DETAIL_SUCCESS';
export const FETCH_DETAIL_ERROR = 'FETCH_DETAIL_ERROR';

export const fetchRequestDetailAll = detailId => dispatch => {
  dispatch(() => ({ type: FETCH_DETAIL }));
  return fetch.all([
    fetch('/json/FlassDetail.json'),
    dispatch(fetchRequestQuestion(detailId)),
    dispatch(fetchRequestComment(detailId))])
      .then(res => {
        dispatch(fetchDetailSuccess(res[0].data));
      })
      .catch(err => dispatch(fetchDetailError(err)));
};

export const fetchRequestDetail = detailId => dispatch => {
  dispatch(() => ({ type: FETCH_DETAIL }));
  return fetch('/json/FlassDetail.json')
    .then(res => dispatch(fetchDetailSuccess(res.data)))
    .catch(err => dispatch(fetchDetailError(err)));
};

export const fetchDetailSuccess = (detail => ({
  type: FETCH_DETAIL_SUCCESS,
  detail
}));

export const fetchDetailError = err => ({
  type: FETCH_DETAIL_ERROR,
  message: err.message
});
