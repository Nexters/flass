import { expect } from '../../../spec/helper';
import TestTutorialReducer from '../TestTutorialReducer';
import { SAVE_COMMENT } from '../TestTutorialActions';

describe('TestTutorialReducer', () => {
  it('다른 type action 처리', () => {
    expect(TestTutorialReducer(undefined, {})).to.eql([]);
  });

  it('SAVE_COMMENT type action 처리', () => {
    const action = { type: SAVE_COMMENT, payload: 'new comment' };
    expect(TestTutorialReducer([], action)).to.eql(['new comment']);
  });
});
