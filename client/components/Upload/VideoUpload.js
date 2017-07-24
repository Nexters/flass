import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import SelectField from 'material-ui/SelectField';
import MenuItem  from 'material-ui/MenuItem';
import PropTypes from 'prop-types';

import * as actions from '../../modules/Upload/Actions';

import './upload.scss';

// constants
const urlMethod = 0;
const fileUploadMethod = 1;

const propTypes = {
  handleNext: PropTypes.func,
  handleVideoURL: PropTypes.func,
  thumb: PropTypes.number.isRequired,
  thumbURL: PropTypes.string.isRequired,
  handleThumbFail: PropTypes.func
};
const defaultProps = {
  handleNext: () => handleError('handleNext'),
  handleVideoURL: () => handleError('handleVideoURL'),
  handleThumbFail: () => handleError('handleThumbFail')
};

function handleError(func) {
  console.error(`${func} is not defined`);
}

class VideoUpload extends Component {
  state = {
    title: '',
    description: '',
    method: urlMethod,
    videoURL: ''
  };

  render() {
    const { handleNext } = this.props;
    const { title, description, method } = this.state;

    return (
      <div>
        <div className="left-col">
          <SelectField
            floatingLabelText="업로드 방식"
            value={ method }
            onChange={ this.handleMethodChange }>
            <MenuItem value={ urlMethod } primaryText="동영상 URL" />
            <MenuItem value={ fileUploadMethod } primaryText="동영상 업로드" />
          </SelectField>
          {
            method == urlMethod ?
            this.renderURLField() : this.renderfileUploadField()
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

  renderfileUploadField = () => (
    <div>
      <FlatButton
        backgroundColor="#7dcdf8"
        hoverColor="#75a8da">
        구글로 로그인
      </FlatButton>
    </div>
  )

  renderThumbnail = () => {
    switch(this.props.thumb) {
      case actions.noThumb:
        return;
      case actions.succThumb:
        return (
          <img
            src={ this.props.thumbURL }
            alt="succeeded importing video" />
        );
      case actions.failThumb:
      default:
        return (
          <img
            src={ 'http://iamaperformer.com/userphotos/no-video-available.jpg' }
            alt="failed at importing video" />
        );
    }
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleMethodChange = (e, method) => {
    this.setState({
      method
    });
  }

  handleUploadVideo = () => {
    // upload video via youtube || server?
  }
}

VideoUpload.propTypes = propTypes;
VideoUpload.defaultProps = defaultProps;

export default VideoUpload;
