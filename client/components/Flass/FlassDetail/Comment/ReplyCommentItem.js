import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import color from '../../common/colors.scss';

const ReplyIcon = styled.div`
  width: 20px;
  height: 20px;
  background-color: #fff;
`;

const ReplyContent = styled.div`
  display: inline-block;
`;

const propTypes = {
  component: PropTypes.element.isRequired,
};

const defaultProps = {};

const ReplayCommentView = styled.div`
  background-color: ${color['silver-two']};
`;

const ReplyComment = ({ component }) => {
  return (
    <ReplayCommentView>
      <ReplyIcon />
      <ReplyContent>
        { component }
      </ReplyContent>
    </ReplayCommentView>
  );
};

ReplyComment.propTypes = propTypes;
ReplyComment.defaultProps = defaultProps;

export default ReplyComment;
