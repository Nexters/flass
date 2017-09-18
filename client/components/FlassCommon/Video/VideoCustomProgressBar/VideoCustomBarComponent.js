import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './VideoCustomBarStyle.scss';

const { number, string, oneOfType, arrayOf } = PropTypes;

const propTypes = {
  VideoBarClassName: oneOfType([string, arrayOf(string)]),
  VideoPlayedBarClassName: oneOfType([string, arrayOf(string)]),
  VideoLoadedBarClassName: oneOfType([string, arrayOf(string)]),
  played: number,
  loaded: number
};

const defaultProps = {
  VideoBarClassName: '',
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
    const playedBars = document.getElementsByClassName('played-bar');
    const loadedBars = document.getElementsByClassName('loaded-bar');

    Object.keys(playedBars).forEach(key => {
      playedBars[key].style.width = `${played}%`;
    });

    Object.keys(loadedBars).forEach(key => {
      loadedBars[key].style.width = `${loaded}%`;
    });
  }

  render() {
    const {
      VideoBarClassName,
      VideoPlayedBarClassName,
      VideoLoadedBarClassName
    } = this.props;

    return (
      <div>
        <div className={ classNames('bar', VideoBarClassName) } />
        <div id="loaded-bar" className={ classNames('loaded-bar', VideoLoadedBarClassName) } />
        <div id="played-bar" className={ classNames('played-bar', VideoPlayedBarClassName) } />
      </div>
    );
  }
}

VideoCustomBarComponent.propTypes = propTypes;
VideoCustomBarComponent.defaultProps = defaultProps;

export default VideoCustomBarComponent;
