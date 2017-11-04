import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NoQuestions } from './AnalysisStyled';

const { number, shape, arrayOf, string } = PropTypes;

export const AnalysisLoadingHOC = WrappedComponent => {
  class WithLoading extends Component {
    render() {
      const { questions, questionIndex } = this.props;
      if (questions.length === 0) {
        return this._renderLoadingComponent();
      }

      return (
        <WrappedComponent
          question={ questions[questionIndex] }
          questionIndex={ questionIndex }
          { ...this.props } />
      );
    }

    _renderLoadingComponent = () => {
      return (
        <NoQuestions.Wrapper>
          <NoQuestions.Text>
            등록된 문제가 없습니다.
          </NoQuestions.Text>
        </NoQuestions.Wrapper>
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
