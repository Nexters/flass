import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  onVolumeBarChange: PropTypes.func.isRequired,
  barClass: PropTypes.string,
  volume: PropTypes.number
};

const defaultProps = {
  barClass: '',
  volume: 0
};

const VideoVolumeBarComponent = props => {
  const {
    onVolumeBarChange,
    barClass,
    volume
  } = props;

  return (
    <input
      className={ barClass }
      type="range"
      min={ 0 }
      max={ 1 }
      step="any"
      onChange={ onVolumeBarChange }
      value={ volume } />
  );
};

VideoVolumeBarComponent.propTypes = propTypes;
VideoVolumeBarComponent.defaultProps = defaultProps;

export { VideoVolumeBarComponent };
