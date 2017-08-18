import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autobind from 'autobind-decorator';

import { CompletedSingleChoice } from './VideoModalCompletedSingleChoiceStyled';

const { shape, bool, string, number } = PropTypes;

const propTypes = {
  singleChoiceValue: shape({
    isAnswer: bool,
    textValue: string
  }).isRequired,
  solvedQuestionState: shape({
    indexOfQuestion: number,
    isCorrect: bool,
    indexOfSelectedChoice: number,
    indexOfAnswer: number
  }).isRequired,
  index: number.isRequired
};
const defaultProps = {};

class VideoModalCompletedSingleChoice extends Component {
  render() {
    const {
      singleChoiceValue: {
        textValue
      },
      solvedQuestionState: {
        isCorrect,
        indexOfSelectedChoice
      },
      index
    } = this.props;

    return (
      <CompletedSingleChoice.Wrapper>
        <CompletedSingleChoice.Checkbox>
          { this.renderCheckComponent({ indexOfSelectedChoice }) }
        </CompletedSingleChoice.Checkbox>
        <CompletedSingleChoice.QuestionText
          isChecked={ this.isChecked(indexOfSelectedChoice) }
          isCorrect={ isCorrect }>
          { this.renderTextValue(textValue, indexOfSelectedChoice) }
        </CompletedSingleChoice.QuestionText>
      </CompletedSingleChoice.Wrapper>
    );
  }

  @autobind
  renderCheckComponent({ indexOfSelectedChoice }) {
    const { solvedQuestionState: { isCorrect } } = this.props;

    if (this.isChecked(indexOfSelectedChoice)) {
      return (
        <CompletedSingleChoice.Check
          isCorrect={ isCorrect }>
          { ' ' }
        </CompletedSingleChoice.Check>
      );
    }

    return ' ';
  }

  @autobind
  renderTextValue(textValue, indexOfSelectedChoice) {
    const { solvedQuestionState: { isCorrect } } = this.props;

    if (!this.isChecked(indexOfSelectedChoice)) {
      return `${textValue}`;
    } else {
      if (!isCorrect) {
        return `${textValue} (오답입니다.)`;
      }

      return `${textValue} (정답입니다.)`;
    }
  }

  @autobind
  isChecked(indexOfSelectedChoice) {
    const { index } = this.props;
    return indexOfSelectedChoice === index;
  }
}

VideoModalCompletedSingleChoice.propTypes = propTypes;
VideoModalCompletedSingleChoice.defaultProps = defaultProps;

export default VideoModalCompletedSingleChoice;
