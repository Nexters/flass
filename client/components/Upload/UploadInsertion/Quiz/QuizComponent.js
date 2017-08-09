import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autobind from 'autobind-decorator';

import QuizWrapperComponent from './QuizWrapper/QuizWrapperComponent';
import QuizIndexComponent from './QuizIndex/QuizIndexComponent';
import QuizMultipleChoiceComponent from './QuizMultipleChoice/QuizMultipleChoiceComponent';

import './QuizComponentStyles.scss';

const { bool, func, number } = PropTypes;

const propTypes = {
  addMultipleChoiceQuestion: func.isRequired,
  saveMultipleChoiceQuestion: func.isRequired,
  setPlayingState: func.isRequired,
  cancelAddingQuestion: func.isRequired,
  completeAddingQuestion: func.isRequired,
  decreaseNumOfQuestion: func.isRequired,
  isAdding: bool,
  numOfQuestion: number.isRequired
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
      isAdding,
      numOfQuestion
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
          cancelAddingQuestion={ this.cancelAddingQuestion }
          completeAddingQuestion={ this.completeAddingQuestion }
          decreaseNumOfQuestion={ this.decreaseNumOfQuestion }

          numOfQuestion={ numOfQuestion } />
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

  @autobind
  completeAddingQuestion() {
    this.props.completeAddingQuestion();
  }

  @autobind
  decreaseNumOfQuestion() {
    this.props.decreaseNumOfQuestion();
  }
}

QuizComponent.propTypes = propTypes;
QuizComponent.defaultProps = defaultProps;

export default QuizComponent;
