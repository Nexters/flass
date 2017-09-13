import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './SubHeaderStyles.scss';

const { number } = PropTypes;

const propTypes = {
  step: number.isRequired,
  STEP_1: number.isRequired,
  STEP_2: number.isRequired
};

const defaultProps = {};

class SubHeader extends Component {
  render() {
    const {
      step, STEP_1, STEP_2
    } = this.props;

    return (
      <div className="steps">
        <h2 className={ classNames('disabled', step == STEP_1 && 'active') }>
          영상 업로드
        </h2>
        <span className={ classNames('disabled', 'stepsDecorator') }>{'>'}</span>
        <h2 className={ classNames('disabled', step == STEP_2 && 'active') }>
          퀴즈 삽입
        </h2>
      </div>
    );
  }
}

SubHeader.propTypes = propTypes;
SubHeader.defaultProps = defaultProps;

export default SubHeader;
