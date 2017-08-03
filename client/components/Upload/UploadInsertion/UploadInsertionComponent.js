import React, { Component } from 'react';
import PropTypes from 'prop-types';

const { func, string } = PropTypes;

const propTypes = {
  goToStepOne: func.isRequired,
  videoTitle: string.isRequired
};
const defaultProps = {};

class UploadInsertionComponent extends Component {
  render() {
    const {
      videoTitle,
      goToStepOne
    } = this.props;

    return (
      <div>
        <p>두번째 페이지</p>
        <p>title: { videoTitle }</p>
        <button onClick={ goToStepOne }>PREV</button>
      </div>
    );
  }
}

UploadInsertionComponent.propTypes = propTypes;
UploadInsertionComponent.defaultProps = defaultProps;

export default UploadInsertionComponent;
