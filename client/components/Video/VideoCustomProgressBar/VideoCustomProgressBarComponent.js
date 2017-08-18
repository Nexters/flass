import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import autobind from 'autobind-decorator';
import keydown from 'react-keydown';

import VideoCustomBarComponent from './VideoCustomBarComponent';
import VideoCustomQuizBarComponent from './VideoCustomQuizBarComponent';
import { VideoProgressBar } from './VideoCustomProgressBarStyled';
import { convertSecsToPercentage } from '../VideoUtils';

const { func, number, string, oneOfType, arrayOf, bool, shape } = PropTypes;

const propTypes = {
  VideoBarClassName: oneOfType([string, arrayOf(string)]),
  VideoPlayedBarClassName: oneOfType([string, arrayOf(string)]),
  VideoLoadedBarClassName: oneOfType([string, arrayOf(string)]),
  VideoQuizIndicatorClassName: oneOfType([string, arrayOf(string)]),
  VideoQuizIndicatorBarClassName: oneOfType([string, arrayOf(string)]),
  onCustomSeekBarMouseDown: func.isRequired,
  onCustomSeekBarChange: func.isRequired,
  onCustomSeekBarMouseUp: func.isRequired,
  onCustomSeekBarClick: func.isRequired,
  onArrowKeyPressed: func.isRequired,
  onQuestionbarClick: func,
  duration: number,
  playedPercentage: number,
  loadedPercentage: number,

  quizTimeArray: arrayOf(shape({
    playedSeconds: number,
    label: string,
    indexOfQuestion: number
  })),
  canChangeIsQuizSecs: func.isRequired,
  isQuizSecs: bool.isRequired,
  searchableSecs: number.isRequired
};

const defaultProps = {
  onQuestionbarClick: () => {},
  VideoBarClassName: '',
  VideoPlayedBarClassName: '',
  VideoLoadedBarClassName: '',
  VideoQuizIndicatorClassName: '',
  VideoQuizIndicatorBarClassName: '',
  duration: 1,
  playedPercentage: 0,
  loadedPercentage: 0,

  quizTimeArray: []
};

const PROGRESS_MIN = 0;
const PROGRESS_MAX = 100;
const SHIFT_AMOUNT_PERCENTAGE = 0.15;

class VideoCustomProgressBarComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      width: 1,
      duration: 1,
      played: 0,
      loaded: 0,
      isDragging: false
    };
  }

  componentWillReceiveProps(nextProps) {
    const {
      duration,
      playedPercentage,
      loadedPercentage,
      isQuizSecs
    } = nextProps;

    if (!isQuizSecs) {
      const playedSecs = parseInt(duration * playedPercentage);
      this.props.canChangeIsQuizSecs(playedSecs);
      this.updateProgressbarStatus(duration, playedPercentage, loadedPercentage);
    } else {
      this.updateProgressbarStatus(duration, playedPercentage, loadedPercentage);
    }
  }

  render() {
    const { played, loaded, duration } = this.state;
    const {
      VideoBarClassName,
      VideoPlayedBarClassName,
      VideoLoadedBarClassName,
      VideoQuizIndicatorClassName,
      VideoQuizIndicatorBarClassName,

      onQuestionbarClick,

      quizTimeArray
    } = this.props;

    return (
      <VideoProgressBar
        onMouseDown={ this.onCustomSeekBarMouseDown }
        onMouseMove={ this.onCustomSeekBarChange }
        onMouseUp={ this.onCustomSeekBarMouseUp }
        onClick={ this.onCustomSeekBarClick }>
        <VideoCustomBarComponent
          VideoBarClassName={ VideoBarClassName }
          VideoPlayedBarClassName={ VideoPlayedBarClassName }
          VideoLoadedBarClassName={ VideoLoadedBarClassName }
          played={ played }
          loaded={ loaded } />
        <VideoCustomQuizBarComponent
          VideoQuizIndicatorClassName={ VideoQuizIndicatorClassName }
          VideoQuizIndicatorBarClassName={ VideoQuizIndicatorBarClassName }
          onQuestionbarClick={ onQuestionbarClick }
          duration={ duration }

          quizTimeArray={ quizTimeArray } />
      </VideoProgressBar>
    );
  }

  updateProgressbarStatus(duration, playedPercentage, loadedPercentage) {
    this.setState({
      duration,
      played: playedPercentage * 100,
      loaded: loadedPercentage * 100
    });
  }

  @autobind
  onCustomSeekBarMouseDown(e)  {
    this.setState({ isDragging: true });
    this.props.onCustomSeekBarMouseDown();
    e.stopPropagation();
    e.preventDefault;
  }

  @autobind
  onCustomSeekBarChange(e) {
    if (this.state.isDragging) {
      const { searchableSecs } = this.props;
      const movedPosition = this.calculateMovedPosition(e);
      const searchablePosition = this.calculateSearchablePosition(searchableSecs);

      if (movedPosition < searchablePosition) {
        this.setState({ played: movedPosition });
        this.props.onCustomSeekBarChange(movedPosition);
      }
    }
    e.stopPropagation();
    e.preventDefault;
  }

  @autobind
  onCustomSeekBarMouseUp(e) {
    this.setState({ isDragging: false });
    this.props.onCustomSeekBarMouseUp(this.state.played);
    e.stopPropagation();
    e.preventDefault;
  }

  @autobind
  onCustomSeekBarClick(e) {
    if (!this.state.isDragging) {
      const { searchableSecs } = this.props;
      const movedPosition = this.calculateMovedPosition(e);
      const searchablePosition = this.calculateSearchablePosition(searchableSecs);

      if (movedPosition < searchablePosition) {
        this.setState({ played: movedPosition });
        this.props.onCustomSeekBarClick(movedPosition);
      }
    }
  }

  calculateMovedPosition(e) {
    const { left, right } = ReactDOM.findDOMNode(this).getBoundingClientRect();
    const rLeft = left - document.body.getBoundingClientRect().left;

    let movedPosition = ((e.clientX - rLeft) / (right - rLeft)) * 100;
    if (movedPosition < PROGRESS_MIN) {
      movedPosition = min;
    }
    if (movedPosition > PROGRESS_MAX) {
      movedPosition = max;
    }

    return movedPosition;
  }

  calculateSearchablePosition(searchableSecs) {
    const { duration } = this.props;
    return convertSecsToPercentage(searchableSecs, duration) * 100;
  }

  @autobind
  @keydown('left')
  onLeftArrowKeyPressed() {
    const changedPlayed = this.state.played - SHIFT_AMOUNT_PERCENTAGE;
    this.props.onArrowKeyPressed(changedPlayed);
  }

  @autobind
  @keydown('right')
  onRightArrowKeyPressed() {
    const changedPlayed = this.state.played + SHIFT_AMOUNT_PERCENTAGE;
    this.props.onArrowKeyPressed(changedPlayed);
  }

  @autobind
  onQuestionbarClick({ label }) {
    this.props.onQuestionbarClick({ label });
  }
}

VideoCustomProgressBarComponent.propTypes = propTypes;
VideoCustomProgressBarComponent.defaultProps = defaultProps;

export { VideoCustomProgressBarComponent };
