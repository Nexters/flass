import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import styled from 'styled-components';
import PostComment from './PostComment';
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
  detailId: PropTypes.number.isRequired,
  comments: PropTypes.array.isRequired,
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    userName: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }).isRequired,
  fetchComment: PropTypes.func.isRequired,
  addComment: PropTypes.func.isRequired,
};
const defaultProps = {};

class Comment extends Component {
  componentDidMount() {
    const { detailId, fetchComment } = this.props;
    fetchComment(detailId);
  }

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
    const { detailId, user, addComment } = this.props;

    return (
      <DetailComment>
        <PostComment
          detailId={detailId}
          user={user}
          addComment={addComment}
        />
        <Divider />
        {this.renderChild()}
      </DetailComment>
    );
  }
}

Comment.propTypes = propTypes;
Comment.defaultProps = defaultProps;

export default Comment;
