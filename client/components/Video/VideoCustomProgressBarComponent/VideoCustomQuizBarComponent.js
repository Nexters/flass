import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';

import './VideoCustomQuizBarStyle.scss';

const { array, number, string, oneOfType, arrayOf } = PropTypes;

const propTypes = {
  VideoQuizIndicatorClassName: oneOfType([string, arrayOf(string)]),
  VideoQuizIndicatorBarClassName: oneOfType([string, arrayOf(string)]),
  quizTimeArray: array,
  duration: number.isRequired
};
const defaultProps = {
  VideoQuizIndicatorClassName: '',
  VideoQuizIndicatorBarClassName: '',
  quizTimeArray: []
};

class VideoCustomQuizBarComponent extends Component {
  render() {
    const { VideoQuizIndicatorClassName } = this.props;
    return (
      <div className={ classNames('quiz-indicator', VideoQuizIndicatorClassName) }>
        { this.renderQuizBar() }
      </div>
    );
  }

  renderQuizBar() {
    return this.props.quizTimeArray.map(quizTime => {
      const { VideoQuizIndicatorBarClassName } = this.props;

      return (
        <div
          key={ quizTime }
          className={ classNames('quiz-indicator-bar', VideoQuizIndicatorBarClassName) }
          style={ { left: `${(quizTime / this.props.duration) * 100}%` } }>
          { quizTime }
        </div>
      );
    });
  }
}

VideoCustomQuizBarComponent.propTypes = propTypes;
VideoCustomQuizBarComponent.defaultProps = defaultProps;

function mapStateToProps(state) {
  const { quiz: { quizTimeArray } } = state;

  return { quizTimeArray };
}

export default connect(mapStateToProps)(VideoCustomQuizBarComponent);
