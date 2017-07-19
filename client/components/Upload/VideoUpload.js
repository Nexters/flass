import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import PropTypes from 'prop-types';

import './upload.scss';

const propTypes = {
  handleNext: PropTypes.func
};
const defaultProps = {
  handleNext: () => { console.log('next'); }
};

class VideoUpload extends Component {
  state = {
    title: '',
    description: ''
  };

  render() {
    const { handleNext } = this.props;
    const { title, description } = this.state;

    return(
      <div>
        <div className="left-col">
          <input
            type="file"
            onChange={this.handleUploadVideo}
          />
        </div>
        <div className="right-col">
          <TextField
            floatingLabelText="제목"
            name="title"
            value={title}
            onChange={this.handleChange}
            fullWidth
          />
          <TextField
            floatingLabelText="학습 목표"
            name="description"
            value={description}
            onChange={this.handleChange}
            multiLine
            fullWidth
            rows={15}
          />
          <FlatButton
            onTouchTap={ handleNext }
            className="next"
            backgroundColor="#7dcdf8"
            hoverColor="#75a8da"
          >
            <span className="nextLabel">
              다음
            </span>
          </FlatButton>
        </div>
      </div>
    );
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleUploadVideo = () => {
    // upload video via youtube || server?
  }
}

VideoUpload.propTypes = propTypes;
VideoUpload.defaultProps = defaultProps;

export default VideoUpload;
