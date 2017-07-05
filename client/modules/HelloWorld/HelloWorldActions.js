/**
 * @fileOverview Server Timestamp related actions.
 */

import axios from 'axios';

export const SERVER_TIMESTAMP_UPDATE = 'SERVER_TIMESTAMP_UPDATE';

/**
 * Update server timestamp.
 *
 * @return {Function} The action handler.
 */
export const fetchServerTimestamp = () => {
  return function(dispatch) {
    axios.get('/home/timestamp')
      .then((res) => {
        dispatch({
          type: SERVER_TIMESTAMP_UPDATE,
          timestamp: res.data.timestamp,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
