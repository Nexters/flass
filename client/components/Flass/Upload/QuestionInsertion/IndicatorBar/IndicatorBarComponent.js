import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autobind from 'autobind-decorator';
import { VideoCustomProgressBarComponent } from '../../../../FlassCommon/Video';
import RulerComponent from './Ruler/RulerComponent';

import './IndicatorBarComponentStyles.scss';

const {
  string, oneOfType, arrayOf, func, number, bool
} = PropTypes;

const propTypes = {
  VideoProgressBarClassName: oneOfType([string, arrayOf(string)]),
  VideoBarClassName: oneOfType([string, arrayOf(string)]),
  VideoPlayedBarClassName: oneOfType([string, arrayOf(string)]),
  VideoLoadedBarClassName: oneOfType([string, arrayOf(string)]),
  VideoQuizIndicatorClassName: oneOfType([string, arrayOf(string)]),
  VideoQuizIndicatorBarClassName: oneOfType([string, arrayOf(string)]),

  playerSeekTo: func.isRequired,
  setSeekingState: func.isRequired,
  setPlayedState: func.isRequired,
  setPlayingState: func.isRequired,
  setIsQuizSecsState: func.isRequired,
  duration: number,
  played: number,
  loaded: number,
  isQuizSecs: bool
};
const defaultProps = {
  VideoProgressBarClassName: '',
  VideoBarClassName: '',
  VideoPlayedBarClassName: '',
  VideoLoadedBarClassName: '',
  VideoQuizIndicatorClassName: '',
  VideoQuizIndicatorBarClassName: '',

  duration: 0,
  played: 0,
  loaded: 0,
  isQuizSecs: false
};

class IndicatorBarComponent extends Component {
  render() {
    const {
      VideoProgressBarClassName,
      VideoBarClassName,
      VideoPlayedBarClassName,
      VideoLoadedBarClassName,
      VideoQuizIndicatorClassName,
      VideoQuizIndicatorBarClassName,

      duration,
      played,
      loaded,
      isQuizSecs
    } = this.props;

    return (
      <div>
        <VideoCustomProgressBarComponent
          VideoProgressBarClassName={ VideoProgressBarClassName }
          VideoBarClassName={ VideoBarClassName }
          VideoPlayedBarClassName={ VideoPlayedBarClassName }
          VideoLoadedBarClassName={ VideoLoadedBarClassName }
          VideoQuizIndicatorClassName={ VideoQuizIndicatorClassName }
          VideoQuizIndicatorBarClassName={ VideoQuizIndicatorBarClassName }

          duration={ duration }
          playedPercentage={ played }
          loadedPercentage={ loaded }
          onCustomSeekBarMouseDown={ this.onCustomSeekBarMouseDown }
          onCustomSeekBarChange={ this.onCustomSeekBarChange }
          onCustomSeekBarMouseUp={ this.onCustomSeekBarMouseUp }
          onCustomSeekBarClick={ this.onCustomSeekBarClick }
          onArrowKeyPressed={ this.onArrowKeyPressed }

          canChangeIsQuizSecs={ this.canChangeIsQuizSecs }
          isQuizSecs={ isQuizSecs } />

        <RulerComponent />
      </div>
    );
  }

  @autobind
  onCustomSeekBarMouseDown() {
    this.props.setSeekingState(true);
  }

  @autobind
  onCustomSeekBarChange(changedPlayed) {
    const changedPlayedPercentage = changedPlayed / 100;
    this.props.setPlayedState(changedPlayedPercentage);
  }

  @autobind
  onCustomSeekBarMouseUp(changedPlayed) {
    const changedPlayedPercentage = changedPlayed / 100;
    this.props.setSeekingState(false);
    this.props.playerSeekTo(changedPlayedPercentage);
  }

  @autobind
  onCustomSeekBarClick(changedPlayed) {
    const changedPlayedPercentage = changedPlayed / 100;
    this.props.setPlayedState(changedPlayedPercentage);
    this.props.playerSeekTo(changedPlayedPercentage);
  }

  @autobind
  onArrowKeyPressed(changedPlayed) {
    const changedPlayedPercentage = changedPlayed / 100;
    this.props.setPlayedState(changedPlayedPercentage);
    this.props.playerSeekTo(changedPlayedPercentage);
  }

  @autobind
  canChangeIsQuizSecs(playedSecs) {
    // const { quizTimeArrayForPopupTest } = this.props;
    const quizTimeArrayForPopupTest = [];

    if (this.isEqlQuizSecsWithPlayedSecs(playedSecs, quizTimeArrayForPopupTest)) {
      this.props.setIsQuizSecsState(true);
      this.props.setPlayingState(false);
    }
  }

  isEqlQuizSecsWithPlayedSecs(playedSecs, quizSecsArray) {
    return quizSecsArray.indexOf(playedSecs) !== -1;
  }
}

IndicatorBarComponent.propTypes = propTypes;
IndicatorBarComponent.defaultProps = defaultProps;

export default IndicatorBarComponent;
