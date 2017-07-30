import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Avatar, ListItem, TextField } from 'material-ui';
import './PostComment.scss';

const propTypes = {};

const defaultProps = {};

class PostComment extends Component {
  componentDidMount() {}

  render() {
    return (
      <form className="flass-post-comment">
        <img
          className="flass-post-comment-profile"
          src="http://via.placeholder.com/128x128"
          alt="" />
        <div className="flass-post-comment-text">
          <TextField
            hintText="Message Field"
            floatingLabelText="MultiLine and FloatingLabel"
            multiLine
            fullWidth
            rows={ 2 } />
        </div>
      </form>
    );
  }
}

PostComment.propTypes = propTypes;
PostComment.defaultProps = defaultProps;

export default PostComment;
