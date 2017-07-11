import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const propTypes = {
  comments: PropTypes.array
};

const defaultProps = {
  comments: []
};

const CommentList = props => {
  const list = props.comments.map(comment => <li key={ comment }>{ comment }</li>);

  return (
    <ul className="comment-list">
      { list }
    </ul>
  );
};

CommentList.propTypes = propTypes;
CommentList.defaultProps = defaultProps;

const mapStateToProps = state => ({ comments: state.comments });

export default connect(mapStateToProps)(CommentList);
