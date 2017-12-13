import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

const propTypes = {
  fontSize: PropTypes.string,
  color: PropTypes.string,
  margin: PropTypes.string,
  padding: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  children: PropTypes.string
};
const defaultProps = {
  fontSize: '1.429rem',
  color: '#b6bfc1',
  margin: '0',
  padding: '0.6rem 1.188rem 0.42rem 1.188rem',
  disabled: false,
  onClick: () => console.error('onClick is not defined'),
  children: ''
};

const Button = props => {
  const style = {
    fontSize: props.fontSize,
    color: props.color,
    borderColor: props.color,
    margin: props.margin,
    padding: props.padding
  };
  return (
    <button
      onClick={ props.onClick }
      disabled={ props.disabled }
      style={ style }
      className="buttonStyle">
      { props.children }
    </button>
  );
};

Button.propTypes = propTypes;
Button.defaultProps = defaultProps;

export default Button;
