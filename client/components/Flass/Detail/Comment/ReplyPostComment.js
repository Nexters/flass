import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import color from '../../common/colors.scss';

const ReplayPostCommentView = styled.div`
  padding-left: 35px;
  padding-top: 15px;
  padding-right: 15px;
  padding-bottom: 25px;
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
