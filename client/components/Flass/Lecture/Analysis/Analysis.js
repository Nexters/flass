import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import ChartComponent from './Chart/ChartComponent';
import SingleChoiceComponent from './SingleChoice/SingleChoiceComponent';
import AnalysisTabItemComponent from './AnalysisTabItem/AnalysisTabItemComponent';
import { AnalysisLoadingHOC } from './AnalysisLoadingHOC';
import { AnalysisFetchHOC } from './AnalysisFetchHOC';
import { AnalysisMapAnswersHOC } from './AnalysisMapAnswersHOC';
import {
  AnalysisStyled
} from './AnalysisStyled';

const {
  Tab,
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
  render() {
    const { answers, questionIndex, question } = this.props;

    return (
      <Wrapper>
        <Header>
          {this._renderQuestionTabs()}
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
              {this._renderChart()}
            </Col5>
            <Col5>
              {this._renderSingleChoices(question)}
            </Col5>
          </Row>
        </Body>
      </Wrapper>
    );
  }

  _renderQuestionTabs = () => {
    return (
      <Tab>
        { this._renderQuestionTab() }
      </Tab>
    );
  }

  _renderQuestionTab = () => {
    const { questions, questionIndex } = this.props;

    return _.map(questions, (question, index) => {
      return (
        <AnalysisTabItemComponent
          key={ question.id }
          isActive={ index === questionIndex }
          questionId={ question.id }
          questionIndex={ index }
          handleSelect={ this._handleSelect } />
      );
    });
  }

  _handleSelect = index => {
    this.props.updateLectureAnalysis(index);
  }

  _renderChart = () => {
    const { usersOfAnswers } = this.props;

    const labels = usersOfAnswers.map(usersOfAnswer => usersOfAnswer.answer);
    const data = usersOfAnswers.map(usersOfAnswer => usersOfAnswer.userAnswers.length);
    return (<ChartComponent
      labels={ labels }
      data={ data } />);
  };

  _renderSingleChoices = question => {
    const { usersOfAnswers } = this.props;
    return usersOfAnswers.map(usersOfAnswer => (<SingleChoiceComponent
      key={ usersOfAnswer.id }
      question={ question }
      { ...usersOfAnswer } />));
  }
}

Analysis.propTypes = propTypes;
Analysis.defaultProps = defaultProps;

export default AnalysisFetchHOC(AnalysisMapAnswersHOC(AnalysisLoadingHOC(Analysis)));
