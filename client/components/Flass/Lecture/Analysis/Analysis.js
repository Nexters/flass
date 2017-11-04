import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import ChartComponent from './Chart/ChartComponent';
import SingleChoiceComponent from './SingleChoice/SingleChoiceComponent';
import { AnalysisLoadingHOC } from './AnalysisLoadingHOC';
import { AnalysisFetchHOC } from './AnalysisFetchHOC';
import {
  AnalysisStyled
} from './AnalysisStyled';

const {
  Tab,
  TabWrapper,
  TabItem,
  ActiveTabItemStyle,
  Wrapper,
  Header,
  Body,
  Row,
  Title,
  Col5,
  ChartTextWrapper,
  ChartTextTitle,
  ChartTextNumber
} = AnalysisStyled;
const { string, func, arrayOf, shape, number } = PropTypes;


const propTypes = {
  updateLectureAnalysis: func.isRequired,
  questionIndex: number.isRequired,
  questions: arrayOf(shape({
    id: number,
    content: string,
    correct_answer: string,
    question_at: number
  })).isRequired,
  question: shape({
    id: number,
    content: string,
    correct_answer: string,
    question_at: number
  }).isRequired,
  question_answers: arrayOf(shape({
    id: number,
    question_id: number,
    answer: string,
    created_at: string,
    updated_at: string
  })).isRequired,
  answers: arrayOf(shape({
    id: number,
    user_id: number,
    question_id: number,
    answer: string,
    created_at: string,
    updated_at: string
  })).isRequired
};

const defaultProps = {};

class Analysis extends Component {
  state = {
    selectedIndex: 0
  };

  render() {
    const { answers, questionIndex, question } = this.props;

    return (
      <Wrapper>
        <Header>
          {this.renderQuestions()}
        </Header>
        <Body>
          <Row>
            <Title>
              { `Q${questionIndex + 1}. ${question.content}` }
            </Title>
          </Row>
          <Row marginTop>
            <Col5>
              <ChartTextWrapper>
                <ChartTextTitle>
                  퀴즈 완료 학생 수
                </ChartTextTitle>
                <ChartTextNumber>
                  {`${answers.length}명`}
                </ChartTextNumber>
              </ChartTextWrapper>
              {this.renderChart()}
            </Col5>
            <Col5>
              {this.renderSingleChoices(question)}
            </Col5>
          </Row>
        </Body>
      </Wrapper>
    );
  }

  renderQuestions = () => {
    const { questions, questionIndex } = this.props;

    const questionTabs = _.map(questions, (question, index) => {
      const activeStyle = (index === questionIndex) ? ActiveTabItemStyle : {};
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

  handleSelect = index => {
    this.props.updateLectureAnalysis(index);
  }

  renderChart = () => {
    const usersOfAnswers = this.getUsersOfAnswers();

    const labels = usersOfAnswers.map(usersOfAnswer => usersOfAnswer.answer);
    const data = usersOfAnswers.map(usersOfAnswer => usersOfAnswer.userAnswers.length);
    return (<ChartComponent
      labels={ labels }
      data={ data } />);
  };

  renderSingleChoices = question => {
    const usersOfAnswers = this.getUsersOfAnswers(question['correct_answer']);
    return usersOfAnswers.map(usersOfAnswer => (<SingleChoiceComponent
      key={ usersOfAnswer.id }
      question={ question }
      { ...usersOfAnswer } />));
  }

  getUsersOfAnswers = correctAnswer => {
    const { question_answers, answers } = this.props;

    return question_answers.map((questionAnswer, index) => ({
      id: questionAnswer.id,
      answer: questionAnswer.answer,
      isCorrect: index == correctAnswer,
      userAnswers: answers.filter(answer => index == parseInt(answer.answer))
    }));
  }

  _setStateSelectedIndex = selectedIndex => {
    this.setState({ selectedIndex });
  }
}

Analysis.propTypes = propTypes;
Analysis.defaultProps = defaultProps;

export default AnalysisFetchHOC(AnalysisLoadingHOC(Analysis));
