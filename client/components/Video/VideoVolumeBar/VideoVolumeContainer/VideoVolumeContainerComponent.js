import React, { Component } from 'react';
import PropTypes from 'prop-types';

const { arrayOf, element } = PropTypes;

const propTypes = {
  children: element.isRequired
};
const defaultProps = {};

class VideoVolumeContainerComponent extends Component {
  render() {
    const { children } = this.props;
    return (
      <div>
        { children }
      </div>
    );
  }
}

VideoVolumeContainerComponent.propTypes = propTypes;
VideoVolumeContainerComponent.defaultProps = defaultProps;

export default VideoVolumeContainerComponent;
