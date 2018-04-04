import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import autobind from 'autobind-decorator';

import VideoTooltipComponent from './VideoTooltip/VideoTooltipComponent';
import './VideoCustomQuizBarStyle.scss';

const {
  number, string, oneOfType, arrayOf, shape, func, bool
} = PropTypes;

const propTypes = {
  onQuestionbarClick: func,
  onMouseOverOnBar: func.isRequired,
  onMouseOutFromBar: func.isRequired,
  VideoQuizIndicatorClassName: oneOfType([string, arrayOf(string)]),
  VideoQuizIndicatorBarClassName: oneOfType([string, arrayOf(string)]),
  duration: number.isRequired,
  ismouseover: bool.isRequired,

  quizTimeArray: arrayOf(shape({
    playedSeconds: number,
    label: string
  }))
};
const defaultProps = {
  onQuestionbarClick: () => {},
  VideoQuizIndicatorClassName: '',
  VideoQuizIndicatorBarClassName: '',

  quizTimeArray: []
};

class VideoCustomQuizBarComponent extends Component {
  render() {
    const {
      onMouseOverOnBar,
      onMouseOutFromBar,
      ismouseover
    } = this.props;

    return (
      <div
        className={ classNames('quiz-indicator', { 'quiz-indicator--thicker': ismouseover }) }
        onMouseOver={ onMouseOverOnBar }
        onMouseOut={ onMouseOutFromBar }>
        { this.renderQuizBar() }
      </div>
    );
  }

  renderQuizBar() {
    return this.props.quizTimeArray.map(quizTime => {
      const { playedSeconds, label } = quizTime;
      const {
        onMouseOverOnBar,
        onMouseOutFromBar,
        ismouseover
      } = this.props;

      return (
        <div
          key={ label }
          className={ classNames('quiz-indicator-bar', { 'quiz-indicator-bar--thicker': ismouseover }) }
          style={ { left: `${(playedSeconds / this.props.duration) * 100}%` } }
          onClick={ e => this.onQuestionbarClick(e, { label }) }
          onMouseOver={ onMouseOverOnBar }
          onMouseOut={ onMouseOutFromBar }>
          <VideoTooltipComponent
            content={ label }
            onMouseOverOnBar={ onMouseOverOnBar }
            onMouseOutFromBar={ onMouseOutFromBar } />
        </div>
      );
    });
  }

  @autobind
  onQuestionbarClick(e, { label }) {
    this.props.onQuestionbarClick(e, { label });
  }
}

VideoCustomQuizBarComponent.propTypes = propTypes;
VideoCustomQuizBarComponent.defaultProps = defaultProps;

export default VideoCustomQuizBarComponent;
