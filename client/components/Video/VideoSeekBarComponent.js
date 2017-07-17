import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  onSeekBarMouseDown: PropTypes.func.isRequired,
  onSeekBarChange: PropTypes.func.isRequired,
  onSeekBarMouseUp: PropTypes.func.isRequired,
  barClass: PropTypes.string,
  played: PropTypes.number
};

const defaultProps = {
  barClass: '',
  played: 0
};

const VideoSeekBarComponent = props => {
  const {
    onSeekBarMouseDown,
    onSeekBarChange,
    onSeekBarMouseUp,
    barClass,
    played
  } = props;

  return (
    <input
      className={ barClass }
      type="range"
      min={ 0 }
      max={ 1 }
      step="any"
      onMouseDown={ onSeekBarMouseDown }
      onChange={ onSeekBarChange }
      onMouseUp={ onSeekBarMouseUp }
      value={ played } />
  );
};

VideoSeekBarComponent.propTypes = propTypes;
VideoSeekBarComponent.defaultProps = defaultProps;

export default VideoSeekBarComponent;
