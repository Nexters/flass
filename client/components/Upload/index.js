import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import * as actions from '../../modules/Upload/Actions';

import VideoUpload from './VideoUpload';
import './upload.scss';

const propTypes = {
  step: PropTypes.number,
  setStep: PropTypes.func
};

const defaultProps = {
  step: 0,
  setStep: () => { console.error('setStep is not defined'); }
};

class Upload extends Component {
  render() {
    switch(this.props.step) {
      case 0:
        return <VideoUpload handleNext={ this.handleNext } />;
      case 1:
      default:
        return (
          <div>
            <p>두번째 페이지</p>
            <button onClick={this.handlePrev}>PREV</button>
          </div>
        );
    }
  }

  handleNext = () => {
    this.props.setStep(1);
  }

  handlePrev = () => {
    this.props.setStep(0);
  }
}

Upload.propTypes = propTypes;
Upload.defaultProps = defaultProps;

const mapStateToProps = state => ({
  step: state.upload.step
});

const mapDispatchToProps = dispatch => ({
  setStep: step => dispatch(actions.setStep(step))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Upload);
