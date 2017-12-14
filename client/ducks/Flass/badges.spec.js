import React from 'react';
import { shallow } from 'enzyme';
import chai, { expect } from 'chai';
import { call, fork, take, select, put, cancel, takeLatest } from 'redux-saga/effects';
import agent from '../agent';
import {
  FETCH_BADGE_HISTORY_SUCCESS, FETCH_READY_BADGE_HISTORY,
  fetchBadgeHistory,
} from './badges';

describe('BadgeSagas ', () => {
  it('should success fetchBadgeHistory', () => {
    const param = { badgeType: 1 };
    const gen = fetchBadgeHistory(param);

    expect(gen.next().value).to.deep.equal(put({ type: FETCH_READY_BADGE_HISTORY }));
    expect(gen.next().value).to.deep.equal(call(agent.Badge.byType, param.badgeType));
    expect(gen.next().value).to.deep.equal(put({ type: FETCH_BADGE_HISTORY_SUCCESS,
      badgeItems: undefined,
      badgeType: param.badgeType }));
    expect(gen.next().done).to.equal(true);
  });
});
