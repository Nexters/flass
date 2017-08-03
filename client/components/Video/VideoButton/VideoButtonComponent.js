import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './VideoButtonStyle.scss';

const { func, string, number, oneOfType, arrayOf } = PropTypes;

const propTypes = {
  onButtonClick: func.isRequired,
  onButtonMouseOver: func,
  onButtonMouseLeave: func,
  buttonTitle: string,
  buttonClass: oneOfType([string, arrayOf(string)]),
  value: oneOfType([
    string,
    number
  ]),
  srcSet: string
};

const defaultProps = {
  onButtonMouseOver: null,
  onButtonMouseLeave: null,
  buttonTitle: '',
  buttonClass: '',
  value: '',
  srcSet: null
};

const VideoButtonComponent = props => {
  const {
    buttonTitle,
    onButtonClick,
    onButtonMouseOver,
    onButtonMouseLeave,
    buttonClass,
    value,
    srcSet
  } = props;

  return (
    <button
      className={ classNames(buttonClass) }
      onClick={ onButtonClick }
      onMouseOver={ onButtonMouseOver }
      onMouseLeave={ onButtonMouseLeave }
      value={ value }>
      <img srcSet={ `${srcSet}` } className="video-btn__icon" alt="Video controller button" />
    </button>
  );
};

VideoButtonComponent.propTypes = propTypes;
VideoButtonComponent.defaultProps = defaultProps;

export { VideoButtonComponent };
