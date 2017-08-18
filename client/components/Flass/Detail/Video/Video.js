import _ from 'lodash';
import { List } from 'immutable';
import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
import autobind from 'autobind-decorator';
import screenfull from 'screenfull';

import {
  VideoPlayerComponent,
  VideoButtonComponent,
  VideoVolumeBarComponent,
  VideoTimePanelComponent,
  VideoCustomProgressBarComponent,
  VideoControllerWrapperComponent,
  VideoModalComponent,
  VideoControllerAndBarWrapperComponent,
  VideoEndedPageComponent
} from '../../../Video';

import {
  convertPercentageToSecs,
  convertSecsToPercentage
} from '../../../Video/VideoUtils';

import {
  FlassDetailVideo,
  ReplayBtn
} from './VideoStyled';

// 팝업 테스트를 위한 더미 action
import * as actions from '../../../../modules/Flass/Detail/Video/VideoActions';

import PlayBtnIcon from '../../../../../public/icons/play_btn.png';
import PauseBtnIcon from '../../../../../public/icons/pause@2x.png';
import VolumeOnBtnIcon from '../../../../../public/icons/speak_btn.png';
import VolumeOffBtnIcon from '../../../../../public/icons/non-speak@2x.png';
import FullscreenBtnIcon from '../../../../../public/icons/view_btn.png';

const { string, oneOfType, arrayOf, func, number, object, array, shape } = PropTypes;

const propTypes = {
  VideoBarClassName: oneOfType([string, arrayOf(string)]),
  VideoPlayedBarClassName: oneOfType([string, arrayOf(string)]),
  VideoLoadedBarClassName: oneOfType([string, arrayOf(string)]),
  VideoQuizIndicatorClassName: oneOfType([string, arrayOf(string)]),
  VideoQuizIndicatorBarClassName: oneOfType([string, arrayOf(string)]),
  VideoPlayPauseBtnClassName: oneOfType([string, arrayOf(string)]),
  VideoFullscreenBtnClassName: oneOfType([string, arrayOf(string)]),
  VideoVolumeBtnClassName: oneOfType([string, arrayOf(string)]),
  VideoVolumeBarClassName: oneOfType([string, arrayOf(string)]),
  updateStateAfterSolveQuestion: func.isRequired,

  videoUrl: string,
  questions: shape({
    id: number,
    content: string,
    title: string,
    questionAt: string,
    secsStateOfQuestions: array,
    textStateOfQuestions: array
  }).isRequired
};

const defaultProps = {
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

  videoUrl: ''
};

class Video extends Component {
  constructor(props) {
    super(props);

    this.state = {
      playing: true,
      volume: 0.8,
      played: 0,
      loaded: 0,
      duration: 0,
      playbackRate: 1.0,
      isMute: false,
      isEnded: false,
      volumeBeforeMute: 0,
      isVolumeBtnMouseOver: false,
      isQuizSecs: false,
      indexOfQuestion: -1,
      searchableSecs: 0
    };
  }

  componentWillReceiveProps(nextProps) {
    const { questions } = nextProps;

    if (!_.isEmpty(questions)) {
      this.updateSearchableSecsState(nextProps);
    }
  }

  render() {
    const {
      playing,
      volume,
      isMute,
      isEnded,
      isVolumeBtnMouseOver,
      played,
      loaded,
      duration,
      playbackRate,
      isQuizSecs,
      searchableSecs
    } = this.state;
    const {
      VideoBarClassName,
      VideoPlayedBarClassName,
      VideoLoadedBarClassName,
      VideoQuizIndicatorClassName,
      VideoQuizIndicatorBarClassName,
      VideoPlayPauseBtnClassName,
      VideoFullscreenBtnClassName,
      VideoVolumeBtnClassName,
      VideoVolumeBarClassName,

      videoUrl,
      questions: {
        secsStateOfQuestions
      }
    } = this.props;

    return (
      <FlassDetailVideo.Container>
        <VideoPlayerComponent
          url={ videoUrl }
          playing={ playing }
          volume={ volume }
          played={ played }
          loaded={ loaded }
          duration={ duration }
          playbackRate={ playbackRate }
          onProgress={ this.onProgress }
          onDuration={ this.onDuration }
          onEnded={ this.onEnded }
          setPlayer={ this.setPlayer } />
        {
          this.renderEndedPage(isEnded)
        }

        {
          this.renderQuestionModal(isQuizSecs)
        }

        <FlassDetailVideo.ControllerBar>
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

                quizTimeArray={ secsStateOfQuestions }
                canChangeIsQuizSecs={ this.canChangeIsQuizSecs }
                isQuizSecs={ isQuizSecs }
                searchableSecs={ searchableSecs } />

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
        </FlassDetailVideo.ControllerBar>
      </FlassDetailVideo.Container>
    );
  }

  updateSearchableSecsState({ searchableSecs, questions }) {
    if (!this.isSearchableSecsInit()) {
      return this.initalizeSearchableSecs({ questions });
    }
    if (this.state.searchableSecs !== searchableSecs) {
      this.setState({ searchableSecs });
    }
  }

