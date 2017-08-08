import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autobind from 'autobind-decorator';

import './QuizSingleChoiceComponentStyles.scss';

const { string, bool, func, number } = PropTypes;

const propTypes = {
  onCheckboxClick: func.isRequired,
  numberingKeyword: string.isRequired,
  isChecked: bool,
  quizIndex: number.isRequired
};
const defaultProps = {
  isChecked: false
};

class QuizSingleChoiceComponent extends Component {
  render() {
    const {
      numberingKeyword,
      isChecked
    } = this.props;

    return (
      <div className="quiz-single-choice">
        <div
          className="quiz-single-choice__checkbox"
          onClick={ this.onCheckboxClick }>
          {
            isChecked ? <div className="quiz-single-choice__check">{ ' ' }</div> : null
          }
        </div>

        <span>
          { `${numberingKeyword} 문항을 입력하세요.` }
        </span>
      </div>
    );
  }

  @autobind
  onCheckboxClick() {
    console.log('key', this.props.quizIndex);
    console.log(typeof this.props.quizIndex);
    const quizIndex = parseInt(this.props.quizIndex);
    this.props.onCheckboxClick(quizIndex);
  }
}

QuizSingleChoiceComponent.propTypes = propTypes;
QuizSingleChoiceComponent.defaultProps = defaultProps;

export default QuizSingleChoiceComponent;
