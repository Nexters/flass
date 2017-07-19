import React, { Component } from 'react';
// import PropTypes from 'prop-types';

import {
  Step,
  Stepper,
  StepContent
} from 'material-ui/Stepper';

import VideoUpload from './VideoUpload';
import './upload.scss';

// const propTypes = {};
// const defaultProps = {};

// 스테퍼의 코넥터를 없애기위한 스타일
// scss의 className프롭대신 style프롭을 써야해서 styles 생성함
var styles = {
  noConnector: {
    border: 0,
    margin: 0,
    padding: 0
  }
};

class Upload extends Component {
  state = {
    stepIndex: 0
  };

  render() {
    const { stepIndex } = this.state;

    return(
      <Stepper
        activeStep={stepIndex}
        orientation="vertical"
      >
        <Step>
          <StepContent style={styles.noConnector}>
            <VideoUpload
              handleNext={this.handleNext}
            />
          </StepContent>
        </Step>
        <Step>
          <StepContent style={styles.noConnector}>
            <p>두번째 페이지</p>
            <p>handleNext를 불러주면 넘어갑니다</p>
          </StepContent>
        </Step>
      </Stepper>
    );
  }

  handleNext = () => {
    this.setState({
      stepIndex: this.state.stepIndex + 1
    });
  }
}

// Upload.propTypes = propTypes;
// Upload.defaultProps = defaultProps;

export default Upload;
