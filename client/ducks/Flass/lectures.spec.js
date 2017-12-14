import React from 'react';
import { shallow } from 'enzyme';
import chai, { expect } from 'chai';
import { call, fork, take, select, put, cancel, takeLatest } from 'redux-saga/effects';
import { FETCH_READY_LECTURE, FETCH_LECTURE_SUCCESS } from './actions';
import { FETCH_QUESTION } from './Question/actions';
import agent from '../agent';
import { FETCH_VIDEO } from './Video/actions';
import { fetchLectureAll } from './sagas';

describe('LectureActions ', () => {
  it('should success fetchLectureAll', () => {
    const param = { lectureId: 1 };
    const { lectureId } = param;
    const gen = fetchLectureAll(param);
    expect(gen.next().value).to.deep.equal(put({ type: FETCH_READY_LECTURE }));
    expect(gen.next().value).to.deep.equal(call(agent.Lecture.byId, lectureId));
    expect(gen.next().value).to.deep.equal(
      [put({ type: FETCH_QUESTION, lectureId }),
        put({ type: FETCH_LECTURE_SUCCESS, lecture: undefined }),
        put({ type: FETCH_VIDEO, url: undefined })]);
    expect(gen.next().done).to.equal(true);
  });
});
