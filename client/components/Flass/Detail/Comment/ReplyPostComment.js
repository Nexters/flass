import React from 'react';
import PropTypes from 'prop-types';

const ReplayPostCommentView = styled.div`
  background-color: ${color['silver-two']};
`;

const propTypes = {
  component: PropTypes.element.isRequired,
};

const defaultProps = {};

const ReplyPostComment = ({ component }) => {
  return (
    <ReplayPostCommentView>
      { component }
    </ReplayPostCommentView>
  );
};

ReplyPostComment.propTypes = propTypes;
ReplyPostComment.defaultProps = defaultProps;

export default ReplyPostComment;
