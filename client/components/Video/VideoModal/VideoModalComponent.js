import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const { oneOfType, arrayOf, string } = PropTypes;

const propTypes = {
  VideoModalClassName: oneOfType([string, arrayOf(string)])
};
const defaultProps = {
  VideoModalClassName: ''
};

class VideoModalComponent extends Component {
  render() {
    const { VideoModalClassName } = this.props;

    return (
      <div className={ classNames(VideoModalClassName) }>
        VideoModalComponent!
      </div>
    );
  }
}

VideoModalComponent.propTypes = propTypes;
VideoModalComponent.defaultProps = defaultProps;

export { VideoModalComponent };
