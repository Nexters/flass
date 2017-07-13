import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  progress: PropTypes.number
};
const defaultProps = {
  progress: 0
};

const VideoProgressBarComponent = props => {
  const { progress } = props;

  return (
    <progress max={ 1 } value={ progress } />
  );
};

VideoProgressBarComponent.propTypes = propTypes;
VideoProgressBarComponent.defaultProps = defaultProps;

export default VideoProgressBarComponent;
