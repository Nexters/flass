import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import autobind from 'autobind-decorator';
import screenfull from 'screenfull';

import {
  VideoPlayerComponent,
  VideoButtonComponent,
  VideoVolumeBarComponent,
  VideoTimePanelComponent,
  VideoCustomProgressBarComponent,
  VideoControllerWrapperComponent,
  VideoControllerAndBarWrapperComponent
} from '../../../Video';

import {
  convertPercentageToSecs,
  convertSecsToPercentage
} from '../../../Video/VideoUtils';

import PlayBtnIcon from '../../../../../public/icons/play_btn.png';
import PauseBtnIcon from '../../../../../public/icons/pause@2x.png';
import VolumeOnBtnIcon from '../../../../../public/icons/speak_btn.png';
import VolumeOffBtnIcon from '../../../../../public/icons/non-speak@2x.png';
import FullscreenBtnIcon from '../../../../../public/icons/view_btn.png';

const { string, oneOfType, arrayOf, func, number, bool, shape } = PropTypes;

const propTypes = {
  VideoContainerClassName: oneOfType([string, arrayOf(string)]),
  VideoPlayerWrapperClassName: oneOfType([string, arrayOf(string)]),
  VideoPlayerClassName: oneOfType([string, arrayOf(string)]),
  VideoProgressBarClassName: oneOfType([string, arrayOf(string)]),
  VideoControllerBarClassName: oneOfType([string, arrayOf(string)]),
  VideoBarClassName: oneOfType([string, arrayOf(string)]),
  VideoPlayedBarClassName: oneOfType([string, arrayOf(string)]),
  VideoLoadedBarClassName: oneOfType([string, arrayOf(string)]),
  VideoQuizIndicatorClassName: oneOfType([string, arrayOf(string)]),
  VideoQuizIndicatorBarClassName: oneOfType([string, arrayOf(string)]),
  VideoPlayPauseBtnClassName: oneOfType([string, arrayOf(string)]),
  VideoFullscreenBtnClassName: oneOfType([string, arrayOf(string)]),
  VideoVolumeBtnClassName: oneOfType([string, arrayOf(string)]),
  VideoVolumeBarClassName: oneOfType([string, arrayOf(string)]),

  setPlayer: func.isRequired,
  playerSeekTo: func.isRequired,
  onProgress: func.isRequired,
  onDuration: func.isRequired,
  setSeekingState: func.isRequired,
  setPlayingState: func.isRequired,
  setIsQuizSecsState: func.isRequired,
  setPlayedState: func.isRequired,
  onQuestionbarClick: func,
  duration: number,
  played: number,
  loaded: number,
  playing: bool,
  isQuizSecs: bool,
  questionSecsStateArray: arrayOf(shape({
    playedSeconds: number,
    label: string
  }))
};
const defaultProps = {
  onQuestionbarClick: () => {},
  VideoContainerClassName: '',
  VideoPlayerWrapperClassName: '',
  VideoPlayerClassName: '',
  VideoProgressBarClassName: '',
  VideoControllerBarClassName: '',
  VideoBarClassName: '',
  VideoPlayedBarClassName: '',
  VideoLoadedBarClassName: '',
  VideoQuizIndicatorClassName: '',
  VideoQuizIndicatorBarClassName: '',
  VideoPlayPauseBtnClassName: '',
  VideoFullscreenBtnClassName: '',
  VideoModalClassName: '',
  VideoModalQuestionClassName: '',
  VideoVolumeBtnClassName: '',
  VideoVolumeBarClassName: '',

  duration: 0,
  played: 0,
  loaded: 0,
  playing: true,
  isQuizSecs: false,
  questionSecsStateArray: []
};

class VideoComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      url: 'https://www.youtube.com/watch?v=PTkKJI27NlE',
      volume: 0.8,
      playbackRate: 1.0,
      isMute: false,
      volumeBeforeMute: 0,
      isVolumeBtnMouseOver: false
    };
  }

  render() {
    const {
      url,
      volume,
      isMute,
      isVolumeBtnMouseOver,
      playbackRate
    } = this.state;

    const {
      VideoContainerClassName,
      VideoPlayerWrapperClassName,
      VideoPlayerClassName,
      VideoProgressBarClassName,
      VideoBarClassName,
      VideoControllerBarClassName,
      VideoPlayedBarClassName,
      VideoLoadedBarClassName,
      VideoQuizIndicatorClassName,
      VideoQuizIndicatorBarClassName,
      VideoPlayPauseBtnClassName,
      VideoFullscreenBtnClassName,
      VideoVolumeBtnClassName,
      VideoVolumeBarClassName,

      setPlayer,
      onProgress,
      onDuration,
      duration,
      played,
      loaded,
      playing,
      isQuizSecs,
      questionSecsStateArray
    } = this.props;

    return (
      <div className={ classNames(VideoContainerClassName) }>
        <VideoPlayerComponent
          VideoPlayerWrapperClassName={ VideoPlayerWrapperClassName }
          VideoPlayerClassName={ VideoPlayerClassName }
          url={ url }
          playing={ playing }
          volume={ volume }
          played={ played }
          loaded={ loaded }
          duration={ duration }
          playbackRate={ playbackRate }
          onProgress={ onProgress }
          onDuration={ onDuration }
          setPlayer={ setPlayer } />

        <div className={ VideoControllerBarClassName }>
          <VideoControllerAndBarWrapperComponent>
            <div>
              <VideoCustomProgressBarComponent
                VideoProgressBarClassName={ VideoProgressBarClassName }
                VideoBarClassName={ VideoBarClassName }
                VideoPlayedBarClassName={ VideoPlayedBarClassName }
                VideoLoadedBarClassName={ VideoLoadedBarClassName }
                VideoQuizIndicatorClassName={ VideoQuizIndicatorClassName }
                VideoQuizIndicatorBarClassName={ VideoQuizIndicatorBarClassName }

                onQuestionbarClick={ this.onQuestionbarClick }
                duration={ duration }
                playedPercentage={ played }
                loadedPercentage={ loaded }
                onCustomSeekBarMouseDown={ this.onCustomSeekBarMouseDown }
                onCustomSeekBarChange={ this.onCustomSeekBarChange }
                onCustomSeekBarMouseUp={ this.onCustomSeekBarMouseUp }
                onCustomSeekBarClick={ this.onCustomSeekBarClick }
                onArrowKeyPressed={ this.onArrowKeyPressed }

                quizTimeArray={ questionSecsStateArray }
                canChangeIsQuizSecs={ this.canChangeIsQuizSecs }
                isQuizSecs={ isQuizSecs } />

              <VideoControllerWrapperComponent>
                <VideoButtonComponent
                  buttonClass={ VideoPlayPauseBtnClassName }
                  srcSet={ playing ? PlayBtnIcon : PauseBtnIcon }
                  onButtonClick={ this.onClickPlayPause } />
                <VideoButtonComponent
                  buttonClass={ VideoVolumeBtnClassName }
                  srcSet={ !isMute ? VolumeOnBtnIcon : VolumeOffBtnIcon }
                  onButtonClick={ this.onClickVolumeBtn }
                  onButtonMouseOver={ this.onVolumeBtnMouseOver }
                  onButtonMouseLeave={ this.onVolumeBtnMouseLeave } />

                <VideoVolumeBarComponent
                  onVolumeBarChange={ this.setVolume }
                  barClass={ VideoVolumeBarClassName }
                  volume={ volume }
                  visible={ isVolumeBtnMouseOver } />

                <VideoTimePanelComponent
                  duration={ duration }
                  elapsed={ played * duration } />

                <VideoButtonComponent
                  buttonClass={ VideoFullscreenBtnClassName }
                  srcSet={ FullscreenBtnIcon }
                  onButtonClick={ this.onClickFullscreen } />
              </VideoControllerWrapperComponent>
            </div>
          </VideoControllerAndBarWrapperComponent>
        </div>
      </div>
    );
  }

  @autobind
  setVolume(e) {
    this.setState({ volume: parseFloat(e.target.value) });
  }

  @autobind
  onClickVolumeBtn() {
    if (this.state.isMute) {
      this.setState({ isMute: false, volume: this.state.volumeBeforeMute });
    } else {
      const volumeBeforeMute = this.state.volume;
      this.setState({ isMute: true, volumeBeforeMute, volume: 0 });
    }
  }

  @autobind
  onVolumeBtnMouseOver() {
    this.setState({ isVolumeBtnMouseOver: true });
  }

  @autobind
  onVolumeBtnMouseLeave() {
    this.setState({ isVolumeBtnMouseOver: false });
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
  onClickPlayPause() {
    this.props.setPlayingState(!this.props.playing);
  }

  @autobind
  onClickFullscreen() {
    // screenfull.request(findDOMNode(this.player));
    alert('Warn: This function still not define');
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

  @autobind
  onQuestionSolved() {
    const { played, duration } = this.props;
    const solvedSecs = convertPercentageToSecs(played, duration);
    const secsAddOneFromSolvedSecs = solvedSecs + 1;
    const changedPlayedPercentage = convertSecsToPercentage(secsAddOneFromSolvedSecs, duration);
    this.props.setIsQuizSecsState(false);
    this.props.setPlayingState(true);
    this.props.setPlayedState(changedPlayedPercentage);
    this.props.playerSeekTo(changedPlayedPercentage);
  }

  @autobind
  onQuestionbarClick({ label }) {
    this.props.onQuestionbarClick({ label });
  }
}

VideoComponent.propTypes = propTypes;
VideoComponent.defaultProps = defaultProps;

export default VideoComponent;
