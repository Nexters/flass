import React from 'react';
import { shallow } from 'enzyme';
import chai, { expect } from 'chai';
import { call, fork, take, select, put, cancel, takeLatest } from 'redux-saga/effects';

describe('DetailActions ', () => {
  xit('should success fetchDetailAll', () => {
    const param = { detailId: 1 };
    const { detailId } = param;
    const gen = fetchDetailAll(param);
    expect(gen.next().value).to.deep.equal(put({ type: FETCH_READY_DETAIL }));
    expect(gen.next().value).to.deep.equal(call(agent.Detail.byId, detailId));
    expect(gen.next().value).to.deep.equal(put({ type: FETCH_QUESTION, detailId }));
    expect(gen.next().value).to.deep.equal(put({ type: FETCH_DETAIL_SUCCESS, detail: undefined }));
    expect(gen.next().value).to.deep.equal(put({ type: FETCH_VIDEO }));
    expect(gen.next().done).to.equal(true);
  });
});
