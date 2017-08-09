import _ from 'lodash';
import { List } from 'immutable';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import autobind from 'autobind-decorator';

import QuizSingleChoiceComponent from './QuizSingleChoice/QuizSingleChoiceComponent';

import AddQuizIcon from './icons/add_circle_outline_black_24dp.png';

import './QuizMultipleChoiceComponentStyles.scss';


const { func } = PropTypes;
const propTypes = {
  cancelAddingQuestion: func.isRequired,
  saveMultipleChoiceQuestion: func.isRequired,
  setPlayingState: func.isRequired
};
const defaultProps = {};
const NUMBERING_KEYWORD = ['첫 번째', '두 번째', '세 번째', '네 번째'];
const COMPONENT_INITIAL_STATE = {
  numOfQuiz: 1,
  numOfChoice: 1,
  checkedQuizIndex: -1,
  isTitleInputDirty: false,
  TitleInputValue: '문제를 입력하세요.',
  SingleChoiceValues: [{
    isAnswer: false,
    choiceTextValue: ''
  }]
};
class QuizMultipleChoiceComponent extends Component {
  constructor(props) {
    super(props);

    this.state = COMPONENT_INITIAL_STATE;
  }

  render() {
    const {
      numOfQuiz,
      isTitleInputDirty,
      TitleInputValue
    } = this.state;

    return (
      <div className="quiz-multiple-choice">
        <div className="quiz-multiple-choice__header">
          <span className="quiz-multiple-choice__q-num">{`Q${numOfQuiz}`}</span>
          <span>
            <input
              type="text"
              className={ classNames(
                'quiz-multiple-choice__q-title',
                { 'quiz-multiple-choice__q-title--font-black': isTitleInputDirty }
              ) }
              value={ TitleInputValue }
              onClick={ this.onTitleInputClick }
              onChange={ this.onTitleInputChange } />
          </span>
          <span onClick={ this.onAddChoiceBtnClick }>
            <img
              className="quiz-multiple-choice__q-add-btn"
              srcSet={ AddQuizIcon }
              alt="Add quiz button" />
          </span>
        </div>

        <div className="quiz-multiple-choice__body">
          { this.renderChoices() }
        </div>

        <div className="quiz-multiple-choice__footer">
          <div
            className={ classNames(
              'quiz-multiple-choice__btn',
              'quiz-multiple-choice__btn--right') }
            onClick={ this.onRegisterBtnClick }>
            입력
          </div>
          <div
            className={ classNames(
              'quiz-multiple-choice__btn',
              'quiz-multiple-choice__btn--gray',
              'quiz-multiple-choice__btn--right') }
            onClick={ this.onCancelBtnClick }>
            삭제
          </div>
        </div>
      </div>
    );
  }

  @autobind
  onTitleInputClick() {
    if (!this.state.isTitleInputDirty) {
      this.setState({ isTitleInputDirty: true, TitleInputValue: '' });
    }
  }

  @autobind
  onTitleInputChange(e) {
    this.setState({ TitleInputValue: e.target.value });
  }

  @autobind
  renderChoices() {
    const choices = [];

    for (let i = 0; i < this.state.numOfChoice; i += 1) {
      choices.push(
        <QuizSingleChoiceComponent
          numberingKeyword={ NUMBERING_KEYWORD[i] }
          key={ i }
          quizIndex={ i }
          isChecked={ this.isCheckedQuizIndexSameWithIndex(i) }
          onCheckboxClick={ this.onCheckboxClick }
          onChoiceInputChange={ this.onSingleChoiceInputChange } />
      );
    }

    return choices;
  }
  @autobind
  isCheckedQuizIndexSameWithIndex(index) {
    return this.state.checkedQuizIndex === index;
  }

  @autobind
  onCheckboxClick(quizIndex) {
    this.setState({ checkedQuizIndex: quizIndex });
    this.updateIsAnswerValueOnSingleChoiceArray(quizIndex);
  }

  updateIsAnswerValueOnSingleChoiceArray(choiceIndex) {
    const { checkedQuizIndex } = this.state;

    if (checkedQuizIndex !== -1) {
      const updatedSingleChoiceArray = List(this.state.SingleChoiceValues)
        .update(checkedQuizIndex, choice => ({ ...choice, isAnswer: false }))
        .update(choiceIndex, choice => ({ ...choice, isAnswer: true }))
        .toArray();

      this.setState({ SingleChoiceValues: updatedSingleChoiceArray });
    } else {
      const updatedSingleChoiceArray = List(this.state.SingleChoiceValues)
        .update(choiceIndex, choice => ({ ...choice, isAnswer: true }))
        .toArray();

      this.setState({ SingleChoiceValues: updatedSingleChoiceArray });
    }
  }


  @autobind
  onSingleChoiceInputChange(choiceIndex, choiceTextValue) {
    const updatedSingleChoiceArray = List(this.state.SingleChoiceValues)
      .update(choiceIndex, choice => ({ ...choice, choiceTextValue }))
      .toArray();

    this.setState({ SingleChoiceValues: updatedSingleChoiceArray });
  }

  @autobind
  onAddChoiceBtnClick() {
    const { numOfChoice, SingleChoiceValues } = this.state;

    if (this.state.numOfChoice < 4) {
      this.updateNumAndValuesOfChoice(numOfChoice, SingleChoiceValues);
    } else {
      alert('선택지 수는 4개를 넘을 수 없습니다.');
    }
  }

  updateNumAndValuesOfChoice(numOfChoice, SingleChoiceValues) {
    const newSingleChoiceValue = {
      isAnswer: false,
      choiceTextValue: ''
    };

    this.setState({
      numOfChoice: numOfChoice + 1,
      SingleChoiceValues: _.concat(SingleChoiceValues, newSingleChoiceValue)
    });
  }

  @autobind
  onCancelBtnClick() {
    if (this.state.numOfQuiz > 1) {
      this.setState({ numOfQuiz: this.state.numOfQuiz - 1 });
    }

    this.props.cancelAddingQuestion();
    this.props.setPlayingState(true);
  }

  @autobind
  onRegisterBtnClick() {
    const { numOfQuiz, numOfChoice, checkedQuizIndex, TitleInputValue, SingleChoiceValues } = this.state;
    this.props.saveMultipleChoiceQuestion({
      numOfQuiz,
      numOfChoice,
      checkedQuizIndex,
      TitleInputValue,
      SingleChoiceValues
    });
  }
}

QuizMultipleChoiceComponent.propTypes = propTypes;
QuizMultipleChoiceComponent.defaultProps = defaultProps;

export default QuizMultipleChoiceComponent;
