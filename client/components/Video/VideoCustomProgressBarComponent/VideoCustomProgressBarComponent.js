import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import VideoCustomBarComponent from './VideoCustomBarComponent';

import './VideoCustomProgressBarStyle.scss';

const { func, number } = PropTypes;

const propTypes = {
  onCustomSeekBarMouseDown: func.isRequired,
  onCustomSeekBarChange: func.isRequired,
  onCustomSeekBarMouseUp: func.isRequired,
  duration: number,
  playedPercentage: number,
  loadedPercentage: number
};

const defaultProps = {
  duration: 1,
  playedPercentage: 0,
  loadedPercentage: 0
};

const PROGRESS_MIN = 0;
const PROGRESS_MAX = 100;

class VideoCustomProgressBarComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      width: 1,
      duration: 1,
      played: 0,
      loaded: 0,
      isDragging: false
    };

    this.onCustomSeekBarMouseDown = this.onCustomSeekBarMouseDown.bind(this);
    this.onCustomSeekBarChange = this.onCustomSeekBarChange.bind(this);
    this.onCustomSeekBarMouseUp = this.onCustomSeekBarMouseUp.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { duration, playedPercentage, loadedPercentage } = nextProps;

    this.setState({
      duration,
      played: playedPercentage * 100,
      loaded: loadedPercentage * 100
    });
  }

  render() {
    const { played, loaded } = this.state;

    return (
      <div
        className="player-progress-bar"
        onMouseDown={ this.onCustomSeekBarMouseDown }
        onMouseMove={ this.onCustomSeekBarChange }
        onMouseUp={ this.onCustomSeekBarMouseUp }>
        <VideoCustomBarComponent
          played={ played }
          loaded={ loaded } />
      </div>
    );
  }

  onCustomSeekBarMouseDown(e) {
    this.setState({ isDragging: true });
    this.props.onCustomSeekBarMouseDown();
    e.stopPropagation();
    e.preventDefault;
  }

  onCustomSeekBarChange(e) {
    if (this.state.isDragging) {
      const { left, right } = ReactDOM.findDOMNode(this).getBoundingClientRect();
      const rLeft = left - document.body.getBoundingClientRect().left;

      console.log(left, right, rLeft);

      let movedPosition = ((e.clientX - rLeft) / (right - rLeft)) * 100;
      if (movedPosition < PROGRESS_MIN) {
        movedPosition = min;
      }
      if (movedPosition > PROGRESS_MAX) {
        movedPosition = max;
      }
      console.log('movedPosition', movedPosition);
      this.setState({ played: movedPosition });
      this.props.onCustomSeekBarChange(movedPosition);
    }
    e.stopPropagation();
    e.preventDefault;
  }

  onCustomSeekBarMouseUp(e) {
    this.setState({ isDragging: false });
    this.props.onCustomSeekBarMouseUp(this.state.played);
    e.stopPropagation();
    e.preventDefault;
  }
}

VideoCustomProgressBarComponent.propTypes = propTypes;
VideoCustomProgressBarComponent.defaultProps = defaultProps;

export default VideoCustomProgressBarComponent;
