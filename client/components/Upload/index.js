import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import * as actions from '../../modules/Upload/Actions';

import VideoUpload from './VideoUpload';
import './upload.scss';

const propTypes = {
  step: PropTypes.number,
  setStep: PropTypes.func,
  setVideoData: PropTypes.func,
  title: PropTypes.string
};

const defaultProps = {
  step: 0,
  setStep: () => handleError('setStep'),
  setVideoData: () => handleError('setVideoData'),
  title: ''
};

function handleError(func) {
  console.error(`${func} is not defined`);
}

class Upload extends Component {
  render() {
    switch(this.props.step) {
      // step 1
      case 0:
        return (
          <VideoUpload handleNext={ (title, description) => this.goToStepTwo(title, description) } />
        );

      // step 2
      case 1:
      default:
        return (
          <div>
            <p>두번째 페이지</p>
            <p>title: {this.props.title}</p>
            <button onClick={this.goToStepOne}>PREV</button>
          </div>
        );
    }
  }

  goToStepTwo = (title, description) => {
    if(title == '') {
      console.log('MUST HAVE A TITLE!');
      return;
    }
    const step = 1;
    this.props.setStep(step);
    this.props.setVideoData(title, description);
  }

  goToStepOne = () => {
    const step = 0;
    this.props.setStep(step);
  }
}

Upload.propTypes = propTypes;
Upload.defaultProps = defaultProps;

const mapStateToProps = state => ({
  step: state.upload.step,
  title: state.upload.title
});

const mapDispatchToProps = dispatch => ({
  setStep: step => dispatch(actions.setStep(step)),
  setVideoData: (title, description) => dispatch(actions.setVideoData(title, description))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Upload);
