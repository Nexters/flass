import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const { oneOfType, arrayOf, string } = PropTypes;

const propTypes = {
  VideoModalClassName: oneOfType([string, arrayOf(string)]),
  VideoModalQuestionClassName: oneOfType([string, arrayOf(string)])
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

    console.log('VideoModalQuestionClassName', VideoModalQuestionClassName);

    return (
      <div className={ classNames(VideoModalClassName) }>
        <div className={ classNames(VideoModalQuestionClassName) }>
          ModalQuestionComponent!
        </div>
      </div>
    );
  }
}

VideoModalComponent.propTypes = propTypes;
VideoModalComponent.defaultProps = defaultProps;

export { VideoModalComponent };
