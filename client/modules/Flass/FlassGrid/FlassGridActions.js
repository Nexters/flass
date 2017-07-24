import fetch from 'axios';

export const FETCH_MY_CHANNEL = 'FETCH_MY_CHANNEL';
export const FETCH_MY_CHANNEL_SUCCESS = 'FETCH_MY_CHANNEL_SUCCESS';
export const FETCH_MY_CHANNEL_ERROR = 'FETCH_MY_CHANNEL_ERROR';

export const fetchRequestMyChannelItems = userId => dispatch => {
  dispatch(() => ({ type: FETCH_MY_CHANNEL }));
  fetch('/json/FlassGrid.json')
      .then(res => dispatch(fetchMyChannelSuccess(res.data)))
      .catch(err => dispatch(fetchMyChannelError(err)));
};

export const fetchMyChannelSuccess = (items => ({
  type: FETCH_MY_CHANNEL_SUCCESS,
  items
}));

export const fetchMyChannelError = err => ({
  type: FETCH_MY_CHANNEL_ERROR,
  message: err.message
});
