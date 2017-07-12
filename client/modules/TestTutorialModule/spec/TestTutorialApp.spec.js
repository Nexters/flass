import { renderComponent, expect } from '../../../spec/helper';
import TestTutorialApp from '../TestTutorialApp';

describe('TestTutorialApp', () => {
  let component;

  beforeEach(() => {
    component = renderComponent(TestTutorialApp);
  });

  it('comment box가 존재해야한다.', () => {
    expect(component.find('.comment-box')).to.exist;
  });
});
