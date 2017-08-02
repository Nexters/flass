import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Avatar, Divider, List, ListItem } from 'material-ui';
import _ from 'lodash';
import PostComment from '../../../../modules/Flass/FlassDetail/Comment/PostCommentContainer';
import CommentItem from './CommentItem';

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
      <List>
        <PostComment />
        <Divider />
        {this.renderChild()}
      </List>
    );
  }
}

Comment.propTypes = propTypes;
Comment.defaultProps = defaultProps;

export default Comment;
