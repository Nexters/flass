import React from 'react';
import PropTypes from 'prop-types';

import './InputRangeStyles.scss';
import './VideoVolumeBarComponentStyles.scss';

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
    <span className="video-volume-bar-wrapper">
      <input
        className={ barClass }
        type="range"
        min={ 0 }
        max={ 1 }
        step="any"
        onChange={ onVolumeBarChange }
        value={ volume } />
    </span>
  );
};

VideoVolumeBarComponent.propTypes = propTypes;
VideoVolumeBarComponent.defaultProps = defaultProps;

export { VideoVolumeBarComponent };
