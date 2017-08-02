import React from 'react';
import PropTypes from 'prop-types';
import './CommentItem.scss';

const propTypes = {
  userName: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};
const defaultProps = {};

const CommentItem = (props) => {
  const { userName, content } = props;
  const src = 'http://via.placeholder.com/25x25';
  return (
    <div className="flass-comment-item">
      <div>
        <span>{userName}</span>
        <span className="flass-comment-item-float-box"><img alt="like" src={ src } />11<img alt="menu" src={ src } /></span>
      </div>
      <div>
        {content}
      </div>
      <small>
        2017.07.23 | <a>설명글 보기</a>
      </small>
    </div>
  );
};

CommentItem.propTypes = propTypes;
CommentItem.defaultProps = defaultProps;

export default CommentItem;
