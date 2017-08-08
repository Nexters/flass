import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autobind from 'autobind-decorator';
import classNames from 'classnames';

import './QuizSingleChoiceComponentStyles.scss';

const { string, bool, func, number } = PropTypes;

const propTypes = {
  onCheckboxClick: func.isRequired,
  onChoiceInputChange: func.isRequired,
  numberingKeyword: string.isRequired,
  isChecked: bool,
  quizIndex: number.isRequired
};
const defaultProps = {
  isChecked: false
};

class QuizSingleChoiceComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isChoiceDirty: false,
      ChoiceInputValue: ''
    };
  }

  componentWillMount() {
    this.setState({ ChoiceInputValue: `${this.props.numberingKeyword} 문항을 입력하세요.` });
  }

  render() {
    const { isChoiceInputDirty, ChoiceInputValue } = this.state;
    const { isChecked } = this.props;

    return (
      <div className="quiz-single-choice">
        <div
          className="quiz-single-choice__checkbox"
          onClick={ this.onCheckboxClick }>
          {
            isChecked ? <div className="quiz-single-choice__check">{ ' ' }</div> : null
          }
        </div>

        <div>
          <input
            type="text"
            className={ classNames(
              'quiz-single-choice__q-text',
              { 'quiz-single-choice__q-text--font-black': isChoiceInputDirty }
            ) }
            value={ ChoiceInputValue }
            onClick={ this.onChoiceInputClick }
            onChange={ this.onChoiceInputChange } />
        </div>
      </div>
    );
  }
  @autobind
  onChoiceInputClick() {
    if (!this.state.isChoiceInputDirty) {
      this.setState({ isChoiceInputDirty: true, ChoiceInputValue: '' });
    }
  }

  @autobind
  onChoiceInputChange(e) {
    const { quizIndex } = this.props;

    this.setState({ ChoiceInputValue: e.target.value });
    this.props.onChoiceInputChange(quizIndex, e.target.value);
  }

  @autobind
  onCheckboxClick() {
    const quizIndex = parseInt(this.props.quizIndex);
    this.props.onCheckboxClick(quizIndex);
  }
}

QuizSingleChoiceComponent.propTypes = propTypes;
QuizSingleChoiceComponent.defaultProps = defaultProps;

export default QuizSingleChoiceComponent;
