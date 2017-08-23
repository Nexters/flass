import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

// import './infoBox.scss';
import GoogleLogin from './GoogleLogin';
import Uploader from './Uploader';

const propTypes = {
  back: PropTypes.func.isRequired,
  isGoogleAuth: PropTypes.bool.isRequired,
  goToGoogleAuthPage: PropTypes.func.isRequired,
  handleYoutubeUpload: PropTypes.func.isRequired
};

class FileUploadBox extends Component {
  render() {
    const { back, isGoogleAuth, goToGoogleAuthPage, handleYoutubeUpload } = this.props;

    if (!isGoogleAuth) {
      return (
        <GoogleLogin
          back={ back }
          goToGoogleAuthPage={ goToGoogleAuthPage } />
      );
    } else {
      return (
        <Uploader
          back={ back }
          handleYoutubeUpload={ file => handleYoutubeUpload(file) } />
      );
    }
  }
}

FileUploadBox.propTypes = propTypes;

export default FileUploadBox;
