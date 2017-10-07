import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import autobind from 'autobind-decorator';

import VideoComponent from './Video/VideoComponent';
import QuizComponent from './Quiz/QuizComponent';
import ModalComponent from '../Modal/ModalComponent';

import './QuestionInsertionComponentStyles.scss';

const { func, string, bool, arrayOf, number, shape, oneOfType } = PropTypes;

const propTypes = {
  saveMultipleChoiceQuestion: func.isRequired,
  cancelAddingQuestion: func.isRequired,
  addMultipleChoiceQuestion: func.isRequired,
  completeAddingQuestion: func.isRequired,
  addQuestionSecs: func.isRequired,
  focusOnQuestion: func.isRequired,
  completeEditQuestion: func.isRequired,
  deleteCompleteQuestion: func.isRequired,
  // requestUploadQuestions: func.isRequired,
  onClickUploadBtn: func.isRequired,
  isAdding: bool,
  questionSecsStateArray: arrayOf(shape({
    playedSeconds: number,
    label: string
  })),
  questionStateArray: arrayOf(shape({
    TitleInputValue: string,
    checkedQuizIndex: number,
    numOfChoice: number,
    SingleChoiceValues: arrayOf(shape({
      isAnswer: bool,
      choiceTextValue: string
    })),
    secsOfQuiz: string,
    indexOfQuestion: number
  })).isRequired,
  stateOfFocusedQuestion: shape({
    secsStateOfFocusedQuestion: shape({
      playedSeconds: number,
      label: string,
      isFocused: bool
    }),
    textStateOfFocusdQuestion: shape({
      TitleInputValue: string,
      checkedQuizIndex: number,
      numOfChoice: number,
      SingleChoiceValues: arrayOf(shape({
        isAnswer: bool,
        choiceTextValue: string
      })),
      secsOfQuiz: oneOfType([string, number]),
      indexOfQuestion: number
    })
  }),
  isUploadingQuestionRequestSuccess: bool.isRequired,
  videoUrl: string.isRequired,
  lectureUrl: string
};
const defaultProps = {
  isAdding: false,
  questionSecsStateArray: [],
  stateOfFocusedQuestion: {
    secsStateOfFocusedQuestion: {
      playedSeconds: -1,
      label: '',
      isFocused: false
    },
    textStateOfFocusdQuestion: {
      TitleInputValue: '',
      checkedQuizIndex: -1,
      numOfChoice: -1,
      SingleChoiceValues: [],
      secsOfQuiz: '',
      indexOfQuestion: -1
    }
  }
};

class QuestionInsertionComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      duration: 0,
      played: 0,
      loaded: 0,
      seeking: false,
      isQuizSecs: false,
      playing: true,
      numOfQuestion: 1
    };
  }

  render() {
    const {
      duration,
      played,
      loaded,
      isQuizSecs,
      playing,
      numOfQuestion
    } = this.state;

    const {
      isAdding,
      questionSecsStateArray,
      stateOfFocusedQuestion,
      videoUrl
    } = this.props;

    return (
      <div>
        <div className="Row">
          <div className="Row__player-large-5">
            <VideoComponent
              VideoBarClassName="bar--thinner"
              VideoPlayedBarClassName="played-bar--thinner"
              VideoLoadedBarClassName="loaded-bar--thinner"
              VideoQuizIndicatorClassName="quiz-indicator--thinner"
              VideoQuizIndicatorBarClassName="quiz-indicator-bar--thinner"
              VideoPlayPauseBtnClassName={ classNames('video-btn', 'video-btn--l-margin') }
              VideoVolumeBtnClassName="video-btn"
              VideoVolumeBarClassName={ classNames('video-volume-bar') }

              setPlayer={ this.setPlayer }
              playerSeekTo={ this.playerSeekTo }
              onProgress={ this.onProgress }
              onDuration={ this.onDuration }
              setSeekingState={ this.setSeekingState }
              setPlayingState={ this.setPlayingState }
              setPlayedState={ this.setPlayedState }
              setIsQuizSecsState={ this.setIsQuizSecsState }
              onQuestionbarClick={ this.onQuestionbarClick }
              url={ videoUrl }
              duration={ duration }
              played={ played }
              loaded={ loaded }
              playing={ playing }
              isQuizSecs={ isQuizSecs }
              questionSecsStateArray={ questionSecsStateArray } />
          </div>

          <div className="Row__player-large-5">
            <QuizComponent
              saveMultipleChoiceQuestion={ this.saveMultipleChoiceQuestion }
              setPlayingState={ this.setPlayingState }
              cancelAddingQuestion={ this.cancelAddingQuestion }
              completeAddingQuestion={ this.completeAddingQuestion }
              addMultipleChoiceQuestion={ this.addMultipleChoiceQuestion }
              decreaseNumOfQuestion={ this.decreaseNumOfQuestion }
              completeEditQuestion={ this.completeEditQuestion }
              deleteCompleteQuestion={ this.deleteCompleteQuestion }

              isAdding={ isAdding }
              numOfQuestion={ numOfQuestion }
              stateOfFocusedQuestion={ stateOfFocusedQuestion } />
          </div>
        </div>

        <div className="Row Row--t-large-margin">
          <div className="flass-upload-insertion-media__container">
            <div
              className="flass-upload-insertion-media__btn"
              onClick={ this.onClickUploadBtn }>
              <span>
                업 로 드
              </span>
            </div>
          </div>

        </div>

        {
          this.renderModal()
        }
      </div>
    );
  }

  @autobind
  renderModal() {
    const { isUploadingQuestionRequestSuccess, lectureUrl } = this.props;
    return (
      isUploadingQuestionRequestSuccess ?
        <ModalComponent
          url={ lectureUrl }
        /> :
        null
    );
  }

  @autobind
  setPlayer(player) {
    this.player = player;
  }

  @autobind
  playerSeekTo(percentage) {
    this.player.seekTo(percentage);
  }

  @autobind
  onDuration(duration) {
    this.setState({ duration });
  }

  @autobind
  onProgress(state) {
    if (!this.state.seeking) {
      this.setState(state);
    }
  }

  @autobind
  setSeekingState(seeking) {
    this.setState({ seeking });
  }

  @autobind
  setIsQuizSecsState(isQuizSecs) {
    this.setState({ isQuizSecs });
  }

  @autobind
  setPlayingState(playing) {
    this.setState({ playing });
  }

  @autobind
  setPlayedState(played) {
    this.setState({ played });
  }

  @autobind
  addMultipleChoiceQuestion() {
    this.props.addMultipleChoiceQuestion();
  }

  @autobind
  cancelAddingQuestion() {
    this.props.cancelAddingQuestion();
  }

  @autobind
  saveMultipleChoiceQuestion(quizState) {
    const { numOfChoice, checkedQuizIndex, TitleInputValue, SingleChoiceValues } = quizState;
    const { duration, played, numOfQuestion } = this.state;
    const secsOfQuiz = (duration * played).toFixed(2);
    // const labelOfQuiz = this.makeQuestionTooltipLabel(numOfQuestion);

    this.props.saveMultipleChoiceQuestion({
      numOfQuestion,
      numOfChoice,
      checkedQuizIndex,
      TitleInputValue,
      SingleChoiceValues,
      duration,
      played,
      secsOfQuiz
    });
    this.props.addQuestionSecs({
      playedSeconds: secsOfQuiz,
      indexOfQuestion: numOfQuestion
    });
    this.increaseNumOfQuestion();
  }

  makeQuestionTooltipLabel(numOfQuestion) {
    return `Q${numOfQuestion}`;
  }

  increaseNumOfQuestion() {
    this.setState({ numOfQuestion: this.state.numOfQuestion + 1 });
  }

  @autobind
  decreaseNumOfQuestion() {
    this.setState({ numOfQuestion: this.state.numOfQuestion - 1 });
  }

  @autobind
  completeAddingQuestion() {
    this.props.completeAddingQuestion();
  }

  @autobind
  onQuestionbarClick({ label }) {
    this.props.focusOnQuestion({ label });
    this.setPlayingState(false);
  }

  @autobind
  completeEditQuestion({ EditedTextStateOfFocusedQuestion }) {
    this.props.completeEditQuestion({ EditedTextStateOfFocusedQuestion });
    this.setPlayingState(true);
  }

  @autobind
  deleteCompleteQuestion({ indexOfQuestion }) {
    this.props.deleteCompleteQuestion({ indexOfQuestion });
    this.setPlayingState(true);
  }

  @autobind
  onClickUploadBtn() {
    const { questionStateArray } = this.props;
    // this.props.requestUploadQuestions({ questionState: questionStateArray });
    this.props.onClickUploadBtn({ questionState: questionStateArray });
    this.setPlayingState(false);
  }
}

QuestionInsertionComponent.propTypes = propTypes;
QuestionInsertionComponent.defaultProps = defaultProps;

export default QuestionInsertionComponent;
