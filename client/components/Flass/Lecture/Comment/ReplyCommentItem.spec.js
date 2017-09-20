import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import chai, { expect } from 'chai';
import ReplyCommentItem from './ReplyCommentItem';
import CommentItem from './CommentItem';

describe('<ReplyCommentItem />', () => {
  it('should have a Icon called \'ReplyIcon\'', () => {
    const onSelectedReply = sinon.stub();
    const props = {
      userName: 'leebobin',
      content: 'hello',
      isSelectedReply: false,
      onSelectedReply,
    };
    const component = <CommentItem {...props} />
    const wrapper = shallow(<ReplyCommentItem component={component} />);
    const actual = wrapper.find('img');
  });
});
