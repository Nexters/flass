import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autobind from 'autobind-decorator';
import classNames from 'classnames';

import './QuizSingleChoiceComponentStyles.scss';
import DeleteIcon from '../icons/x-copy-2@2x.png';

const { string, bool, func, number } = PropTypes;

const propTypes = {
  onCheckboxClick: func.isRequired,
  onChoiceInputChange: func.isRequired,
  onSingleChoiceDeleteBtnClick: func.isRequired,
  numberingKeyword: string.isRequired,
  isChecked: bool,
  choiceIndex: number.isRequired,
  choiceTextValue: string
};
const defaultProps = {
  isChecked: false,
  choiceTextValue: ''
};

class QuizSingleChoiceComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isChoiceInputDirty: false,
      ChoiceInputValue: ''
    };
  }

  componentWillMount() {
    this.setState({ ChoiceInputValue: `${this.props.numberingKeyword} 문항을 입력하세요.` });
  }

  componentWillReceiveProps(nextProps) {
    const { choiceTextValue } = nextProps;
    const { isChoiceInputDirty, ChoiceInputValue } = this.state;

    if (choiceTextValue !== ChoiceInputValue && isChoiceInputDirty) {
      this.setState({ ChoiceInputValue: choiceTextValue });
    }
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
            isChecked && <div className="quiz-single-choice__check">{ ' ' }</div>
          }
        </div>

        <div className="quiz-single-choice__q-text-wrapper">
          <input
            type="text"
            className={ classNames(
              'quiz-single-choice__q-text',
              { 'quiz-single-choice__q-text--font-black': isChoiceInputDirty }
            ) }
            value={ ChoiceInputValue }
            onClick={ this.onChoiceInputClick }
            onChange={ this.onChoiceInputChange } />
            <span className="quiz-single-choice__underline"></span>
        </div>
        <span
          className="quiz-single-choice__delete-btn"
          onClick={ this.onDeleteBtnClick }>
          <img alt="choice delete button" srcSet={ DeleteIcon } className="quiz-single-choice__delete-icon" />
        </span>
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
    const { choiceIndex } = this.props;

    this.setState({ ChoiceInputValue: e.target.value });
    this.props.onChoiceInputChange(choiceIndex, e.target.value);
  }

  @autobind
  onCheckboxClick() {
    const choiceIndex = parseInt(this.props.choiceIndex);
    this.props.onCheckboxClick(choiceIndex);
  }

  @autobind
  onDeleteBtnClick() {
    const { choiceIndex } = this.props;
    this.props.onSingleChoiceDeleteBtnClick(choiceIndex);
  }
}

QuizSingleChoiceComponent.propTypes = propTypes;
QuizSingleChoiceComponent.defaultProps = defaultProps;

export default QuizSingleChoiceComponent;
