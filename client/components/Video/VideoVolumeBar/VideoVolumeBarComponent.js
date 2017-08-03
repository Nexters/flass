import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './InputRangeStyles.scss';
import './VideoVolumeBarComponentStyles.scss';

const propTypes = {
  onVolumeBarChange: PropTypes.func.isRequired,
  barClass: PropTypes.string,
  volume: PropTypes.number,
  visible: PropTypes.bool.isRequired
};

const defaultProps = {
  barClass: '',
  volume: 0
};

const VideoVolumeBarComponent = props => {
  const {
    onVolumeBarChange,
    barClass,
    volume,
    visible
  } = props;

  return (
    <span
      className={ classNames(
        'video-volume-bar-wrapper',
        { 'video-volume-bar-wrapper--visible': visible },
        { 'video-volume-bar-wrapper--invisible': !visible }) }>
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
