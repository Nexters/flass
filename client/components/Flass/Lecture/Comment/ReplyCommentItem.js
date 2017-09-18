import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import color from '../../../FlassCommon/common/colors.scss';

const ReplayCommentView = styled.div`
  padding-right: 15px;
  background-color: ${color['silver-two']};
`;

const ReplyIcon = styled.img`
  width: 13px;
  position: relative;
  top: 20px;
  left: 12px;
  float: left;
`;

const ReplyContent = styled.div`
  padding-left: 35px;
`;

const propTypes = {
  component: PropTypes.element.isRequired,
};

const defaultProps = {};

const ReplyComment = ({ component }) => {
  return (
    <ReplayCommentView>
      <ReplyContent>
        { component }
      </ReplyContent>
    </ReplayCommentView>
  );
};

ReplyComment.propTypes = propTypes;
ReplyComment.defaultProps = defaultProps;

export default ReplyComment;
