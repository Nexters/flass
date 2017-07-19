import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import screenfull from 'screenfull';
import autobind from 'autobind-decorator';

import VideoPlayerComponent from './VideoPlayerComponent';
import VideoButtonComponent from './VideoButtonComponent';
import VideoVolumeBarComponent from './VideoVolumeBarComponent';
import VideoCustomProgressBarComponent from './VideoCustomProgressBarComponent/VideoCustomProgressBarComponent';

import QuizComponent from '../Quiz/QuizComponent';

import '../../css/base/_row.scss';

const propTypes = {};
const defaultProps = {};

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
      player: null
    };
  }

  render() {
    const { url, playing, volume, played, loaded, duration, playbackRate, youtubeConfig, fileConfig } = this.state;

    return (
      <div>
        <div className="row--equal-height-at-large">
          <div className="row__large-8">
            <VideoPlayerComponent
              url={ url }
              playing={ playing }
              volume={ volume }
              played={ played }
              loaded={ loaded }
              duration={ duration }
              playbackRate={ playbackRate }
              youtubeConfig={ youtubeConfig }
              onProgress={ this.onProgress }
              setPlayer={ this.setPlayer } />
          </div>

          <div className="row__large-4">
            <QuizComponent
              playedSeconds={ (duration * played).toFixed(3) } />
          </div>
        </div>

        <div>
          <VideoCustomProgressBarComponent
            duration={ duration }
            playedPercentage={ played }
            loadedPercentage={ loaded }
            onCustomSeekBarMouseDown={ this.onCustomSeekBarMouseDown }
            onCustomSeekBarChange={ this.onCustomSeekBarChange }
            onCustomSeekBarMouseUp={ this.onCustomSeekBarMouseUp }
            onCustomSeekBarClick={ this.onCustomSeekBarClick }
            onArrowKeyPressed={ this.onArrowKeyPressed } />
        </div>
        <div>
          <div>
            <div>볼륨</div>
            <VideoVolumeBarComponent
              volume={ volume }
              onVolumeBarChange={ this.onClickSetVolume } />
          </div>

          <div>
            <VideoButtonComponent
              buttonClass="btn__stop"
              buttonTitle="정지"
              onButtonClick={ this.onClickStop } />
            <VideoButtonComponent
              buttonClass="btn__playpause"
              buttonTitle={ playing ? '일시정지' : '시작' }
              onButtonClick={ this.onClickPlayPause } />
            <VideoButtonComponent
              buttonClass="btn__fullscreen"
              buttonTitle="전체화면"
              onButtonClick={ this.onClickFullscreen } />
          </div>

        </div>
      </div>
    );
  }

  @autobind
  setPlayer(player) {
    this.player = player;
  }
  @autobind
  onProgress(state) {
    if (!this.state.seeking) {
      this.setState(state);
    }
  }

  @autobind
  onClickStop() {
    this.setState({ url: null, playing: false });
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
  onClickSetPlaybackRate(e) {
    const rate = parseFloat(e.target.value);
    this.setState({ playbackRate: rate });
  }

  @autobind
  onSeekBarMouseDown() {
    this.setState({ seeking: true });
  }

  @autobind
  onSeekBarChange(e) {
    const played = parseFloat(e.target.value);
    this.setState({ played });
  }

  @autobind
  onSeekBarMouseUp(e) {
    const played = parseFloat(e.target.value);
    this.setState({ seeking: false });
    this.state.player.seekTo(played);
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
  onClickSetVolume(e) {
    const volume = parseFloat(e.target.value);
    this.setState({ volume });
  }

  @autobind
  onArrowKeyPressed(changedPlayed) {
    const changedPlayedPercentage = changedPlayed / 100;
    this.setState({ played: changedPlayedPercentage });
    this.player.seekTo(changedPlayedPercentage);
  }
}

VideoComponent.propTypes = propTypes;
VideoComponent.defaultProps = defaultProps;

export default VideoComponent;
