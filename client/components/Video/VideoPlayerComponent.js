import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactPlayer from 'react-player';
import autobind from 'autobind-decorator';
import classNames from 'classnames';

const { func, string, number, bool, object } = PropTypes;

const propTypes = {
  onProgress: func.isRequired,
  onDuration: func.isRequired,
  setPlayer: func.isRequired,
  url: string,
  playing: bool,
  playbackRate: number.isRequired,
  volume: number.isRequired,
  youtubeConfig: object,
  VideoPlayerClassName: string
};

const defaultProps = {
  url: null,
  playing: false,
  youtubeConfig: undefined,
  VideoPlayerClassName: ''
};

class VideoPlayerComponent extends Component {
  render() {
    const {
      VideoPlayerClassName,
      onProgress,
      onDuration,
      setPlayer,
      url,
      playing,
      playbackRate,
      volume,
      youtubeConfig
    } = this.props;

    return (
      <div>
        <ReactPlayer
          ref={ player => setPlayer(player) }
          className={ classNames('react-player', VideoPlayerClassName) }
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
          onDuration={ onDuration } />
      </div>
    );
  }
}

VideoPlayerComponent.propTypes = propTypes;
VideoPlayerComponent.defaultProps = defaultProps;

export { VideoPlayerComponent };
