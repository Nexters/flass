import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
import ReactPlayer from 'react-player';
import screenfull from 'screenfull';
import autobind from 'autobind-decorator';

import VideoButtonComponent from './VideoButtonComponent';
import VideoSeekBarComponent from './VideoSeekBarComponent';
import VideoVolumeBarComponent from './VideoVolumeBarComponent';
import VideoProgressBarComponent from './VideoProgressBarComponent';
import VideoCustomProgressBarComponent from './VideoCustomProgressBarComponent/VideoCustomProgressBarComponent';

import QuizComponent from '../Quiz/QuizComponent';

import '../../css/base/_row.scss';

const propTypes = {};
const defaultProps = {};

class VideoComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      url: null,
      playing: true,
      volume: 0.8,
      played: 0,
      loaded: 0,
      duration: 0,
      playbackRate: 1.0
    };
  }

  render() {
    const { url, playing, volume, played, loaded, duration, playbackRate, youtubeConfig, fileConfig } = this.state;
    const YOUTUBE_URL = 'https://www.youtube.com/watch?v=PTkKJI27NlE';
    return (
      <div>
        <div className="row--equal-height-at-large">
          <div className="row__large-8">
            <ReactPlayer
              ref={ player => { this.player = player; } }
              className="react-player"
              width="100%"
              height="100%"
              url={ YOUTUBE_URL }
              playing={ playing }
              playbackRate={ playbackRate }
              volume={ volume }
              youtubeConfig={ youtubeConfig }
              fileConfig={ fileConfig }
              onReady={ () => console.log('onReady') }
              onStart={ () => console.log('onStart') }
              onPlay={ () => this.setState({ playing: true }) }
              onPause={ () => this.setState({ playing: false }) }
              onEnded={ () => this.setState({ playing: false }) }
              onError={ e => console.log('onError', e) }
              onProgress={ this.onProgress }
              onDuration={ duration => this.setState({ duration }) } />
          </div>

          <div className="row__large-4">
            <QuizComponent />
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
            <div>탐색바</div>
            <VideoSeekBarComponent
              played={ played }
              onSeekBarMouseDown={ this.onSeekBarMouseDown }
              onSeekBarChange={ this.onSeekBarChange }
              onSeekBarMouseUp={ this.onSeekBarMouseUp } />
          </div>

          <div>
            <div>볼륨</div>
            <VideoVolumeBarComponent
              volume={ volume }
              onVolumeBarChange={ this.onClickSetVolume } />
          </div>

          <div>
            <div>얼마나 재생되었는지..</div>
            <VideoProgressBarComponent progress={ played } />
          </div>

          <div>
            <div>얼마나 로딩되었는지..</div>
            <VideoProgressBarComponent progress={ loaded } />
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
            <VideoButtonComponent
              buttonClass="btn__playbackrate"
              buttonTitle="x1"
              onButtonClick={ this.onClickSetPlaybackRate }
              value={ 1 } />
            <VideoButtonComponent
              buttonClass="btn__playbackrate"
              buttonTitle="x1.5"
              onButtonClick={ this.onClickSetPlaybackRate }
              value={ 1.5 } />
            <VideoButtonComponent
              buttonClass="btn__playbackrate"
              buttonTitle="x2"
              onButtonClick={ this.onClickSetPlaybackRate }
              value={ 2 } />
          </div>

          <div>
            <h3>상태 정보</h3>
            <div>url</div>
            <div>
              { (url instanceof Array ? 'Multiple' : url) || 'null' }
            </div>

            <div>재생 여부</div>
            <div>
              { playing ? 'true' : 'false' }
            </div>

            <div>볼륨</div>
            <div>
              { volume.toFixed(3) }
            </div>

            <div>재생량</div>
            <div>
              { played.toFixed(3) }
            </div>

            <div>로딩량</div>
            <div>
              { loaded.toFixed(3) }
            </div>

            <div>영상 길이</div>
            <div>
              { duration }
            </div>

            <div>재생된 시간</div>
            <div>
              { (duration * played).toFixed(3) }
            </div>

            <div>남은 시간</div>
            <div>
              { (duration * (1 - played)).toFixed(3) }
            </div>

          </div>
        </div>
      </div>
    );
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
    this.player.seekTo(played);
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
