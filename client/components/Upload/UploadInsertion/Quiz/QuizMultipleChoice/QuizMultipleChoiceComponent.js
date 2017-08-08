import React, { Component } from 'react';
import classNames from 'classnames';
import autobind from 'autobind-decorator';
import PropTypes from 'prop-types';

import './QuizMultipleChoiceComponentStyles.scss';

const propTypes = {};
const defaultProps = {};

class QuizMultipleChoiceComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      num: 1,
      isTitleInputDirty: false,
      TitleInputValue: '문제를 입력하세요.'
    };
  }
  render() {
    const {
      num,
      isTitleInputDirty,
      TitleInputValue
    } = this.state;

    return (
      <div className="quiz-multiple-choice">
        <div className="quiz-multiple-choice__header">
          <span className="quiz-multiple-choice__q-num">{`Q${num}`}</span>
          <span>
            <input
              type="text"
              id="q-title"
              className={ classNames(
                'quiz-multiple-choice__q-title',
                { 'quiz-multiple-choice__q-title--font-black': isTitleInputDirty }
              ) }
              value={ TitleInputValue }
              onClick={ this.onTitleInputClick }
              onChange={ this.onTitleInputChange } />
          </span>
        </div>
        <div className="quiz-multiple-choice__body">
          body
        </div>
        <div className="quiz-multiple-choice__footer">
          <div className={ classNames(
            'quiz-multiple-choice__btn',
            'quiz-multiple-choice__btn--gray',
            'quiz-multiple-choice__btn--right'
          ) }>
            삭제
          </div>
          <div className={ classNames(
            'quiz-multiple-choice__btn',
            'quiz-multiple-choice__btn--right'
            ) }>
            입력
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
}

QuizMultipleChoiceComponent.propTypes = propTypes;
QuizMultipleChoiceComponent.defaultProps = defaultProps;

export default QuizMultipleChoiceComponent;
