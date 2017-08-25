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
    width: `${props.progress}%`,
    maxWidth: '98.5%' // Youtube Upload 상태가 100%가 되고나서도 계속 프로세싱이 되서 임의로 설정해줌
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
