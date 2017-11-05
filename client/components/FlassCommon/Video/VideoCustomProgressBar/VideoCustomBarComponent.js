import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styled from 'styled-components';

import './VideoCustomBarStyle.scss';

const Wrapper = styled.div`
  height: ${props => (!props.ismouseover ? '.625rem' : '1.5rem')};
`;

const { number, string, oneOfType, arrayOf, func, bool } = PropTypes;

const propTypes = {
  onMouseOverOnBar: func.isRequired,
  onMouseOutFromBar: func.isRequired,
  VideoBarClassName: oneOfType([string, arrayOf(string)]),
  VideoPlayedBarClassName: oneOfType([string, arrayOf(string)]),
  VideoLoadedBarClassName: oneOfType([string, arrayOf(string)]),
  played: number,
  loaded: number,
  ismouseover: bool.isRequired
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

    this.state = {
      quizTime: [],
    };
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
      onMouseOverOnBar,
      onMouseOutFromBar,
      ismouseover
    } = this.props;

    return (
      <Wrapper
        onMouseOver={ onMouseOverOnBar }
        onMouseOut={ onMouseOutFromBar }
        ismouseover={ ismouseover } >
        <div className={ classNames('bar', { 'bar--thicker': ismouseover }) } />
        <div
          id="loaded-bar"
          className={ classNames('loaded-bar', { 'loaded-bar--thicker': ismouseover }) } />
        <div
          id="played-bar"
          className={ classNames('played-bar', { 'played-bar--thicker': ismouseover }) } />
      </Wrapper>
    );
  }

}

VideoCustomBarComponent.propTypes = propTypes;
VideoCustomBarComponent.defaultProps = defaultProps;

export default VideoCustomBarComponent;
