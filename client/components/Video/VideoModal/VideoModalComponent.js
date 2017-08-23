import { List } from 'immutable';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autobind from 'autobind-decorator';

import { VideoModal } from './VideoModalStyled';
import VideoModalSingleChoiceComponent from './VideoModalSingleChoice/VideoModalSingleChoiceComponent';
import VideoModalCompletedSingleChoiceComponent from './VideoModalCompletedSingleChoice/VideoModalCompletedSingleChoiceComponent';

const { func, arrayOf, shape, number, bool, string } = PropTypes;

const propTypes = {
  onQuestionSolved: func.isRequired,
  onKeepGoingOnVideoCompleteCase: func.isRequired,
  textStateOfQuestions: arrayOf(shape({
    answerIndex: number,
    singleChoiceValues: arrayOf(shape({
      isAnswer: bool,
      textValue: string
    })),
    title: string.isRequired
  })).isRequired,
  indexOfQuestion: number,
  isVideoComplete: bool.isRequired,
  solvedQuestionsState: arrayOf(shape({
    indexOfQuestion: number,
    isCorrect: bool,
    indexOfSelectedChoice: number,
    indexOfAnswer: number
  })).isRequired
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
      isCorrect: false,
      isOpen: false
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ isOpen: true });
    }, 50);
  }

  render() {
    const {
      isSolved,
      isCorrect,
      isOpen
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
      <VideoModal.Container isOpen={ isOpen }>
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
                this.renderModalBtn()
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
    const { solvedQuestionsState, indexOfQuestion } = this.props;
    const solvedQuestionState = solvedQuestionsState[indexOfQuestion];

    return SingleChoiceValues.map((singleChoiceValue, index) => (
      !this.shouldRenderCompleteChoiceComponent() ?
        <VideoModalSingleChoiceComponent
          key={ index }
          isChecked={ index ===  selectedChoiceIndex }
          isSolved={ isSolved }
          isCorrect={ isCorrect }
          singleChoiceValue={ singleChoiceValue }
          choiceIndex={ index }
          onCheckboxClick={ this.onCheckboxClick } /> :
        <VideoModalCompletedSingleChoiceComponent
          key={ index }
          index={ index }
          solvedQuestionState={ solvedQuestionState }
          singleChoiceValue={ singleChoiceValue } />
    ));
  }

  shouldRenderCompleteChoiceComponent() {
    const { isVideoComplete, solvedQuestionsState, indexOfQuestion } = this.props;
    const solvedQuestionState = solvedQuestionsState[indexOfQuestion];

    return isVideoComplete || solvedQuestionState;
  }

  @autobind
  onCheckboxClick(choiceIndex) {
    this.setState({ selectedChoiceIndex: choiceIndex });
  }

  @autobind
  renderModalBtn() {
    const { isSolved, isCorrect } = this.state;

    if (!this.shouldRenderCompleteCaseModalBtn()) {
      if (!isSolved) {
        return (
          <VideoModal.Button
            right
            onClick={ this.isChoicesSelected() ? this.onClickSolveBtn : null }
            selected={ this.isChoicesSelected() }>
            확인
          </VideoModal.Button>
        );
      }
      return (
        <VideoModal.Button
          right
          onClick={ this.onClickKeepGoingBtn }
          isSolved={ isSolved }
          isCorrect={ isCorrect }
          selected={ this.isChoicesSelected() }>
          이어보기
        </VideoModal.Button>
      );
    } else {
      return (
        <VideoModal.Button
          right
          onClick={ this.onClickVideoCompleteCaseKeepGoingBtn }
          isSolved={ isSolved }
          isCorrect={ isCorrect }
          pointer
          selected={ this.isChoicesSelected() }>
          이어보기
        </VideoModal.Button>
      );
    }
  }

  shouldRenderCompleteCaseModalBtn() {
    const { isVideoComplete, solvedQuestionsState, indexOfQuestion } = this.props;
    const solvedQuestionState = solvedQuestionsState[indexOfQuestion];

    return isVideoComplete || solvedQuestionState;
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
    const {
      singleChoiceValues
    } = textStateOfQuestions[indexOfQuestion];
    const solvedQuestionState = {
      indexOfQuestion,
      isCorrect,
      indexOfSelectedChoice: selectedChoiceIndex,
      indexOfAnswer: List(singleChoiceValues).findKey(({ isAnswer }) => isAnswer)
    };

    this.setState({ isOpen: false });
    this.props.onQuestionSolved(solvedQuestionState);
  }

  @autobind
  onClickVideoCompleteCaseKeepGoingBtn() {
    this.setState({ isOpen: false });
    this.props.onKeepGoingOnVideoCompleteCase();
  }

  @autobind
  isChoicesSelected() {
    return this.state.selectedChoiceIndex !== -1;
  }
}

VideoModalComponent.propTypes = propTypes;
VideoModalComponent.defaultProps = defaultProps;

export { VideoModalComponent };
