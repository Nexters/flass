import React from 'react';
import { shallow } from 'enzyme';
import chai, { expect } from 'chai';
import { all, call, fork, take, select, put, cancel, takeLatest } from 'redux-saga/effects';
import { fetchLectureAll } from '../sagas';
import { makeSelectedAnswer, requestLectureAnalysis, SUCCESS_REQUEST_LECTURE_ANALYSIS } from './analysises';
import agent from '../../../agent';

describe('Analysis ', () => {
  it('분석 요청하기 - 성공', () => {
    const param = { lectureId: 1, questionIndex: 0 };
    const gen = requestLectureAnalysis(param);

    expect(gen.next().value).to.deep.equal(call(agent.Analysis.fetch, param.lectureId));
    const analysis = {
      questions: [{ id: 1 }],
      answers: {
        1: []
      }
    };
    const { questions, answers } = analysis;
    const questionId = questions[param.questionIndex].id || -1;
    expect(gen.next(analysis).value).to.deep.equal(all(answers[questionId].map(answer => makeSelectedAnswer(answer))));
    const selectedAnswers = [];
    expect(gen.next(selectedAnswers).value).to.deep.equal(call(agent.Choice.fetch, questionId));
    const questionAnswers = [];
    expect(gen.next(questionAnswers).value).to.deep.equal(put({
      type: SUCCESS_REQUEST_LECTURE_ANALYSIS,
      payload: {
        questions,
        answers: selectedAnswers,
        question_answers: questionAnswers
      }
    }));
    expect(gen.next().done).to.equal(true);
  });

  it('분석 요청하기 유저 정보 - 성공', () => {
    const answer = { answer_id: 1, answer: 'test', user_id: 1 };
    const gen = makeSelectedAnswer(answer);

    expect(gen.next().value).to.deep.equal(call(agent.User.byId, answer['user_id']));
    expect(gen.next({ username: 'bobinlee' }).value).to.deep.equal({
      ...answer,
      userName: 'bobinlee'
    });
    expect(gen.next().done).to.equal(true);
  });
});
