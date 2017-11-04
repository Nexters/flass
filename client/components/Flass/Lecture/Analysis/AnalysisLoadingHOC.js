import React, { Component } from 'react';
import PropTypes from 'prop-types';

import AnalysisLoadingComponent from './AnalysisLoading/AnalysisLoadingComponent';

const { number, shape, arrayOf, string } = PropTypes;

export const AnalysisLoadingHOC = WrappedComponent => {
  class WithLoading extends Component {
    render() {
      const { questions, questionIndex } = this.props;
      if (questions.length === 0) {
        return <AnalysisLoadingComponent />;
      }

      return (
        <WrappedComponent
          question={ questions[questionIndex] }
          questionIndex={ questionIndex }
          { ...this.props } />
      );
    }
  }

  WithLoading.propTypes = {
    questions: arrayOf(shape({
      id: number,
      content: string,
      correct_answer: string,
      question_at: number
    })).isRequired,
    questionIndex: number.isRequired
  };
  WithLoading.defaultProps = {};

  return WithLoading;
};
