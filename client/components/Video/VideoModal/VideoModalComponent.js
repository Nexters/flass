import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import autobind from 'autobind-decorator';

const { oneOfType, arrayOf, string, func } = PropTypes;

const propTypes = {
  VideoModalClassName: oneOfType([string, arrayOf(string)]),
  VideoModalQuestionClassName: oneOfType([string, arrayOf(string)]),
  onQuestionSolved: func.isRequired
};

const defaultProps = {
  VideoModalClassName: '',
  VideoModalQuestionClassName: ''
};

class VideoModalComponent extends Component {
  render() {
    const {
      VideoModalClassName,
      VideoModalQuestionClassName
    } = this.props;

    return (
      <div className={ classNames(VideoModalClassName) }>
        <div className={ classNames(VideoModalQuestionClassName) }>
          ModalQuestionComponent!

          <button onClick={ this.onClickSolveBtn }>
            문제풀기
          </button>
        </div>
      </div>
    );
  }
  
  @autobind
  onClickSolveBtn() {
    this.props.onQuestionSolved();
  }
}

VideoModalComponent.propTypes = propTypes;
VideoModalComponent.defaultProps = defaultProps;

export { VideoModalComponent };
