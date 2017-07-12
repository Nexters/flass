import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as actions from './TestTutorialActions';

const propTypes = {
  saveComment: PropTypes.func.isRequired
};

const defaultProps = {};

class CommentBox extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.state = { comment: '' };
  }

  render() {
    return (
      <form onSubmit={ this.handleSubmit } className="comment-box">
        <textarea
          value={ this.state.comment }
          onChange={ this.handleChange } />
        <div>
          <button action="submit">제출하기</button>
        </div>
      </form>
    );
  }

  handleSubmit(e) {
    e.preventDefault();

    this.props.saveComment(this.state.comment);
    this.setState({ comment: '' });
  }

  handleChange(e) {
    this.setState({ comment: e.target.value });
  }
}

CommentBox.propTypes = propTypes;
CommentBox.defaultProps = defaultProps;

export default connect(null, actions)(CommentBox);
