import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactPlayer from 'react-player';
import autobind from 'autobind-decorator';

const { func, string, number, bool, object } = PropTypes;

const propTypes = {
  onProgress: func.isRequired,
  setPlayer: func.isRequired,
  url: string,
  playing: bool,
  playbackRate: number.isRequired,
  volume: number.isRequired,
  duration: number.isRequired,
  youtubeConfig: object
};

const defaultProps = {
  url: null,
  playing: false,
  youtubeConfig: undefined
};

class VideoPlayerComponent extends Component {
  render() {
    const { onProgress, setPlayer, url, playing, playbackRate, volume, youtubeConfig, duration } = this.props;

    return (
      <div>
        <ReactPlayer
          ref={ player => setPlayer(player) }
          className="react-player"
          width="100%"
          height="100%"
          url={ url }
          playing={ playing }
          playbackRate={ playbackRate }
          volume={ volume }
          youtubeConfig={ youtubeConfig }
          onReady={ () => console.log('onReady') }
          onStart={ () => console.log('onStart') }
          onPlay={ () => this.setState({ playing: true }) }
          onPause={ () => this.setState({ playing: false }) }
          onEnded={ () => this.setState({ playing: false }) }
          onError={ e => console.log('onError', e) }
          onProgress={ onProgress }
          onDuration={ duration => this.setState({ duration }) } />
      </div>
    );
  }
}

VideoPlayerComponent.propTypes = propTypes;
VideoPlayerComponent.defaultProps = defaultProps;

export default VideoPlayerComponent;
