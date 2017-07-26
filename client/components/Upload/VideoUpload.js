import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import SelectField from 'material-ui/SelectField';
import MenuItem  from 'material-ui/MenuItem';
import Dialog from 'material-ui/Dialog';
import PropTypes from 'prop-types';

import * as actions from '../../modules/Upload/Actions';

import './upload.scss';

const propTypes = {
  handleNext: PropTypes.func,
  handleVideoURL: PropTypes.func,
  thumb: PropTypes.number.isRequired,
  thumbURL: PropTypes.string.isRequired,
  method: PropTypes.number.isRequired,
  setUploadMethod: PropTypes.func,
  resetVideo: PropTypes.func,
  isGoogleSignedIn: PropTypes.bool.isRequired,
  initYoutubeUpload: PropTypes.func,
  signIn: PropTypes.func
};
const defaultProps = {
  handleNext: () => handleError('handleNext'),
  handleVideoURL: () => handleError('handleVideoURL'),
  setUploadMethod: () => handleError('setUploadMethod'),
  resetVideo: () => handleError('resetVideo'),
  initYoutubeUpload: () => handleError('initYoutubeUpload'),
  signIn: () => handleError('signIn')
};

function handleError(func) {
  console.error(`${func} is not defined`);
}

class VideoUpload extends Component {
  state = {
    title: '',
    description: '',
    videoURL: '',
    dialog: false,
    nextMethod: actions.URL_METHOD
  };

  render() {
    const { handleNext, method } = this.props;
    const { title, description, dialog } = this.state;

    const dialogButtons = [
      <FlatButton
        label="취소"
        primary
        onTouchTap={ this.handleDialogClose } />,
      <FlatButton
        label="계속"
        primary
        keyboardFocused
        onTouchTap={ () => this.handleUploadMethodChange(this.state.nextMethod) } />
    ];

    return (
      <div>
        <div className="left-col">
          <SelectField
            floatingLabelText="업로드 방식"
            value={ method }
            onChange={ this.handleDialogOpen }>
            <MenuItem value={ actions.URL_METHOD } primaryText="동영상 URL" />
            <MenuItem value={ actions.FILE_METHOD } primaryText="동영상 업로드" />
          </SelectField>
          {
            method == actions.URL_METHOD ?
            this.renderURLField() : this.renderFileField()
          }
          {
            this.renderThumbnail()
          }
        </div>
        <div className="right-col">
          <TextField
            floatingLabelText="제목"
            name="title"
            value={ title }
            onChange={ this.handleChange }
            fullWidth
          />
          <TextField
            floatingLabelText="학습 목표"
            name="description"
            value={ description }
            onChange={ this.handleChange }
            multiLine
            fullWidth
            rows={ 15 }
          />
          <FlatButton
            onTouchTap={ () => handleNext(title, description) }
            className="next"
            backgroundColor="#7dcdf8"
            hoverColor="#75a8da">
            <span className="buttonLabel">
              다음
            </span>
          </FlatButton>
        </div>
        <Dialog
          title="업로드한 동영상이 사라집니다."
          actions={ dialogButtons }
          modal
          open={ dialog }
          onRequestClose={ this.handleDialogClose }>
          계속하시겠습니까?
        </Dialog>
      </div>
    );
  }

  renderURLField = () => {
    const { handleVideoURL } = this.props;
    const { videoURL } = this.state;

    return (
      <div>
        <TextField
          floatingLabelText="URL"
          name="videoURL"
          value={ videoURL }
          onChange={ this.handleChange }
        />
        <FlatButton
          onTouchTap={ () => handleVideoURL(videoURL) }
          backgroundColor="#7dcdf8"
          hoverColor="#75a8da">
          <span className="buttonLabel">
            불러오기
          </span>
        </FlatButton>
      </div>
    );
  }

  renderFileField = () => {
    this.props.initYoutubeUpload();
    switch(this.props.isGoogleSignedIn) {
      case true:
        return (
          <div>
            로그인됨!
          </div>
        );
      case false:
      default:
        return (
          <div>
            <FlatButton
              backgroundColor="#7dcdf8"
              hoverColor="#75a8da"
              onTouchTap={ this.props.signIn }>
              <span className="buttonLabel">
                구글 로그인
              </span>
            </FlatButton>
          </div>
        );
    }
  }

  renderThumbnail = () => {
    switch(this.props.thumb) {
      case actions.NO_THUMB:
        return;
      case actions.SUCC_THUMB:
        return (
          <img
            src={ this.props.thumbURL }
            alt="succeeded importing video"
            className="thumbnail" />
        );
      case actions.FAIL_THUMB:
      default:
        return (
          <img
            src={ 'http://iamaperformer.com/userphotos/no-video-available.jpg' }
            alt="failed at importing video"
            className="thumbnail" />
        );
    }
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleDialogOpen = (e, nextMethod) => {
    const { method, thumb } = this.props;

    if (method == nextMethod) {
      return;
    }
    if (thumb != actions.SUCC_THUMB) {
      this.handleUploadMethodChange(nextMethod);
      return;
    }
    this.setState({
      dialog: true,
      nextMethod
    });
  }

  handleDialogClose = () => {
    this.setState({
      dialog: false
    });
  }

  handleUploadMethodChange = nextMethod => {
    this.setState({
      videoURL: ''
    });
    this.props.resetVideo();
    this.props.setUploadMethod(nextMethod);
    this.handleDialogClose();
  }
}

VideoUpload.propTypes = propTypes;
VideoUpload.defaultProps = defaultProps;

export default VideoUpload;
