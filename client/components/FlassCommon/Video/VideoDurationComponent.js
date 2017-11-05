import React from 'react';
import PropTypes from 'prop-types';

const { string, number } = PropTypes;

const propTypes = {
  className: string,
  seconds: number.isRequired
};
const defaultProps = {
  className: ''
};

const Duration = ({ className, seconds }) => (
  <time dateTime={ `P${Math.round(seconds)}S` } className={ className }>
    {format(seconds)}
  </time>
);

function format(seconds) {
  const date = new Date(seconds * 1000);
  const hh = date.getUTCHours();
  const mm = date.getUTCMinutes();
  const ss = pad(date.getUTCSeconds());
  if (hh) {
    return `${hh}:${pad(mm)}:${ss}`;
  }
  return `${mm}:${ss}`;
}

function pad(string) {
  return (`0${string}`).slice(-2);
}

Duration.propTypes = propTypes;
Duration.defaultProps = defaultProps;

export default Duration;
