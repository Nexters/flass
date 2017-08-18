import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { VideoVolumeWrapper } from './VideoVolumeWrapperStyled';

const { oneOfType, element, arrayOf } = PropTypes;

const propTypes = {
  children: oneOfType([element, arrayOf(element)]).isRequired
};

const defaultProps = {};

class VideoVolumeWrapperComponent extends Component {
  render() {
    const { children } = this.props;

    return (
      <VideoVolumeWrapper>
        { children }
      </VideoVolumeWrapper>
    );
  }
}

VideoVolumeWrapperComponent.propTypes = propTypes;
VideoVolumeWrapperComponent.defaultProps = defaultProps;

export { VideoVolumeWrapperComponent };
