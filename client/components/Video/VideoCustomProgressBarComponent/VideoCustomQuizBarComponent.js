import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './VideoCustomQuizBarStyle.scss';

const { array, number } = PropTypes;

const propTypes = {
  quizTimeArray: array,
  duration: number.isRequired
};
const defaultProps = {
  quizTimeArray: []
};

class VideoCustomQuizBarComponent extends Component {
  render() {
    return (
      <div className="quiz-indicator">
        { this.renderQuizBar() }
      </div>
    );
  }

  renderQuizBar() {
    return this.props.quizTimeArray.map(quizTime => (
      <div
        key={ quizTime }
        className="quiz-indicator-bar"
        style={ { left: `${(quizTime / this.props.duration) * 100}%` } }>
        { quizTime }
      </div>
    ));
  }
}

VideoCustomQuizBarComponent.propTypes = propTypes;
VideoCustomQuizBarComponent.defaultProps = defaultProps;

function mapStateToProps(state) {
  const { quiz: { quizTimeArray } } = state;

  return { quizTimeArray };
}

export default connect(mapStateToProps)(VideoCustomQuizBarComponent);
