import React, { Component } from 'react';
import classNames from 'classnames';
import autobind from 'autobind-decorator';
import PropTypes from 'prop-types';

import QuizSingleChoiceComponent from './QuizSingleChoice/QuizSingleChoiceComponent';

import AddQuizIcon from './icons/add_circle_outline_black_24dp.png';

import './QuizMultipleChoiceComponentStyles.scss';

const propTypes = {};
const defaultProps = {};
const NUMBERING_KEYWORD = ['첫 번째', '두 번째', '세 번째', '네 번째'];

class QuizMultipleChoiceComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      numOfQuiz: 1,
      numOfChoice: 1,
      checkedQuizIndex: -1,
      isTitleInputDirty: false,
      TitleInputValue: '문제를 입력하세요.'
    };
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
          <div className={ classNames(
            'quiz-multiple-choice__btn',
            'quiz-multiple-choice__btn--right'
            ) }>
            입력
          </div>
          <div className={ classNames(
            'quiz-multiple-choice__btn',
            'quiz-multiple-choice__btn--gray',
            'quiz-multiple-choice__btn--right'
          ) }>
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
          onCheckboxClick={ this.onCheckboxClick } />
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
  }

  @autobind
  onAddChoiceBtnClick() {
    if (this.state.numOfChoice < 4) {
      this.setState({ numOfChoice: this.state.numOfChoice + 1 });
    } else {
      alert('선택지 수는 4개를 넘을 수 없습니다.');
    }
  }
}

QuizMultipleChoiceComponent.propTypes = propTypes;
QuizMultipleChoiceComponent.defaultProps = defaultProps;

export default QuizMultipleChoiceComponent;
