import React from 'react';
import PropTypes from 'prop-types';

import './VideoControllerWrapperStyle.scss';

const { arrayOf, element } = PropTypes;

const propTypes = {
  children: arrayOf(element).isRequired
};

const VideoControllerWrapperComponent = props => (
  <div className="video-controller-wrapper">
    { props.children }
  </div>
);

VideoControllerWrapperComponent.propTypes = propTypes;

export { VideoControllerWrapperComponent };
