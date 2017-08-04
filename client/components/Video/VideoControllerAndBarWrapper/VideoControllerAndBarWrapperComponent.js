import React from 'react';
import PropTypes from 'prop-types';

import './VideoControllerAndBarWrapperComponentStyles.scss';

const propTypes = {
  children: PropTypes.element.isRequired
};

const VideoControllerAndBarWrapperComponent = ({ children }) => (
  <div className="video-controller-bar-wrapper">
    { children }
  </div>
);

VideoControllerAndBarWrapperComponent.propTypes = propTypes;

export { VideoControllerAndBarWrapperComponent };
