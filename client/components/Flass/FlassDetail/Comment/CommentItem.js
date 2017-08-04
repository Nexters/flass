import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import color from '../../common/colors.scss';
import './CommentItem.scss';

const DetailCommentItem = styled.div`
  padding: 2rem 0;
  border-bottom: solid 1px #d0d0d0;
`;

const UserName = styled.span`
  font-size: 1.6rem;
  color: #4c4c4c;
`;

const CommentMenu = styled.span`
  float: right;
`;

const Content = styled.div`
  padding-top: 1rem;
  font-size: 1.4rem;
`;

const Bottom = styled.span`
  color: ${color['steel-grey']};
  font-weight: 300;
  font-size: 1.2rem;
`;

const propTypes = {
  userName: PropTypes.string.isRequired,
  content: PropTypes.object.isRequired
};
const defaultProps = {};

const CommentItem = props => {
  const { userName, content } = props;
  const src = 'http://via.placeholder.com/25x25';
  return (
    <DetailCommentItem>
      <div>
        <UserName>{userName}</UserName>
        <CommentMenu className="flass-comment-item-float-box">
          <img alt="like" src={ src } />11<img alt="menu" src={ src } />
        </CommentMenu>
      </div>
      <Content>
        {content}
      </Content>
      <Bottom>
        2017.07.23 | <a>설명글 보기</a>
      </Bottom>
    </DetailCommentItem>
  );
};

CommentItem.propTypes = propTypes;
CommentItem.defaultProps = defaultProps;

export default CommentItem;
