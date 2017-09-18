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
    this.updateLectureAnalysis();
  }

  componentDidMount() {
    this.updateLectureAnalysis();
  }

  updateLectureAnalysis = () => {
    const { selectedIndex } = this.state;
    const { lectureId } = this.props;

    if (lectureId !== -1) {
      this.props.requestLectureAnalysis(lectureId, selectedIndex);
    }
  };

  render() {
    const { selectedIndex } = this.state;
    const { questions, answers } = this.props;

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
                  {`${answers.length}명`}
                </ChartTextNumber>
              </ChartTextWrapper>
              {this.renderChart()}
            </Col5>
            <Col5>
              {this.renderSingleChoices()}
            </Col5>
          </Row>
        </Body>
      </Wrapper>
    );
  }

  renderQuestions = () => {
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

  renderChart = () => {
    const usersOfAnswers = this.getUsersOfAnswers();

    const labels = usersOfAnswers.map(usersOfAnswer => usersOfAnswer.answer);
    const data = usersOfAnswers.map(usersOfAnswer => usersOfAnswer.userAnswers.length);
    return (<ChartComponent
      labels={ labels }
      data={ data } />);
  };

  renderSingleChoices = () => {
    const usersOfAnswers = this.getUsersOfAnswers();
    return usersOfAnswers.map(usersOfAnswer => (<SingleChoiceComponent
      key={ usersOfAnswer.id }
      { ...usersOfAnswer } />));
  }

  getUsersOfAnswers = () => {
    const { question_answers, answers } = this.props;

    return question_answers.map((questionAnswer, index) => ({
      id: questionAnswer.id,
      answer: questionAnswer.answer,
      userAnswers: answers.filter(answer => index == parseInt(answer.answer))
    }));
  }

}

Analysis.propTypes = propTypes;
Analysis.defaultProps = defaultProps;

export default Analysis;
