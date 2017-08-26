import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autobind from 'autobind-decorator';
import ChartComponent from './Chart/ChartComponent';
import SingleChoiceComponent from './SingleChoice/SingleChoiceComponent';
import {
  AnalysisStyled
} from './AnalysisStyled';

const { string, func, arrayOf, shape, element, number } = PropTypes;

const propTypes = {
  requestLectureAnalysis: func.isRequired,
  lectureId: string.isRequired,
  questions: arrayOf(shape({
    content: string,
    correct_answer: string,
    id: number,
    question_at: number
  })).isRequired,
  answers: element.isRequired
};

const defaultProps = {};

class Analysis extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedQuestionIndex: 0,
      questions: []
    };
  }

  componentDidMount() {
    const { lectureId } = this.props;
    this.props.requestLectureAnalysis(lectureId);
  }

  render() {
    const { selectedQuestionIndex } = this.state;
    const { questions } = this.props;

    if (questions.length === 0) {
      return null;
    }
    const question = questions[selectedQuestionIndex];
    console.log('question::render');
    console.log(question);

    return (
      <AnalysisStyled.Wrapper>
        <AnalysisStyled.Header>
          {
            this.renderQuestions()
          }
        </AnalysisStyled.Header>
        <AnalysisStyled.Body>
          <AnalysisStyled.Row>
            <AnalysisStyled.Title>
              { `Q${selectedQuestionIndex + 1}. ${question.content}` }
            </AnalysisStyled.Title>
          </AnalysisStyled.Row>
          <AnalysisStyled.Row marginTop>
            <AnalysisStyled.Col5>
              <AnalysisStyled.ChartTextWrapper>
                <AnalysisStyled.ChartTextTitle>
                  퀴즈 완료 학생 수
                </AnalysisStyled.ChartTextTitle>
                <AnalysisStyled.ChartTextNumber>
                  {
                    `${this.calcaulteTotalNumOfStudentsSolved(question)}명`
                  }
                </AnalysisStyled.ChartTextNumber>
              </AnalysisStyled.ChartTextWrapper>
              <ChartComponent />
            </AnalysisStyled.Col5>

            <AnalysisStyled.Col5>
              {
                this.renderSingleChoices(question)
              }
            </AnalysisStyled.Col5>
          </AnalysisStyled.Row>
        </AnalysisStyled.Body>
      </AnalysisStyled.Wrapper>
    );
  }

  @autobind
  renderQuestions() {
    const { questions } = this.props;
    return questions.map((question, i) => (
      <AnalysisStyled.Tooltip key={ question.id }>
        { `Q${i}` }
      </AnalysisStyled.Tooltip>
    ));
  }

  @autobind
  renderSingleChoices(question) {
    const { id } = question;
    const { answers } = this.props;
    const selectedAnswers = answers[id];
    return Object.keys(selectedAnswers).map(key => {
      return (
        <SingleChoiceComponent />
      );
    });
  }

  @autobind
  calcaulteTotalNumOfStudentsSolved(question) {
    let numOfStudentsSolvedQuestion = 0;
    const { id } = question;
    const { answers } = this.props;
    const selectedAnswers = answers[id];
    Object.keys(selectedAnswers).forEach(key => {
      numOfStudentsSolvedQuestion += selectedAnswers[key].length;
    });

    return numOfStudentsSolvedQuestion;
  }
}

Analysis.propTypes = propTypes;
Analysis.defaultProps = defaultProps;

export default Analysis;
