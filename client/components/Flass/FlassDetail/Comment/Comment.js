import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Avatar, Divider, List, ListItem } from 'material-ui';
import _ from 'lodash';
import PostComment from './PostComment';

const propTypes = {
  comments: PropTypes.arrayOf()
};

const defaultProps = {
  comments: []
};

class Comment extends Component {
  componentDidMount() {}

  renderChild() {
    const { comments } = this.props;
    return comments.map(comment => {
      const profile = <Avatar src={ comment.profileUrl } />;
      const content = <div dangerouslySetInnerHTML={ { __html: comment.content } } />;
      return (<ListItem
        key={ comment.id }
        leftAvatar={ profile }
        primaryText={ comment.userName }
        secondaryText={ content }
        secondaryTextLines={ 2 } />);
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
