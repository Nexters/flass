import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autobind from 'autobind-decorator';

import QuizWrapperComponent from './QuizWrapper/QuizWrapperComponent';
import QuizIndexComponent from './QuizIndex/QuizIndexComponent';
import QuizMultipleChoiceComponent from './QuizMultipleChoice/QuizMultipleChoiceComponent';
import QuizEditMultipleChoiceComponent from './QuizEditMultipleChoice/QuizEditMultipleChoiceComponent';
import './QuizComponentStyles.scss';

const { bool, func, number, shape, string, arrayOf, oneOfType } = PropTypes;

const propTypes = {
  addMultipleChoiceQuestion: func.isRequired,
  saveMultipleChoiceQuestion: func.isRequired,
  setPlayingState: func.isRequired,
  cancelAddingQuestion: func.isRequired,
  completeAddingQuestion: func.isRequired,
  decreaseNumOfQuestion: func.isRequired,
  completeEditQuestion: func.isRequired,
  deleteCompleteQuestion: func.isRequired,
  isAdding: bool,
  numOfQuestion: number.isRequired,
  stateOfFocusedQuestion: shape({
    secsStateOfFocusedQuestion: shape({
      playedSeconds: number,
      label: string,
      isFocused: bool
    }),
    textStateOfFocusdQuestion: shape({
      TitleInputValue: string,
      checkedQuizIndex: number,
      numOfChoice: number,
      SingleChoiceValues: arrayOf(shape({
        isAnswer: bool,
        choiceTextValue: string
      })),
      secsOfQuiz: oneOfType([string, number]),
      indexOfQuestion: number
    })
  })
};
const defaultProps = {
  isAdding: false,
  stateOfFocusedQuestion: {
    secsStateOfFocusedQuestion: {
      playedSeconds: -1,
      label: '',
      isFocused: false
    },
    textStateOfFocusdQuestion: {
      TitleInputValue: '',
      checkedQuizIndex: -1,
      numOfChoice: -1,
      SingleChoiceValues: [],
      secsOfQuiz: '',
      indexOfQuestion: -1
    }
  }
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
      numOfQuestion,
      stateOfFocusedQuestion: {
        secsStateOfFocusedQuestion,
        textStateOfFocusdQuestion
      }
    } = this.props;
    const { isFocused } = secsStateOfFocusedQuestion;

    if (isFocused) {
      return (
        <QuizEditMultipleChoiceComponent
          setPlayingState={ this.setPlayingState }
          decreaseNumOfQuestion={ this.decreaseNumOfQuestion }
          completeEditQuestion={ this.completeEditQuestion }
          deleteCompleteQuestion={ this.deleteCompleteQuestion }
          secsStateOfFocusedQuestion={ secsStateOfFocusedQuestion }
          textStateOfFocusdQuestion={ textStateOfFocusdQuestion } />
      );
    }

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

  @autobind
  completeEditQuestion({ EditedTextStateOfFocusedQuestion }) {
    this.props.completeEditQuestion({ EditedTextStateOfFocusedQuestion });
  }

  @autobind
  deleteCompleteQuestion({ indexOfQuestion }) {
    this.props.deleteCompleteQuestion({ indexOfQuestion });
  }
}

QuizComponent.propTypes = propTypes;
QuizComponent.defaultProps = defaultProps;

export default QuizComponent;
