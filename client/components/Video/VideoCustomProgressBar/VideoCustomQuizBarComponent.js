import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import VideoTooltipComponent from './VideoTooltip/VideoTooltipComponent';
import './VideoCustomQuizBarStyle.scss';

const { number, string, oneOfType, arrayOf, shape } = PropTypes;

const propTypes = {
  VideoQuizIndicatorClassName: oneOfType([string, arrayOf(string)]),
  VideoQuizIndicatorBarClassName: oneOfType([string, arrayOf(string)]),
  duration: number.isRequired,

  quizTimeArray: arrayOf(shape({
    playedSeconds: number,
    label: string
  }))
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
      const { playedSeconds, label } = quizTime;
      const { VideoQuizIndicatorBarClassName } = this.props;

      return (
        <div
          key={ label }
          className={ classNames('quiz-indicator-bar', VideoQuizIndicatorBarClassName) }
          style={ { left: `${(playedSeconds / this.props.duration) * 100}%` } }>
          <VideoTooltipComponent content={ label } />
        </div>
      );
    });
  }
}

VideoCustomQuizBarComponent.propTypes = propTypes;
VideoCustomQuizBarComponent.defaultProps = defaultProps;

export default VideoCustomQuizBarComponent;
