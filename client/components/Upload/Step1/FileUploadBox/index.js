import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

// import './infoBox.scss';
import { INIT, FAIL_AUTH, SUCC_AUTH } from '../../../../modules/constants';
import GoogleLogin from './GoogleLogin';
import Uploader from './Uploader';

const propTypes = {
  back: PropTypes.func.isRequired,
  isGoogleAuth: PropTypes.number.isRequired,
  goToGoogleAuthPage: PropTypes.func.isRequired,
  handleYoutubeUpload: PropTypes.func.isRequired,
  uploadStatus: PropTypes.number.isRequired,
  uploadProgress: PropTypes.number.isRequired,
  processProgress: PropTypes.number.isRequired,
  thumbURL: PropTypes.string.isRequired
};

class FileUploadBox extends Component {
  render() {
    const {
      back, isGoogleAuth, goToGoogleAuthPage, handleYoutubeUpload,
      uploadStatus, uploadProgress, processProgress, thumbURL
    } = this.props;

    switch(isGoogleAuth) {
      case FAIL_AUTH:
        return (
          <GoogleLogin
            back={ back }
            goToGoogleAuthPage={ goToGoogleAuthPage } />
        );
      case SUCC_AUTH:
        return (
          <Uploader
            back={ back }
            handleYoutubeUpload={ file => handleYoutubeUpload(file) }
            uploadStatus={ uploadStatus }
            uploadProgress={ uploadProgress }
            processProgress={ processProgress }
            thumbURL={ thumbURL } />
        );
      case INIT:
      default:
        return (
          <div />
        );
    }
  }
}

FileUploadBox.propTypes = propTypes;

export default FileUploadBox;
