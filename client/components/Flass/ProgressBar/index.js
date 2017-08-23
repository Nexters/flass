import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './styles.scss';

const propTypes = {
  progress: PropTypes.number
};
const defaultProps = {
  progress: 0
};

const ProgressBar = props => {
  const progress = {
    width: `${props.progress}%`
  };
  return (
    <div className="bar">
      <div className="_progress" style={ progress } />
    </div>
  );
};

ProgressBar.propTypes = propTypes;
ProgressBar.defaultProps = defaultProps;

export default ProgressBar;
