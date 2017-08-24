import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './styles.scss';

const propTypes = {
  color: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  children: PropTypes.string
};
const defaultProps = {
  color: '#b6bfc1',
  disabled: false,
  onClick: () => console.error('onClick is not defined'),
  children: ''
};

const Button = props => {
  const color = {
    borderColor: props.color,
    color: props.color
  };
  return (
    <button
      onClick={ props.onClick }
      disabled={ props.disabled }
      style={ color } >
      { props.children }
    </button>
  );
};

Button.propTypes = propTypes;
Button.defaultProps = defaultProps;

export default Button;
