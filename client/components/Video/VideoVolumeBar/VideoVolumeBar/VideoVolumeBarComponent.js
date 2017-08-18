import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autobind from 'autobind-decorator';

import { VideoVolumeBar } from './VideoVolumeBarStyled';

import './InputRangeStyles.scss';
import './VideoVolumeBarComponentStyles.scss';

const { func, bool, number } = PropTypes;

const propTypes = {
  onVolumebarClick: func.isRequired,
  isActive: bool.isRequired,
  index: number.isRequired
};

const defaultProps = {
};

class VideoVolumeBarComponent extends Component {
  render() {
    const { isActive } = this.props;

    return (
      <VideoVolumeBar
        isActive={ isActive }
        onClick={ this.onVolumebarClick }>
        { ' ' }
      </VideoVolumeBar>
    );
  }

  @autobind
  onVolumebarClick() {
    const { index } = this.props;
    this.props.onVolumebarClick(index);
  }
}

VideoVolumeBarComponent.propTypes = propTypes;
VideoVolumeBarComponent.defaultProps = defaultProps;

export default VideoVolumeBarComponent;