  isSearchableSecsInit() {
    return this.state.searchableSecs !== 0;
  }

  initalizeSearchableSecs({ questions }) {
    const { secsStateOfQuestions } = questions;
    const searchableSecs = secsStateOfQuestions[0].playedSeconds;
    this.setState({ searchableSecs });
  }


  @autobind
  renderEndedPage(isEnded) {
    return isEnded ?
      <VideoEndedPageComponent
        onReplayBtnClick={ this.onReplayBtnClick } /> :
      null;
  }

  @autobind
  renderQuestionModal(isQuizSecs) {
    const { indexOfQuestion } = this.state;
    const { questions: { textStateOfQuestions } } = this.props;

    return (
      isQuizSecs ?
        <VideoModalComponent
          onQuestionSolved={ this.onQuestionSolved }
          textStateOfQuestions={ textStateOfQuestions }
          indexOfQuestion={ indexOfQuestion } /> :
        null
    );
  }


  @autobind
  setPlayer(player) {
    this.player = player;
  }

  @autobind
  onDuration(duration) {
    this.setState({ duration });
  }

  @autobind
  onProgress(state) {
    if (!this.state.seeking) {
      this.setState(state);
    }
  }

  @autobind
  onEnded() {
    this.setState({ isEnded: true, playing: false });
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
    this.setState({ seeking: true });
  }

  @autobind
  onCustomSeekBarChange(changedPlayed) {
    const changedPlayedPercentage = changedPlayed / 100;
    this.setState({ played: changedPlayedPercentage });
  }

  @autobind
  onCustomSeekBarMouseUp(changedPlayed) {
    const changedPlayedPercentage = changedPlayed / 100;
    this.setState({ seeking: false });
    this.player.seekTo(changedPlayedPercentage);
  }

  @autobind
  onCustomSeekBarClick(changedPlayed) {
    const changedPlayedPercentage = changedPlayed / 100;
    this.setState({ played: changedPlayedPercentage });
    this.player.seekTo(changedPlayedPercentage);
  }

  @autobind
  onArrowKeyPressed(changedPlayed) {
    const changedPlayedPercentage = changedPlayed / 100;
    this.setState({ played: changedPlayedPercentage });
    this.player.seekTo(changedPlayedPercentage);
  }

  @autobind
  onClickPlayPause() {
    this.setState({ playing: !this.state.playing });
  }

  @autobind
  onClickFullscreen() {
    screenfull.request(findDOMNode(this.player));
  }


  @autobind
  canChangeIsQuizSecs(playedSecs) {
    const {
      questions: {
        secsStateOfQuestions
      }
    } = this.props;

    if (this.isEqlQuizSecsWithPlayedSecs(playedSecs, secsStateOfQuestions)) {
      const indexOfQuestion = this.findIndexOfQuestionFromSecsStateArray(playedSecs, secsStateOfQuestions);
      this.setState({ isQuizSecs: true, playing: false, indexOfQuestion });
    }
  }

  isEqlQuizSecsWithPlayedSecs(playedSecs, quizSecsArray) {
    if (!quizSecsArray) {
      return false;
    }

    return quizSecsArray
      .filter(({ playedSeconds }) => playedSeconds === playedSecs)
      .length !== 0;
  }

  findIndexOfQuestionFromSecsStateArray(playedSecs, secsStateOfQuestions) {
    return List(secsStateOfQuestions)
      .findKey(({ playedSeconds }) => playedSeconds === playedSecs);
  }

  @autobind
  onQuestionSolved(solvedQuestionState) {
    const {
      indexOfQuestion,
      isCorrect,
      indexOfSelectedChoice,
      indexOfAnswer
    } = solvedQuestionState;
    const { played, duration } = this.state;
    const updatedPlayedPercentage = this.updatePlayedPercentage(played, duration);
    const searchableSecs = this.findSearchableSecs(indexOfQuestion);

    this.setState({
      isQuizSecs: false,
      playing: true,
      played: updatedPlayedPercentage
    });
    this.player.seekTo(updatedPlayedPercentage);
    this.props.updateStateAfterSolveQuestion({
      indexOfQuestion,
      isCorrect,
      indexOfSelectedChoice,
      indexOfAnswer,
      searchableSecs
    });
  }

  updatePlayedPercentage(played, duration) {
    const solvedSecs = convertPercentageToSecs(played, duration);
    const secsAddOneFromSolvedSecs = solvedSecs + 1;
    return convertSecsToPercentage(secsAddOneFromSolvedSecs, duration);
  }

  findSearchableSecs(indexOfQuestion) {
    const { duration } = this.state;
    const { questions: { secsStateOfQuestions } } = this.props;

    if (!secsStateOfQuestions[indexOfQuestion + 1]) {
      return duration;
    }

    return secsStateOfQuestions[indexOfQuestion + 1].playedSeconds;
  }

  @autobind
  onReplayBtnClick() {
    this.setState({ played: 0, playing: true, isEnded: false });
    this.player.seekTo(0);
  }
}

Video.propTypes = propTypes;
Video.defaultProps = defaultProps;

export default Video;
