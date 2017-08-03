import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './VideoButtonStyle.scss';

const { func, string, number, oneOfType, arrayOf } = PropTypes;

const propTypes = {
  onButtonClick: func.isRequired,
  buttonTitle: string,
  buttonClass: oneOfType([string, arrayOf(string)]),
  value: oneOfType([
    string,
    number
  ]),
  srcSet: string
};

const defaultProps = {
  buttonTitle: '',
  buttonClass: '',
  value: '',
  srcSet: null
};

const VideoButtonComponent = props => {
  const {
    buttonTitle,
    onButtonClick,
    buttonClass,
    value,
    srcSet
  } = props;

  return (
    <button
      className={ classNames(buttonClass) }
      onClick={ onButtonClick }
      value={ value }>
      <img srcSet={ `${srcSet}` } className="video-btn__icon" alt="Video controller button" />
    </button>
  );
};

VideoButtonComponent.propTypes = propTypes;
VideoButtonComponent.defaultProps = defaultProps;

export { VideoButtonComponent };
