import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import autobind from 'autobind-decorator';
import ChartComponent from './Chart/ChartComponent';
import SingleChoiceComponent from './SingleChoice/SingleChoiceComponent';
import {
  AnalysisStyled
} from './AnalysisStyled';

const { Tab, TabWrapper, TabItem, Wrapper, Header, Body, Row, Title, Col5, ChartTextWrapper, ChartTextTitle, ChartTextNumber } = AnalysisStyled;
const { string, func, arrayOf, shape, array, number, objectOf } = PropTypes;


const propTypes = {
  requestLectureAnalysis: func.isRequired,
  lectureId: number.isRequired,
  questions: arrayOf(shape({
    id: number,
    content: string,
    correct_answer: number,
    question_at: number
  })).isRequired,
  answers: objectOf(arrayOf(shape({
    id: number,
    user_id: number,
    question_id: number,
    answer: string,
    created_at: string,
    updated_at: string
  }))).isRequired
};

const defaultProps = {};

class Analysis extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedIndex: 0
    };
  }

  handleSelect = index => {
    this.setState({
      selectedIndex: index
    });
  }

  componentDidMount() {
    const { selectedIndex } = this.state;
    const { lectureId } = this.props;

    if (lectureId !== -1) {
      this.props.requestLectureAnalysis(lectureId, selectedIndex);
    }
  }

  render() {
    const { selectedIndex } = this.state;
    const { questions } = this.props;

    if (questions.length === 0) {
      return null;
    }
    const question = questions[selectedIndex];

    return (
      <Wrapper>
        <Header>
          {this.renderQuestions()}
        </Header>
        <Body>
          <Row>
            <Title>
              { `Q${selectedIndex + 1}. ${question.content}` }
            </Title>
          </Row>
          <Row marginTop>
            <Col5>
              <ChartTextWrapper>
                <ChartTextTitle>
                  퀴즈 완료 학생 수
                </ChartTextTitle>
                <ChartTextNumber>
                  {`${this.calcaulteTotalNumOfStudentsSolved(question)}명`}
                </ChartTextNumber>
              </ChartTextWrapper>
              <ChartComponent />
            </Col5>
            <Col5>
              {this.renderSingleChoices(question)}
            </Col5>
          </Row>
        </Body>
      </Wrapper>
    );
  }

  @autobind
  renderQuestions() {
    const { selectedIndex } = this.state;
    const { questions } = this.props;

    const questionTabs = _.map(questions, (question, index) => {
      const activeStyle = (index === selectedIndex) ? {
        backgroundColor: '#87ac1e',
        border: '1px #87ac1e solid',
        color: 'white'
      } : {};
      return (
        <TabWrapper key={ question.id }>
          <TabItem
            style={ activeStyle }
            onClick={ () => this.handleSelect(index) }>
            { `Q${index + 1}` }
          </TabItem>
        </TabWrapper>
      );
    });
    return <Tab> { questionTabs } </Tab>;
  }

  @autobind
  renderSingleChoices(question) {
    const { id } = question;
    const { answers } = this.props;
    const selectedAnswers = answers[id];
    return selectedAnswers.map(answer => (
      <SingleChoiceComponent
        key={ answer.id }
        { ...answer } />
      ));
  }

  @autobind
  calcaulteTotalNumOfStudentsSolved(question) {
    const { id } = question;
    const { answers } = this.props;
    const selectedAnswers = answers[id];
    return selectedAnswers.length;
  }
}

Analysis.propTypes = propTypes;
Analysis.defaultProps = defaultProps;

export default Analysis;
