import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Avatar, Divider, List, ListItem } from 'material-ui';
import _ from 'lodash';
import PostComment from './PostComment';

const propTypes = {};

const defaultProps = {};

class Comment extends Component {
  componentDidMount() {}

  render() {
    const items = _.times(5, (i) => (<ListItem
      key={i}
      leftAvatar={ <Avatar src="http://via.placeholder.com/128x128" /> }
      primaryText={
        <p>질문자 이름</p>
      }
      secondaryText={
        <p>
          <span>to me, Scott, Jennifer</span>
          --
          Wish I could come, but I&apos;m out of town this weekend.
        </p>
      }
      secondaryTextLines={ 2 } />)).concat();
    return (
      <List>
        <PostComment />
        <Divider />
        {items}
      </List>
    );
  }
}

Comment.propTypes = propTypes;
Comment.defaultProps = defaultProps;

export default Comment;
