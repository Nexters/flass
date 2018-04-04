import React, { Component } from 'react';
import PropTypes from 'prop-types';

const { func } = PropTypes;

export const AnalysisFetchHOC = WrappedComponent => {
  class WithFetchedAnalysis extends Component {
    componentDidMount() {
      this._updateLectureAnalysis();
    }

    componentWillUnmount() {
      this.props.unmountAnalysisAction();
    }

    render() {
      return (
        <WrappedComponent
          updateLectureAnalysis={ this._updateLectureAnalysis }
          { ...this.props } />
      );
    }

    _updateLectureAnalysis = async(selectedIndex = 0) => {
      const { lectureId } = this.props;
      if (lectureId !== -1) {
        await this.props.requestLectureAnalysisAction(lectureId, selectedIndex);
      }
    };
  }

  WithFetchedAnalysis.propTypes = {
    unmountAnalysisAction: func.isRequired,
    requestLectureAnalysisAction: func.isRequired
  };
  WithFetchedAnalysis.defaultProps = {};

  return WithFetchedAnalysis;
};
