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
  VideoModalComponent,
  VideoControllerAndBarWrapperComponent
} from '../../../Video';

import {
  convertPercentageToSecs,
  convertSecsToPercentage
} from '../../../Video/VideoUtils';

import PlayBtnIcon from '../../../../../public/play_arrow_24dp_1x.png';
import PauseBtnIcon from '../../../../../public/pause_24dp_1x.png';
import VolumeOnBtnIcon from '../../../../../public/volume_up_24dp_1x.png';
import VolumeOffBtnIcon from '../../../../../public/volume_off_24dp_1x.png';
import FullscreenBtnIcon from '../../../../../public/web_asset_24dp_1x.png';

const { string, oneOfType, arrayOf, func, number } = PropTypes;

const propTypes = {
  VideoContainerClassName: oneOfType([string, arrayOf(string)]),
  VideoPlayerWrapperClassName: oneOfType([string, arrayOf(string)]),
  VideoPlayerClassName: oneOfType([string, arrayOf(string)]),
  VideoProgressBarClassName: oneOfType([string, arrayOf(string)]),
  VideoControllerBarClassName: oneOfType([string, arrayOf(string)]),
  VideoPlayedBarClassName: oneOfType([string, arrayOf(string)]),
  VideoLoadedBarClassName: oneOfType([string, arrayOf(string)]),
  VideoQuizIndicatorClassName: oneOfType([string, arrayOf(string)]),
  VideoQuizIndicatorBarClassName: oneOfType([string, arrayOf(string)]),
  VideoPlayPauseBtnClassName: oneOfType([string, arrayOf(string)]),
  VideoFullscreenBtnClassName: oneOfType([string, arrayOf(string)]),
  VideoModalClassName: oneOfType([string, arrayOf(string)]),
  VideoModalQuestionClassName: oneOfType([string, arrayOf(string)]),
  VideoVolumeBtnClassName: oneOfType([string, arrayOf(string)]),
  VideoVolumeBarClassName: oneOfType([string, arrayOf(string)])
};
const defaultProps = {
  VideoContainerClassName: '',
  VideoPlayerWrapperClassName: '',
  VideoPlayerClassName: '',
  VideoProgressBarClassName: '',
  VideoControllerBarClassName: '',
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
};

class VideoComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      url: 'https://www.youtube.com/watch?v=PTkKJI27NlE',
      playing: true,
      volume: 0.8,
      played: 0,
      loaded: 0,
      duration: 0,
      playbackRate: 1.0,
      isMute: false,
      volumeBeforeMute: 0,
      isVolumeBtnMouseOver: false,
      isQuizSecs: false
    };
  }

  render() {
    const {
      url,
      playing,
      volume,
      isMute,
      isVolumeBtnMouseOver,
      played,
      loaded,
      duration,
      playbackRate,
      youtubeConfig,
      isQuizSecs
    } = this.state;

    const {
      VideoContainerClassName,
      VideoPlayerWrapperClassName,
      VideoPlayerClassName,
      VideoProgressBarClassName,
      VideoControllerBarClassName,
      VideoPlayedBarClassName,
      VideoLoadedBarClassName,
      VideoQuizIndicatorClassName,
      VideoQuizIndicatorBarClassName,
      VideoPlayPauseBtnClassName,
      VideoFullscreenBtnClassName,
      VideoModalClassName,
      VideoModalQuestionClassName,
      VideoVolumeBtnClassName,
      VideoVolumeBarClassName
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
          youtubeConfig={ youtubeConfig }
          onProgress={ this.onProgress }
          onDuration={ this.onDuration }
          setPlayer={ this.setPlayer } />

        <div className={ VideoControllerBarClassName }>
          <VideoControllerAndBarWrapperComponent>
            <div>
              <VideoCustomProgressBarComponent
                VideoProgressBarClassName={ VideoProgressBarClassName }
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
    // const { quizTimeArrayForPopupTest } = this.props;
    const quizTimeArrayForPopupTest = [];

    if (this.isEqlQuizSecsWithPlayedSecs(playedSecs, quizTimeArrayForPopupTest)) {
      this.setState({ isQuizSecs: true, playing: false });
    }
  }

  isEqlQuizSecsWithPlayedSecs(playedSecs, quizSecsArray) {
    return quizSecsArray.indexOf(playedSecs) !== -1;
  }

  @autobind
  onQuestionSolved() {
    const { played, duration } = this.state;
    const solvedSecs = convertPercentageToSecs(played, duration);
    const secsAddOneFromSolvedSecs = solvedSecs + 1;
    const changedPlayedPercentage = convertSecsToPercentage(secsAddOneFromSolvedSecs, duration);
    this.setState({ isQuizSecs: false, playing: true, played: changedPlayedPercentage });
    this.player.seekTo(changedPlayedPercentage);
  }
}

VideoComponent.propTypes = propTypes;
VideoComponent.defaultProps = defaultProps;

export default VideoComponent;
