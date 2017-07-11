import { renderComponent, expect } from '../../../spec/helper';
import CommentBox from '../CommentBox';

describe('CommentBox', () => {
  let component;

  beforeEach(() => {
    component = renderComponent(CommentBox);
  });

  it('comment-box 클래스를 가지고 있어야 한다.', () => {
    expect(component).to.have.class('comment-box');
  });

  it('textarea를 가지고 있어야 한다', () => {
    expect(component.find('textarea')).to.exist;
  });

  it('버튼을 가지고 있어야 한다', () => {
    expect(component.find('button')).to.exist;
  });

  describe('텍스트를 입력할 때', () => {
    beforeEach(() => {
      component.find('textarea').simulate('change', 'new comment');
    });

    it('텍스트가 textarea에 입력되어야 한다.', () => {
      expect(component.find('textarea')).to.have.value('new comment');
    });

    it('제출할 때 input이 지워져야 한다.', () => {
      component.simulate('submit');

      expect(component.find('textarea')).to.have.value('');
    });
  });
});
