import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './VideoCustomBarStyle.scss';

const { number, string, oneOfType, arrayOf } = PropTypes;

const propTypes = {
  VideoPlayedBarClassName: oneOfType([string, arrayOf(string)]),
  VideoLoadedBarClassName: oneOfType([string, arrayOf(string)]),
  played: number,
  loaded: number
};

const defaultProps = {
  VideoPlayedBarClassName: '',
  VideoLoadedBarClassName: '',
  played: 0,
  loaded: 0
};

class VideoCustomBarComponent extends Component {
  constructor(props) {
    super(props);

    this.state = { quizTime: [] };
  }

  componentWillReceiveProps(nextProps) {
    const { played, loaded } = nextProps;
    const playedBar = document.getElementsByClassName('played-bar')[0];
    const loadedBar = document.getElementsByClassName('loaded-bar')[0];
    playedBar.style.width = `${played}%`;
    loadedBar.style.width = `${loaded}%`;
  }

  render() {
    const { VideoPlayedBarClassName, VideoLoadedBarClassName } = this.props;

    return (
      <div>
        <div id="loaded-bar" className={ classNames('loaded-bar', VideoLoadedBarClassName) } />
        <div id="played-bar" className={ classNames('played-bar', VideoPlayedBarClassName) } />
      </div>
    );
  }
}

VideoCustomBarComponent.propTypes = propTypes;
VideoCustomBarComponent.defaultProps = defaultProps;

export default VideoCustomBarComponent;
