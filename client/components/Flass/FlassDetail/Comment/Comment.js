import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import styled from 'styled-components';
import PostComment from '../../../../modules/Flass/FlassDetail/Comment/PostCommentContainer';
import CommentItem from './CommentItem';

const DetailComment = styled.div`
  width: 100%;
  padding-top: 3rem;
  padding-bottom: 4rem;
`;

const Divider = styled.hr`
  margin-bottom: 0;
  border-top: solid 1px #d0d0d0;
`;

const propTypes = {
  comments: PropTypes.array
};
const defaultProps = {
  comments: []
};

class Comment extends Component {
  componentDidMount() {}

  renderChild() {
    const { comments } = this.props;
    return comments.map(comment => {
      const content = <div dangerouslySetInnerHTML={ { __html: comment.content } } />;
      return (<CommentItem
        key={ comment.id }
        userName={ comment.userName }
        content={ content }
      />);
    });
  }

  render() {
    return (
      <DetailComment>
        <PostComment />
        <Divider />
        {this.renderChild()}
      </DetailComment>
    );
  }
}

Comment.propTypes = propTypes;
Comment.defaultProps = defaultProps;

export default Comment;
