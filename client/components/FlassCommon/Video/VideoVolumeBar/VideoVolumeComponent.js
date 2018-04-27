import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autobind from 'autobind-decorator';

import VideoVolumeBarComponent from './VideoVolumeBar/VideoVolumeBarComponent';
import { VideoVolume } from './VideoVolumeStyled';

const { func, number } = PropTypes;

const propTypes = {
  onVolumebarClick: func.isRequired,
  volume: number.isRequired
};
const defaultProps = {};

const NUM_OF_VOLUME_BAR = 11;

class VideoVolumeComponent extends Component {
  render() {
    return (
      <VideoVolume>
        { this.renderVolumebar() }
      </VideoVolume>
    );
  }

  renderVolumebar() {
    const bars = [];

    for (let i = 0; i < NUM_OF_VOLUME_BAR; i += 1) {
      bars.push(<VideoVolumeBarComponent
        key={ i }
        index={ i }
        isActive={ this.isBarActive(i) }
        onVolumebarClick={ this.onVolumebarClick } />);
    }

    return bars;
  }

  @autobind
  onVolumebarClick(barIndex) {
    this.props.onVolumebarClick(barIndex);
  }

  @autobind
  isBarActive(barIndex) {
    const { volume } = this.props;
    return (parseFloat(volume * 100) > parseFloat(barIndex * 10));
  }
}

VideoVolumeComponent.propTypes = propTypes;
VideoVolumeComponent.defaultProps = defaultProps;

export { VideoVolumeComponent };
