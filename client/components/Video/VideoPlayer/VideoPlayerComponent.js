import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactPlayer from 'react-player';
import classNames from 'classnames';
import autobind from 'autobind-decorator';

import { VideoPlayer } from './VideoPlayerStyled';
import './VideoPlayerStyles.scss';

const { func, string, number, bool } = PropTypes;

const propTypes = {
  onProgress: func.isRequired,
  onDuration: func.isRequired,
  onEnded: func.isRequired,
  setPlayer: func.isRequired,
  url: string,
  playing: bool,
  volume: number.isRequired,
  styledProps: string
};

const defaultProps = {
  url: null,
  playing: false,
  youtubeConfig: undefined,
  VideoPlayerWrapperClassName: '',
  VideoPlayerClassName: '',
  styledProps: ''
};

const PROGRESS_FREQUENCY = 500;

class VideoPlayerComponent extends Component {
  render() {
    const {
      onProgress,
      onDuration,
      setPlayer,
      url,
      playing,
      volume,
      styledProps
    } = this.props;
    return (
      <VideoPlayer.Wrapper styledProps={ styledProps }>
        <ReactPlayer
          ref={ player => setPlayer(player) }
          className={ classNames('react-player', 'player') }
          width="100%"
          height="100%"
          url={ url }
          progressFrequency={ PROGRESS_FREQUENCY }
          playing={ playing }
          volume={ volume }
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
