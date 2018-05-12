import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { List } from 'immutable';
import _ from 'lodash';
import styled from 'styled-components';
import PostComment from './PostComment';
import CommentItem from './CommentItem';
import ReplyComment from './ReplyCommentItem';
import ReplyPostComment from './ReplyPostComment';
import {
  FETCH_COMMENT, ADD_COMMENT,
  DELETE_COMMENT, UPDATE_COMMENT
} from '~/ducks/Flass/comments';

const LectureComment = styled.div`
  width: 100%;
  padding-top: 3rem;
  padding-bottom: 4rem;
`;

const propTypes = {
  lectureId: PropTypes.number.isRequired,
  comments: PropTypes.array.isRequired,
  commentchild: PropTypes.object.isRequired,
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    userName: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired
  }).isRequired,
  fetchComment: PropTypes.func.isRequired,
  addComment: PropTypes.func.isRequired,
  updateComment: PropTypes.func.isRequired,
  deleteComment: PropTypes.func.isRequired
};
const defaultProps = {};

class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedReply: -1,
      selectedUpdateId: -1
    };
  }

  componentDidMount() {
    const { lectureId, fetchComment } = this.props;
    if (lectureId !== -1) {
      fetchComment(lectureId);
    }
  }

  render() {
    return (
      <LectureComment>
        {this.renderPostComment('postComment', '질문 등록')}
        {this.renderChild()}
      </LectureComment>
    );
  }

  renderPostComment = (form, name, commentId, parentId, content) => {
    const { lectureId, user, addComment } = this.props;

    return (<PostComment
      key={`${form}${commentId}`}
      isReplyPost={!!parentId}
      isUpdate={!!content}
      form={form}
      initialValues={{ content }}
      lectureId={lectureId}
      name={name}
      user={user}
      addComment={_.partial(addComment, commentId)}
      updateComment={_.partial(this.handleUpdateComment, parentId, commentId)} />);
  }

  handleUpdateComment = (parentId, commentId, content) => {
    const { updateComment } = this.props;

    this.setState({
      selectedUpdateId: -1
    });
    updateComment(parentId, commentId, content);
  };

  renderChild = () => {
    const { comments } = this.props;
    const { selectedReply } = this.state;

    const commentsView = _.map(comments, (comment, index) => this.renderComment(comment, index));
    const replyCommentsView = this.renderReply(comments[selectedReply]);
    commentsView.splice(selectedReply + 1, 0, ...replyCommentsView);
    return commentsView;
  }

  renderComment = (comment, index, parentId) => {
    const { user, commentchild, deleteComment } = this.props;
    const { selectedReply, selectedUpdateId } = this.state;

    if (selectedUpdateId === comment.id) {
      return this.renderPostComment('updateComment', `${!!parentId ? '답글' : '질문'} 수정`, comment.id, parentId, comment.content);
    }
    const content = <div dangerouslySetInnerHTML={{ __html: comment.content }} />;
    const replyCount = commentchild[comment.id] || [];
    return (<CommentItem
      key={`comment${comment.id}`}
      id={comment.id}
      isAdmin={comment['user_id'] == user.id}
      userName={comment.userName}
      content={content}
      createdAt={comment.createdAt}
      isReply={!!parentId}
      replyCount={replyCount.length}
      like={comment.like}
      isSelectedReply={selectedReply === index}
      onSelectedReply={_.partial(this.handleSelectedReply, index)}
      onUpdate={_.partial(this.handleSelectedUpdateId, comment.id)}
      onDelete={_.partial(deleteComment, parentId)} />);
  };

  handleSelectedReply = index => {
    const { selectedReply } = this.state;
    if (index === selectedReply) {
      this.setState({
        selectedReply: -1
      });
      return;
    }
    this.setState({
      selectedReply: index
    });
  };

  handleSelectedUpdateId = commentId => {
    this.setState({
      selectedUpdateId: commentId
    });
  };

  renderReply = comment => {
    const { commentchild } = this.props;

    if (!comment) {
      return [];
    }
    const parentId = comment.id;
    const replyPostComments = [<ReplyPostComment
      key="reply-post"
      component={this.renderPostComment('replyPostComment', '답글 등록', comment.id, parentId)} />];

    return _.map(
      commentchild[parentId],
      ((comment, index) => {
        const commentView = this.renderComment(comment, index, parentId);
        return <ReplyComment key={`reply${comment.id}`} component={commentView} />;
      })
    )
      .concat(replyPostComments);
  };
}

Comment.propTypes = propTypes;
Comment.defaultProps = defaultProps;

function mapStateToProps(state) {
  return {
    comments: state.flass.lecture.comment.comments,
    commentchild: state.flass.lecture.comment.commentchild,
    user: state.flass.user
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchComment: lectureId => {
      dispatch({
        type: FETCH_COMMENT,
        lectureId
      });
    },
    addComment: (commentId, lectureId, userId, userName, content) => {
      dispatch({
        type: ADD_COMMENT,
        commentId,
        lectureId,
        userId,
        userName,
        content
      });
    },
    updateComment: (parentId, commentId, content) => {
      dispatch({
        type: UPDATE_COMMENT,
        parentId,
        commentId,
        content
      });
    },
    deleteComment: (parentId, commentId) => {
      dispatch({
        type: DELETE_COMMENT,
        parentId,
        commentId
      });
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Comment);
