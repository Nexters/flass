import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
import autobind from 'autobind-decorator';
import classNames from 'classnames';
import screenfull from 'screenfull';

import {
  VideoPlayerComponent,
  VideoButtonComponent,
  VideoVolumeBarComponent,
  VideoCustomProgressBarComponent,
  VideoControllerWrapperComponent
} from '../../../Video';

import PlayBtnIcon from '../../../../../public/play_arrow_24dp_1x.png';
import PauseBtnIcon from '../../../../../public/pause_24dp_1x.png';
import FullscreenBtnIcon from '../../../../../public/web_asset_24dp_1x.png';

const { string, oneOfType, arrayOf } = PropTypes;

const propTypes = {
  VideoContainerClassName: oneOfType([string, arrayOf(string)]),
  VideoPlayerClassName: oneOfType([string, arrayOf(string)]),
  VideoProgressBarClassName: oneOfType([string, arrayOf(string)]),
  VideoControllerBarClassName: oneOfType([string, arrayOf(string)]),
  VideoPlayedBarClassName: oneOfType([string, arrayOf(string)]),
  VideoLoadedBarClassName: oneOfType([string, arrayOf(string)]),
  VideoQuizIndicatorClassName: oneOfType([string, arrayOf(string)]),
  VideoQuizIndicatorBarClassName: oneOfType([string, arrayOf(string)]),
  VideoPlayPauseBtnClassName: oneOfType([string, arrayOf(string)]),
  VideoFullscreenBtnClassName: oneOfType([string, arrayOf(string)])
};

const defaultProps = {
  VideoContainerClassName: '',
  VideoPlayerClassName: '',
  VideoProgressBarClassName: '',
  VideoControllerBarClassName: '',
  VideoPlayedBarClassName: '',
  VideoLoadedBarClassName: '',
  VideoQuizIndicatorClassName: '',
  VideoQuizIndicatorBarClassName: '',
  VideoPlayPauseBtnClassName: '',
  VideoFullscreenBtnClassName: ''
};

class Video extends Component {
  constructor(props) {
    super(props);

    this.state = {
      url: 'https://www.youtube.com/watch?v=PTkKJI27NlE',
      playing: true,
      volume: 0.8,
      played: 0,
      loaded: 0,
      duration: 0,
      playbackRate: 1.0
    };
  }

  render() {
    const { url, playing, volume, played, loaded, duration, playbackRate, youtubeConfig } = this.state;
    const {
      VideoContainerClassName,
      VideoPlayerClassName,
      VideoProgressBarClassName,
      VideoControllerBarClassName,
      VideoPlayedBarClassName,
      VideoLoadedBarClassName,
      VideoQuizIndicatorClassName,
      VideoQuizIndicatorBarClassName,
      VideoPlayPauseBtnClassName,
      VideoFullscreenBtnClassName
    } = this.props;

    return (
      <div className={ classNames(VideoContainerClassName) }>
        <VideoPlayerComponent
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
            onArrowKeyPressed={ this.onArrowKeyPressed } />

          <VideoControllerWrapperComponent>
            <VideoButtonComponent
              buttonClass={ VideoPlayPauseBtnClassName }
              srcSet={ PlayBtnIcon }
              onButtonClick={ this.onClickPlayPause } />
            <VideoButtonComponent
              buttonClass={ VideoFullscreenBtnClassName }
              srcSet={ FullscreenBtnIcon }
              onButtonClick={ this.onClickFullscreen } />
          </VideoControllerWrapperComponent>
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
}

Video.propTypes = propTypes;
Video.defaultProps = defaultProps;

export default Video;