import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autobind from 'autobind-decorator';

import QuizWrapperComponent from './QuizWrapper/QuizWrapperComponent';
import QuizIndexComponent from './QuizIndex/QuizIndexComponent';
import QuizMultipleChoiceComponent from './QuizMultipleChoice/QuizMultipleChoiceComponent';

import './QuizComponentStyles.scss';

const { bool, func } = PropTypes;

const propTypes = {
  addMultipleChoiceQuestion: func.isRequired,
  saveMultipleChoiceQuestion: func.isRequired,
  setPlayingState: func.isRequired,
  cancelAddingQuestion: func.isRequired,
  isAdding: bool
};
const defaultProps = {
  isAdding: false
};

class QuizComponent extends Component {
  render() {
    return (
      <QuizWrapperComponent>
        <div className="quiz">
          { this.renderQuizComponent() }
        </div>
      </QuizWrapperComponent>
    );
  }

  @autobind
  renderQuizComponent() {
    const {
      isAdding
    } = this.props;

    if (!isAdding) {
      return (
        <QuizIndexComponent
          onAddMultipleChoiceQuizBtnClick={ this.onAddMultipleChoiceQuizBtnClick } />
      );
    } else {
      return (
        <QuizMultipleChoiceComponent
          saveMultipleChoiceQuestion={ this.saveMultipleChoiceQuestion }
          setPlayingState={ this.setPlayingState }
          cancelAddingQuestion={ this.cancelAddingQuestion } />
      );
    }
  }

  @autobind
  onAddMultipleChoiceQuizBtnClick() {
    this.props.addMultipleChoiceQuestion();
    this.props.setPlayingState(false);
  }

  @autobind
  saveMultipleChoiceQuestion({ numOfQuiz, numOfChoice, checkedQuizIndex, TitleInputValue, SingleChoiceValues }) {
    this.props.saveMultipleChoiceQuestion({
      numOfQuiz,
      numOfChoice,
      checkedQuizIndex,
      TitleInputValue,
      SingleChoiceValues
    });
  }

  @autobind
  setPlayingState(playingState) {
    this.props.setPlayingState(playingState);
  }

  @autobind
  cancelAddingQuestion() {
    this.props.cancelAddingQuestion();
  }
}

QuizComponent.propTypes = propTypes;
QuizComponent.defaultProps = defaultProps;

export default QuizComponent;
