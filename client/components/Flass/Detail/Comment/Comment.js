import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { List } from 'immutable';
import _ from 'lodash';
import styled from 'styled-components';
import PostComment from './PostComment';
import CommentItem from './CommentItem';
import ReplyComment from './ReplyCommentItem';
import ReplyPostComment from './ReplyPostComment';

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
    email: PropTypes.string.isRequired
  }).isRequired,
  fetchComment: PropTypes.func.isRequired,
  addComment: PropTypes.func.isRequired
};
const defaultProps = {};

class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedReply: -1
    };
  }

  handleSelectedReply = index => {
    const { selectedReply } = this.state;
    if(index === selectedReply) {
      this.setState({
        selectedReply: -1
      });
      return;
    }
    this.setState({
      selectedReply: index
    });
  };

  componentDidMount() {
    const { detailId, fetchComment } = this.props;
    fetchComment(detailId);
  }

  renderPostComment = (name, commentId) => {
    const { detailId, user, addComment } = this.props;

    return (<PostComment
      detailId={ detailId }
      name={ name }
      user={ user }
      addComment={ _.partial(addComment, commentId) } />);
  }

  renderComment = (comment, index, isReply = false) => {
    const { selectedReply } = this.state;
    const content = <div dangerouslySetInnerHTML={ { __html: comment.content } } />;
    return (<CommentItem
      key={ `comment${comment.id}` }
      userName={ comment.userName }
      content={ content }
      isReply={ isReply }
      isSelectedReply={ selectedReply === index }
      onSelectedReply={ _.partial(this.handleSelectedReply, index) } />);
  };

  renderReply = comment => {
    if (!comment) {
      return [];
    }
    const replyPostComments = [<ReplyPostComment component={ this.renderPostComment('답글 등록', comment.id) } />];
    return _.map(comment.replyComments,
      ((comment, index) => {
        const commentView = this.renderComment(comment, index, true);
        return <ReplyComment key={ `reply${comment.id}` } component={ commentView } />;
      }))
      .concat(replyPostComments);
  };

  renderChild = () => {
    const { comments } = this.props;
    const { selectedReply } = this.state;

    const commentsView = _.map(comments, (comment, index) => this.renderComment(comment, index));
    const replyCommentsView = this.renderReply(comments[selectedReply]);
    commentsView.splice(selectedReply + 1, 0, ...replyCommentsView);
    return commentsView;
  }

  render() {
    return (
      <DetailComment>
        {this.renderPostComment('질문 등록')}
        <Divider />
        {this.renderChild()}
      </DetailComment>
    );
  }
}

Comment.propTypes = propTypes;
Comment.defaultProps = defaultProps;

export default Comment;
