import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { NO_URL, SUCC_URL, FAIL_URL } from '../../../../../ducks/constants';
import URLSuccess from './URLSuccess';
import URLUpload from './URLUpload';

const propTypes = {
  back: PropTypes.func.isRequired,
  urlStatus: PropTypes.number.isRequired,
  handleURLCheck: PropTypes.func.isRequired,
  thumbURL: PropTypes.string.isRequired
};

class URLUploadBox extends Component {
  render() {
    const {
      back, urlStatus, handleURLCheck, thumbURL
    } = this.props;

    switch(urlStatus) {
      case SUCC_URL:
        return (
          <URLSuccess
            back={ back }
            thumbURL={ thumbURL } />
        );
      case NO_URL:
      case FAIL_URL:
      default:
        return (
          <URLUpload
            back={ back }
            urlStatus={ urlStatus }
            handleURLCheck={ videoURL => handleURLCheck(videoURL) } />
        );
    }
  }
}

URLUploadBox.propTypes = propTypes;

export default URLUploadBox;
