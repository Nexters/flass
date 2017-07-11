import { expect } from '../../../spec/helper';
import { SAVE_COMMENT, saveComment } from '../TestTutorialActions';

describe('TestTutorialActions', () => {
  describe('saveComment', () => {
    it('type 확인', () => {
      const action = saveComment();
      expect(action.type).to.equal(SAVE_COMMENT);
    });

    it('payload 확인', () => {
      const COMMENT = 'new comment';
      const action = saveComment(COMMENT);
      expect(action.payload).to.equal(COMMENT);
    });
  });
});
