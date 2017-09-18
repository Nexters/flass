import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autobind from 'autobind-decorator';

import { QuizEditSingleChoice } from './QuizEditSingleChoiceStyled';

const { string, bool, func, number } = PropTypes;

const propTypes = {
  onCheckboxClick: func.isRequired,
  onChoiceInputChange: func.isRequired,
  isChecked: bool.isRequired,
  isEdit: bool.isRequired,
  choiceTextValue: string.isRequired,
  quizIndex: number.isRequired
};
const defaultProps = {};

class QuizEditSingleChoiceComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      choiceTextValue: ''
    };
  }

  componentWillMount() {
    this.setState({ choiceTextValue: this.props.choiceTextValue });
  }

  render() {
    const { isChecked, isEdit } = this.props;

    return (
      <QuizEditSingleChoice.Wrapper>
        <QuizEditSingleChoice.Checkbox
          onClick={ this.onCheckboxClick }>
          { this.renderCheckComponent({ isChecked }) }
        </QuizEditSingleChoice.Checkbox>

        <div>
          <QuizEditSingleChoice.QuestionText
            value={ this.state.choiceTextValue }
            disabled={ !isEdit }
            onChange={ this.onChoiceInputChange } />
        </div>
      </QuizEditSingleChoice.Wrapper>
    );
  }
  @autobind
  renderCheckComponent({ isChecked }) {
    if (isChecked) {
      return <QuizEditSingleChoice.Check>{ ' ' }</QuizEditSingleChoice.Check>;
    }

    return ' ';
  }

  @autobind
  onChoiceInputChange(e) {
    const { quizIndex } = this.props;
    const textValue = e.target.value;

    this.setState({ choiceTextValue: textValue });
    this.props.onChoiceInputChange(quizIndex, textValue);
  }

  @autobind
  onCheckboxClick() {
    if (this.props.isEdit) {
      const quizIndex = parseInt(this.props.quizIndex);
      this.props.onCheckboxClick(quizIndex);
    }
  }
}

QuizEditSingleChoiceComponent.propTypes = propTypes;
QuizEditSingleChoiceComponent.defaultProps = defaultProps;

export default QuizEditSingleChoiceComponent;
