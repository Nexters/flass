import { List } from 'immutable';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autobind from 'autobind-decorator';

import { VideoModal } from './VideoModalStyled';
import VideoModalSingleChoiceComponent from './VideoModalSingleChoice/VideoModalSingleChoiceComponent';

const { func, arrayOf, shape, number, bool, string } = PropTypes;

const propTypes = {
  onQuestionSolved: func.isRequired,
  textStateOfQuestions: arrayOf(shape({
    answerIndex: number,
    singleChoiceValues: arrayOf(shape({
      isAnswer: bool,
      textValue: string
    })),
    title: string.isRequired
  })).isRequired,
  indexOfQuestion: number
};

const defaultProps = {
  indexOfQuestion: -1
};

class VideoModalComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedChoiceIndex: -1,
      isSolved: false,
      isCorrect: false
    };
  }

  render() {
    const {
      isSolved,
      isCorrect
    } = this.state;

    const {
      textStateOfQuestions,
      indexOfQuestion
    } = this.props;

    const {
      answerIndex,
      singleChoiceValues,
      title
    } = textStateOfQuestions[indexOfQuestion];

    return (
      <VideoModal.Container>
        <VideoModal.Inner
          isSolved={ isSolved }
          isCorrect={ isCorrect }>
          <VideoModal.ContentWrapper>
            <VideoModal.Header>
              <VideoModal.QuestionNum>
                { this.renderQuestionNumber(indexOfQuestion) }
              </VideoModal.QuestionNum>
              <VideoModal.QuestionTitle>
                { title }
              </VideoModal.QuestionTitle>
            </VideoModal.Header>

            <VideoModal.Body>
              { this.renderChoices(answerIndex, singleChoiceValues) }
            </VideoModal.Body>

            <VideoModal.Footer>
              {
                !isSolved ?
                (
                  <VideoModal.Button
                    right
                    onClick={ this.onClickSolveBtn }>
                    확인
                  </VideoModal.Button>
                ) :
                (
                  <VideoModal.Button
                    right
                    onClick={ this.onClickKeepGoingBtn }
                    isSolved={ isSolved }
                    isCorrect={ isCorrect }>
                    이어보기
                  </VideoModal.Button>
                )
              }
            </VideoModal.Footer>
          </VideoModal.ContentWrapper>
        </VideoModal.Inner>
      </VideoModal.Container>
    );
  }

  @autobind
  renderQuestionNumber(indexOfQuestion) {
    return `Q${indexOfQuestion + 1}`;
  }

  @autobind
  renderChoices(answerIndex, SingleChoiceValues) {
    const { selectedChoiceIndex, isSolved, isCorrect } = this.state;

    return SingleChoiceValues.map((singleChoiceValue, index) => (
      <VideoModalSingleChoiceComponent
        key={ index }
        isChecked={ index ===  selectedChoiceIndex }
        isSolved={ isSolved }
        isCorrect={ isCorrect }
        singleChoiceValue={ singleChoiceValue }
        choiceIndex={ index }
        onCheckboxClick={ this.onCheckboxClick } />
    ));
  }

  @autobind
  onCheckboxClick(choiceIndex) {
    this.setState({ selectedChoiceIndex: choiceIndex });
  }

  @autobind
  onClickSolveBtn() {
    const { indexOfQuestion, textStateOfQuestions } = this.props;
    const { answerIndex } = textStateOfQuestions[indexOfQuestion];
    const { selectedChoiceIndex } = this.state;

    if (answerIndex === selectedChoiceIndex) {
      this.setState({ isCorrect: true, isSolved: true });
    } else {
      this.setState({ isCorrect: false, isSolved: true });
    }
  }

  @autobind
  onClickKeepGoingBtn() {
    const {
      indexOfQuestion,
      textStateOfQuestions
     } = this.props;
    const {
      isCorrect,
      selectedChoiceIndex
    } = this.state;
    const { singleChoiceValues } = textStateOfQuestions[indexOfQuestion];
    const solvedQuestionState = {
      indexOfQuestion,
      isCorrect,
      indexOfSelectedChoice: selectedChoiceIndex,
      indexOfAnswer: List(singleChoiceValues).findKey(({ isAnswer }) => isAnswer)
    };

    this.props.onQuestionSolved(solvedQuestionState);
  }
}

VideoModalComponent.propTypes = propTypes;
VideoModalComponent.defaultProps = defaultProps;

export { VideoModalComponent };
