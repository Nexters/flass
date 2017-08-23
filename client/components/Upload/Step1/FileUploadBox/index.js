import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

// import './infoBox.scss';
import { INIT, FAIL_AUTH, SUCC_AUTH } from '../../../../modules/Constants';
import GoogleLogin from './GoogleLogin';
import Uploader from './Uploader';

const propTypes = {
  back: PropTypes.func.isRequired,
  isGoogleAuth: PropTypes.number.isRequired,
  goToGoogleAuthPage: PropTypes.func.isRequired,
  handleYoutubeUpload: PropTypes.func.isRequired
};

class FileUploadBox extends Component {
  render() {
    const { back, isGoogleAuth, goToGoogleAuthPage, handleYoutubeUpload } = this.props;

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
            handleYoutubeUpload={ file => handleYoutubeUpload(file) } />
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
