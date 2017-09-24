import chai, { expect } from 'chai';
import { dateTimeFormat } from './time-util';


describe('time util', () => {
  it('날짜 포맷 테스트 1', () => {
    const dateStr = dateTimeFormat('2017-11-11T11:11:11.000Z');
    expect(dateStr).to.equal('2017-11-11 11:11:11');
  });
});
