import _ from 'lodash';
import { List } from 'immutable';
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
  VideoModalComponent,
  VideoControllerAndBarWrapperComponent,
  VideoEndedPageComponent,

  PlayBtnIcon,
  PauseBtnIcon,
  VolumeOnBtnIcon,
  VolumeOffBtnIcon
} from '../../../FlassCommon/Video';

import {
  convertSecsToPercentage,
  updatePlayedPercentage
} from '../../../FlassCommon/Video/VideoUtils';

import {
  FlassDetailVideo,
  StyledPlayerOnDetailPage,
  EndedPageOnDetailPage
} from './VideoStyled';

const { string, oneOfType, arrayOf, func, number, array, shape, bool } = PropTypes;

const propTypes = {
  VideoBarClassName: oneOfType([string, arrayOf(string)]),
  VideoPlayedBarClassName: oneOfType([string, arrayOf(string)]),
  VideoLoadedBarClassName: oneOfType([string, arrayOf(string)]),
  VideoQuizIndicatorClassName: oneOfType([string, arrayOf(string)]),
  VideoQuizIndicatorBarClassName: oneOfType([string, arrayOf(string)]),
  VideoPlayPauseBtnClassName: oneOfType([string, arrayOf(string)]),
  VideoVolumeBtnClassName: oneOfType([string, arrayOf(string)]),
  VideoVolumeBarClassName: oneOfType([string, arrayOf(string)]),
  updateStateAfterSolveQuestion: func.isRequired,
  setCompleteVideoFlag: func.isRequired,
  resetCompleteVideoFlag: func.isRequired,
  requestOnEnded: func.isRequired,

  videoUrl: string,
  questions: shape({
    secsStateOfQuestions: array,
    textStateOfQuestions: array
  }).isRequired,
  isVideoComplete: bool.isRequired,
  solvedQuestionsState: arrayOf(shape({
    id: number,
    indexOfQuestion: number,
    isCorrect: bool,
    indexOfSelectedChoice: number,
    indexOfAnswer: number
  })).isRequired
};

const defaultProps = {
  VideoControllerBarClassName: '',
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
      isMute: false,
      isEnded: false,
      volumeBeforeMute: 0,
      isVolumeBtnMouseOver: false,
      isQuizSecs: false,
      indexOfQuestion: -1,
      searchableSecs: 0,
      isSearchableSecsInit: false
    };
  }

  componentWillReceiveProps(nextProps) {
    const { questions } = nextProps;

    if (!_.isEmpty(questions)) {
      this.updateSearchableSecsState(nextProps);
    }
  }

  componentWillUnmount() {
    this.props.resetCompleteVideoFlag();
  }

  render() {
    const {
      playing,
      volume,
      isMute,
      isEnded,
      played,
      loaded,
      duration,
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
          styledProps={ StyledPlayerOnDetailPage }
          url={ videoUrl }
          playing={ playing }
          volume={ volume }
          played={ played }
          loaded={ loaded }
          duration={ duration }
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
                onQuestionbarClick={ this.onQuestionbarClick }

                quizTimeArray={ secsStateOfQuestions }
                canChangeIsQuizSecs={ this.canChangeIsQuizSecs }
                isQuizSecs={ isQuizSecs }
                searchableSecs={ searchableSecs } />

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
        </FlassDetailVideo.ControllerBar>
      </FlassDetailVideo.Container>
    );
  }

  updateSearchableSecsState({ searchableSecs, questions }) {
    if (!this.state.isSearchableSecsInit) {
      return this.initalizeSearchableSecs({ questions });
    }
    if (this.state.searchableSecs !== searchableSecs) {
      this.setState({ searchableSecs });
    }
  }

  initalizeSearchableSecs({ questions }) {
    const { secsStateOfQuestions } = questions;
    if (_.isEmpty(secsStateOfQuestions)) {
      return;
    }
    const searchableSecs = secsStateOfQuestions[0].playedSeconds;
    if (searchableSecs) {
      this.setState({ searchableSecs, isSearchableSecsInit: true });
    }
  }


  @autobind
  renderEndedPage(isEnded) {
    return isEnded ?
      <VideoEndedPageComponent
        onReplayBtnClick={ this.onReplayBtnClick }
        styledProps={ EndedPageOnDetailPage } /> :
      null;
  }

  @autobind
  renderQuestionModal(isQuizSecs) {
    const { indexOfQuestion } = this.state;
    const {
      questions: {
        textStateOfQuestions
      },
      solvedQuestionsState,
      isVideoComplete
    } = this.props;

    return (
      isQuizSecs ?
        <VideoModalComponent
          onQuestionSolved={ this.onQuestionSolved }
          textStateOfQuestions={ textStateOfQuestions }
          indexOfQuestion={ indexOfQuestion }
          isVideoComplete={ isVideoComplete }
          solvedQuestionsState={ solvedQuestionsState }
          onKeepGoingOnVideoCompleteCase={ this.onKeepGoingOnVideoCompleteCase } /> :
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
    const { solvedQuestionsState } = this.props;
    this.setState({ isEnded: true, playing: false });
    this.props.requestOnEnded(solvedQuestionsState);
    this.props.setCompleteVideoFlag();
  }

  @autobind
  setVolume(e) {
    this.setState({ volume: parseFloat(e.target.value) });
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
    this.setState({ seeking: true });
  }

  @autobind
  onCustomSeekBarChange(changedPlayed) {
    console.log('changed::');
    const changedPlayedPercentage = changedPlayed / 100;
    console.log(changedPlayedPercentage);
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
    console.log('clicked::');
    console.log(changedPlayedPercentage);
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
      id,
      indexOfQuestion,
      isCorrect,
      indexOfSelectedChoice,
      indexOfAnswer
    } = solvedQuestionState;
    const { played, duration } = this.state;
    const updatedPlayedPercentage = updatePlayedPercentage(played, duration, 1);
    const searchableSecs = this.findSearchableSecs(indexOfQuestion);

    this.setState({
      isQuizSecs: false,
      playing: true,
      played: updatedPlayedPercentage
    });
    this.player.seekTo(updatedPlayedPercentage);
    this.props.updateStateAfterSolveQuestion({
      id,
      indexOfQuestion,
      isCorrect,
      indexOfSelectedChoice,
      indexOfAnswer,
      searchableSecs
    });
  }

  @autobind
  onKeepGoingOnVideoCompleteCase() {
    const { played, duration } = this.state;
    const updatedPlayedPercentage = updatePlayedPercentage(played, duration, 1);

    this.setState({
      isQuizSecs: false,
      playing: true,
      played: updatedPlayedPercentage
    });
    this.player.seekTo(updatedPlayedPercentage);
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

  @autobind
  onQuestionbarClick({ label }) {
    const { duration } = this.state;
    const { questions: { secsStateOfQuestions } } = this.props;
    const { playedSeconds } = this.findSecsStateByLabel(secsStateOfQuestions, label);
    const updatedPlayedPercentage = updatePlayedPercentage(
      convertSecsToPercentage(playedSeconds, duration),
      duration,
      -1
    );
    this.setState({ played: updatedPlayedPercentage });
    this.player.seekTo(updatedPlayedPercentage);
  }

  findSecsStateByLabel(questionSecsStateArray, targetLabel) {
    return List(questionSecsStateArray)
      .filter(({ label }) => (label === targetLabel))
      .toArray()[0];
  }
}

Video.propTypes = propTypes;
Video.defaultProps = defaultProps;

export default Video;
