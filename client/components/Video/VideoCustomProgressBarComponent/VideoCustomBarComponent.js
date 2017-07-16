import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './VideoCustomBarStyle.scss';

const propTypes = {
  played: PropTypes.number,
  loaded: PropTypes.number
};

const defaultProps = {
  played: 0,
  loaded: 0
};

class VideoCustomBarComponent extends Component {
  componentWillReceiveProps(nextProps) {
    const playedBar = document.getElementsByClassName('played-bar')[0];
    const loadedBar = document.getElementsByClassName('loaded-bar')[0];
    playedBar.style.width = `${nextProps.played}%`;
    loadedBar.style.width = `${nextProps.loaded}%`;
  }

  render() {
    return (
      <div>
        <div id="played-bar" className="played-bar" />
        <div id="loaded-bar" className="loaded-bar" />
      </div>
    );
  }
}

VideoCustomBarComponent.propTypes = propTypes;
VideoCustomBarComponent.defaultProps = defaultProps;

export default VideoCustomBarComponent;