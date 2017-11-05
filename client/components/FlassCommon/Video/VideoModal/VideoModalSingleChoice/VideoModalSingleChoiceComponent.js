import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autobind from 'autobind-decorator';

import { VideoModalSingleChoice } from './VideoModalSingleChoiceStyled';

const { func, shape, string, bool, number } = PropTypes;

const propTypes = {
  onCheckboxClick: func.isRequired,
  singleChoiceValue: shape({
    isAnswer: bool,
    textValue: string
  }).isRequired,
  choiceIndex: number,
  isChecked: bool,
  isSolved: bool,
  isCorrect: bool
};
const defaultProps = {
  choiceIndex: -1,
  isChecked: false,
  isSolved: false,
  isCorrect: false
};

class VideoModalSingleChoiceComponent extends Component {
  render() {
    const {
      singleChoiceValue: {
        textValue
      },
      isChecked,
      isSolved,
      isCorrect
    } = this.props;

    return (
      <VideoModalSingleChoice.Wrapper>
        <VideoModalSingleChoice.Checkbox
          onClick={ this.onCheckboxClick }>
          { this.renderCheckComponent({ isChecked }) }
        </VideoModalSingleChoice.Checkbox>
        <VideoModalSingleChoice.QuestionText
          isSolved={ isSolved }
          isChecked={ isChecked }
          isCorrect={ isCorrect }>
          { this.renderTextValue(textValue) }
        </VideoModalSingleChoice.QuestionText>
      </VideoModalSingleChoice.Wrapper>
    );
  }

  @autobind
  onCheckboxClick() {
    const { isSolved } = this.props;

    if (!isSolved) {
      this.props.onCheckboxClick(this.props.choiceIndex);
    }
  }

  @autobind
  renderCheckComponent({ isChecked }) {
    const { isSolved, isCorrect } = this.props;

    if (isChecked) {
      return (
        <VideoModalSingleChoice.Check
          isSolved={ isSolved }
          isCorrect={ isCorrect }>
          { ' ' }
        </VideoModalSingleChoice.Check>
      );
    }

    return ' ';
  }

  @autobind
  renderTextValue(textValue) {
    const { isSolved, isChecked } = this.props;

    if (!isChecked) {
      return `${textValue}`;
    } else {
      if (!this.isSolvedAndCorrect()) {
        return `${textValue} (오답입니다.)`;
      }

      if (!isSolved) {
        return `${textValue}`;
      }

      return `${textValue} (정답입니다.)`;
    }
  }

  isSolvedAndCorrect() {
    const { isSolved, isCorrect } = this.props;

    return !(isSolved && !isCorrect);
  }
}

VideoModalSingleChoiceComponent.propTypes = propTypes;
VideoModalSingleChoiceComponent.defaultProps = defaultProps;

export default VideoModalSingleChoiceComponent;
