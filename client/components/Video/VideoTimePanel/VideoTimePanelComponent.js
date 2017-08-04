import React from 'react';
import PropTypes from 'prop-types';

import VideoDurationComponent from '../VideoDurationComponent';

import './VideoTimePanelComponentStyles.scss';

const propTypes = {
  duration: PropTypes.number.isRequired,
  elapsed: PropTypes.number.isRequired
};

const defaultProps = {
};

const VideoTimePanelComponent = ({ duration, elapsed }) => (
  <span className="video-timepanel">
    <VideoDurationComponent seconds={ elapsed } />
    { ' / ' }
    <VideoDurationComponent seconds={ duration } />
  </span>
);

VideoTimePanelComponent.propTypes = propTypes;
VideoTimePanelComponent.defaultProps = defaultProps;

export { VideoTimePanelComponent };
