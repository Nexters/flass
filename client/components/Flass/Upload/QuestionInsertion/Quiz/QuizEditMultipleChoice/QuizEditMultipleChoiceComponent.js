import { List } from 'immutable';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autobind from 'autobind-decorator';
import { QuizEditMultipleChoice } from './QuizEditMultipleChoiceStyled';
import QuizEditSingleChoiceComponent from './QuizEditSingleChoice/QuizEditSingleChoiceComponent';

const {
  func, shape, arrayOf, string, bool, number, oneOfType
} = PropTypes;

const propTypes = {
  decreaseNumOfQuestion: func.isRequired,
  completeEditQuestion: func.isRequired,
  deleteCompleteQuestion: func.isRequired,
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
};

const defaultProps = {
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
};

class QuizEditMultipleChoiceComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      isEdit: false,
      EditedTextStateOfFocusedQuestion: null
    };
  }

  componentWillMount() {
    const { textStateOfFocusdQuestion } = this.props;

    this.setState({
      title: this.props.textStateOfFocusdQuestion.TitleInputValue,
      EditedTextStateOfFocusedQuestion: textStateOfFocusdQuestion
    });
  }

  render() {
    const {
      title,
      isEdit
    } = this.state;

    const {
      secsStateOfFocusedQuestion: { label }
    } = this.props;

    return (
      <QuizEditMultipleChoice.Wrapper>
        <QuizEditMultipleChoice.Header>
          <QuizEditMultipleChoice.QuestionNum>{ label }</QuizEditMultipleChoice.QuestionNum>
          <span>
            <QuizEditMultipleChoice.QuestionTitle
              value={ title }
              onChange={ this.onTitleInputChange }
              disabled={ !isEdit } />
          </span>
        </QuizEditMultipleChoice.Header>

        <QuizEditMultipleChoice.Body>
          { this.renderChoices({ isEdit }) }
        </QuizEditMultipleChoice.Body>

        <QuizEditMultipleChoice.Footer>
          {
            !isEdit ?
            (
              <QuizEditMultipleChoice.Button
                right
                onClick={ this.onEditBtnClick }>
                수정
              </QuizEditMultipleChoice.Button>
            ) :
            (
              <QuizEditMultipleChoice.Button
                right
                onClick={ this.onCompleteBtnClick }>
                완료
              </QuizEditMultipleChoice.Button>
            )
          }
          <QuizEditMultipleChoice.Button
            right
            color="gray"
            onClick={ this.onDeleteBtnClick }>
            삭제
          </QuizEditMultipleChoice.Button>
        </QuizEditMultipleChoice.Footer>
      </QuizEditMultipleChoice.Wrapper>
    );
  }

  @autobind
  renderChoices({ isEdit }) {
    const choices = [];
    const {
      EditedTextStateOfFocusedQuestion: {
        numOfChoice,
        SingleChoiceValues
      }
    } = this.state;

    for (let i = 0; i < numOfChoice; i += 1) {
      const { isAnswer, choiceTextValue } = SingleChoiceValues[i];

      choices.push(<QuizEditSingleChoiceComponent
        key={ i }
        isChecked={ isAnswer }
        isEdit={ isEdit }
        quizIndex={ i }
        choiceTextValue={ choiceTextValue }
        onCheckboxClick={ this.onCheckboxClick }
        onChoiceInputChange={ this.onChoiceInputChange } />);
    }

    return choices;
  }

  @autobind
  onTitleInputChange(e) {
    const title = e.target.value;
    const { EditedTextStateOfFocusedQuestion } = this.state;

    this.setState({
      title,
      EditedTextStateOfFocusedQuestion: {
        ...EditedTextStateOfFocusedQuestion,
        TitleInputValue: title
      }
    });
  }

  @autobind
  onCheckboxClick(quizIndex) {
    const { EditedTextStateOfFocusedQuestion } = this.state;
    const { SingleChoiceValues, checkedQuizIndex } = EditedTextStateOfFocusedQuestion;

    const UpdatedSingleChoiceValues = List(SingleChoiceValues)
      .update(checkedQuizIndex, choice => ({ ...choice, isAnswer: false }))
      .update(quizIndex, choice => ({ ...choice, isAnswer: true }))
      .toArray();

    this.setState({
      EditedTextStateOfFocusedQuestion: {
        ...EditedTextStateOfFocusedQuestion,
        checkedQuizIndex: quizIndex,
        SingleChoiceValues: UpdatedSingleChoiceValues
      }
    });
  }

  @autobind
  onChoiceInputChange(choiceIndex, choiceTextValue) {
    const { EditedTextStateOfFocusedQuestion } = this.state;
    const { SingleChoiceValues } = EditedTextStateOfFocusedQuestion;

    const UpdatedSingleChoiceValues = List(SingleChoiceValues)
      .update(choiceIndex, choice => ({ ...choice, choiceTextValue }))
      .toArray();

    this.setState({
      EditedTextStateOfFocusedQuestion: {
        ...EditedTextStateOfFocusedQuestion,
        SingleChoiceValues: UpdatedSingleChoiceValues
      }
    });
  }

  @autobind
  onEditBtnClick() {
    this.setState({ isEdit: true });
  }

  @autobind
  onCompleteBtnClick() {
    const { EditedTextStateOfFocusedQuestion } = this.state;
    this.setState({ isEdit: false });
    this.props.completeEditQuestion({ EditedTextStateOfFocusedQuestion });
  }

  @autobind
  onDeleteBtnClick() {
    const { EditedTextStateOfFocusedQuestion: { indexOfQuestion } } = this.state;
    this.setState({ isEdit: false });
    this.props.deleteCompleteQuestion({ indexOfQuestion });
    this.props.decreaseNumOfQuestion();
  }
}

QuizEditMultipleChoiceComponent.propTypes = propTypes;
QuizEditMultipleChoiceComponent.defaultProps = defaultProps;

export default QuizEditMultipleChoiceComponent;
