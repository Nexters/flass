import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactPlayer from 'react-player';
import classNames from 'classnames';
import autobind from 'autobind-decorator';

import { VideoPlayer } from './VideoPlayerStyled';
import './VideoPlayerStyles.scss';

const { func, string, number, bool, object, oneOfType, arrayOf } = PropTypes;

const propTypes = {
  onProgress: func.isRequired,
  onDuration: func.isRequired,
  onEnded: func.isRequired,
  setPlayer: func.isRequired,
  url: string,
  playing: bool,
  playbackRate: number.isRequired,
  volume: number.isRequired,
  youtubeConfig: object,
  VideoPlayerWrapperClassName: oneOfType([string, arrayOf(string)]),
  VideoPlayerClassName: oneOfType([string, arrayOf(string)])
};

const defaultProps = {
  url: null,
  playing: false,
  youtubeConfig: undefined,
  VideoPlayerWrapperClassName: '',
  VideoPlayerClassName: ''
};

class VideoPlayerComponent extends Component {
  render() {
    const {
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
      <VideoPlayer.Wrapper>
        <ReactPlayer
          ref={ player => setPlayer(player) }
          className={ classNames('react-player', 'player') }
          width="100%"
          height="100%"
          url={ url }
          playing={ playing }
          playbackRate={ playbackRate }
          volume={ volume }
          youtubeConfig={ youtubeConfig }
          onEnded={ this.onEnded }
          onError={ e => console.log('onError', e) }
          onProgress={ onProgress }
          onDuration={ onDuration } />
      </VideoPlayer.Wrapper>
    );
  }

  @autobind
  onEnded() {
    this.props.onEnded();
  }
}

VideoPlayerComponent.propTypes = propTypes;
VideoPlayerComponent.defaultProps = defaultProps;

export { VideoPlayerComponent };
