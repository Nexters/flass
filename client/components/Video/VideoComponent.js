import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
import ReactPlayer from 'react-player';
import screenfull from 'screenfull';

import FlassContentLayoutComponent from '../Flass/FlassContent';
import VideoButtonComponent from './VideoButtonComponent';
import VideoSeekBarComponent from './VideoSeekBarComponent';
import VideoVolumeBarComponent from './VideoVolumeBarComponent';
import VideoProgressBarComponent from './VideoProgressBarComponent';

import '../../css/base/_row.scss';

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

    this.onProgress = this.onProgress.bind(this);
    this.onClickStop = this.onClickStop.bind(this);
    this.onClickPlayPause = this.onClickPlayPause.bind(this);
    this.onClickFullscreen = this.onClickFullscreen.bind(this);
    this.onClickSetPlaybackRate = this.onClickSetPlaybackRate.bind(this);
    this.onSeekBarMouseDown = this.onSeekBarMouseDown.bind(this);
    this.onSeekBarChange = this.onSeekBarChange.bind(this);
    this.onSeekBarMouseUp = this.onSeekBarMouseUp.bind(this);
    this.onClickSetVolume = this.onClickSetVolume.bind(this);
  }

  render() {
    const { url, playing, volume, played, loaded, duration, playbackRate, youtubeConfig, fileConfig } = this.state;
    const YOUTUBE_URL = 'https://www.youtube.com/watch?v=PTkKJI27NlE';
    return (
      <div>
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

  onProgress(state) {
    if (!this.state.seeking) {
      this.setState(state);
    }
  }

  onClickStop() {
    this.setState({ url: null, playing: false });
  }

  onClickPlayPause() {
    this.setState({ playing: !this.state.playing });
  }

  onClickFullscreen() {
    screenfull.request(findDOMNode(this.player));
  }

  onClickSetPlaybackRate(e) {
    const rate = parseFloat(e.target.value);
    this.setState({ playbackRate: rate });
  }

  onSeekBarMouseDown() {
    this.setState({ seeking: true });
  }

  onSeekBarChange(e) {
    const played = parseFloat(e.target.value);
    this.setState({ played });
  }

  onSeekBarMouseUp(e) {
    const played = parseFloat(e.target.value);
    this.setState({ seeking: false });
    this.player.seekTo(played);
  }

  onClickSetVolume(e) {
    const volume = parseFloat(e.target.value);
    this.setState({ volume });
  }
}

export default VideoComponent;
