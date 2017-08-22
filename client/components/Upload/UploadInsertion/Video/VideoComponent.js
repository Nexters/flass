import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autobind from 'autobind-decorator';

import {
  VideoPlayerComponent,
  VideoButtonComponent,
  VideoVolumeComponent,
  VideoVolumeWrapperComponent,
  VideoTimePanelComponent,
  VideoCustomProgressBarComponent,
  VideoControllerWrapperComponent,
  VideoControllerAndBarWrapperComponent,
  VideoEndedPageComponent,

  PlayBtnIcon,
  PauseBtnIcon,
  VolumeOnBtnIcon,
  VolumeOffBtnIcon
} from '../../../Video';

import {
  VideoStyled,
  StyledPlayerOnUploadPage,
  EndedPageOnUploadPage
} from './VideoStyled';

import {
  convertPercentageToSecs,
  convertSecsToPercentage
} from '../../../Video/VideoUtils';

const { string, oneOfType, arrayOf, func, number, bool, shape } = PropTypes;

const propTypes = {
  VideoBarClassName: oneOfType([string, arrayOf(string)]),
  VideoPlayedBarClassName: oneOfType([string, arrayOf(string)]),
  VideoLoadedBarClassName: oneOfType([string, arrayOf(string)]),
  VideoQuizIndicatorClassName: oneOfType([string, arrayOf(string)]),
  VideoQuizIndicatorBarClassName: oneOfType([string, arrayOf(string)]),
  VideoPlayPauseBtnClassName: oneOfType([string, arrayOf(string)]),
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
  VideoBarClassName: '',
  VideoPlayedBarClassName: '',
  VideoLoadedBarClassName: '',
  VideoQuizIndicatorClassName: '',
  VideoQuizIndicatorBarClassName: '',
  VideoPlayPauseBtnClassName: '',
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
      volumeBeforeMute: 0,
      isMute: false,
      isVolumeBtnMouseOver: false,
      isEnded: false
    };
  }

  render() {
    const {
      url,
      volume,
      playbackRate,
      isMute,
      isEnded
    } = this.state;

    const {
      VideoBarClassName,
      VideoPlayedBarClassName,
      VideoLoadedBarClassName,
      VideoQuizIndicatorClassName,
      VideoQuizIndicatorBarClassName,
      VideoPlayPauseBtnClassName,
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
      <VideoStyled.Container>
        <VideoPlayerComponent
          styledProps={ StyledPlayerOnUploadPage }
          url={ url }
          playing={ playing }
          volume={ volume }
          played={ played }
          loaded={ loaded }
          duration={ duration }
          playbackRate={ playbackRate }
          onProgress={ onProgress }
          onDuration={ onDuration }
          onEnded={ this.onEnded }
          setPlayer={ setPlayer } />

        {
          this.renderEndedPage(isEnded)
        }

        <VideoStyled.ControllerBar>
          <VideoControllerAndBarWrapperComponent>
            <div>
              <VideoCustomProgressBarComponent
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
                onQuestionbarClick={ this.onQuestionbarClick }

                quizTimeArray={ questionSecsStateArray }
                canChangeIsQuizSecs={ this.canChangeIsQuizSecs }
                isQuizSecs={ isQuizSecs }
                searchableSecs={ duration } />

              <VideoControllerWrapperComponent>
                <VideoButtonComponent
                  buttonClass={ VideoPlayPauseBtnClassName }
                  srcSet={ playing ? PauseBtnIcon : PlayBtnIcon }
                  onButtonClick={ this.onClickPlayPause } />

                <VideoTimePanelComponent
                  duration={ duration }
                  elapsed={ played * duration } />

                <VideoVolumeWrapperComponent>
                  <VideoButtonComponent
                    buttonClass={ VideoVolumeBtnClassName }
                    srcSet={ !isMute ? VolumeOnBtnIcon : VolumeOffBtnIcon }
                    onButtonClick={ this.onClickVolumeBtn }
                    onButtonMouseOver={ this.onVolumeBtnMouseOver }
                    onButtonMouseLeave={ this.onVolumeBtnMouseLeave } />

                  <VideoVolumeComponent
                    onVolumebarClick={ this.onVolumebarClick }
                    barClass={ VideoVolumeBarClassName }
                    volume={ volume } />
                </VideoVolumeWrapperComponent>

              </VideoControllerWrapperComponent>
            </div>
          </VideoControllerAndBarWrapperComponent>
        </VideoStyled.ControllerBar>
      </VideoStyled.Container>
    );
  }

  @autobind
  renderEndedPage(isEnded) {
    return isEnded ?
      <VideoEndedPageComponent
        onReplayBtnClick={ this.onReplayBtnClick }
        styledProps={ EndedPageOnUploadPage } /> :
      null;
  }

  @autobind
  onReplayBtnClick() {
    this.setState({ played: 0, playing: true, isEnded: false });
    this.props.playerSeekTo(0);
  }

  @autobind
  onEnded() {
    this.setState({ isEnded: true, playing: false });
  }

  @autobind
  onVolumebarClick(barIndex) {
    const volume = parseFloat(0.1 * (barIndex + 1));
    this.setState({ volume });
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
