import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  onButtonClick: PropTypes.func.isRequired,
  buttonTitle: PropTypes.string,
  buttonClass: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ])
};

const defaultProps = {
  buttonTitle: '',
  buttonClass: '',
  value: ''
};

const VideoButtonComponent = props => {
  const {
    buttonTitle,
    onButtonClick,
    buttonClass,
    value
  } = props;

  return (
    <button
      className={ buttonClass }
      onClick={ onButtonClick }
      value={ value }>
      { buttonTitle }
    </button>
  );
};

VideoButtonComponent.propTypes = propTypes;
VideoButtonComponent.defaultProps = defaultProps;

export default VideoButtonComponent;
