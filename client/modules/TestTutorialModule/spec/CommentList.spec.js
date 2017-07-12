import { renderComponent, expect } from '../../../spec/helper';
import CommentList from '../CommentList';

describe('CommentList', () => {
  let component;

  beforeEach(() => {
    const props = { comments: ['New Comment', 'Other New Comment'] };
    component = renderComponent(CommentList, null, props);
  });

  it('comment li를 만든다.', () => {
    expect(component.find('li').length).to.equal(2);
  });

  it('comment가 맞는지 확인', () => {
    expect(component).to.contain('New Comment');
    expect(component).to.contain('Other New Comment');
  });
});
