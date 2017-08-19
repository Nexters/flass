import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import styled from 'styled-components';
import color from '../../common/colors.scss';
import './CommentItem.scss';
import Heart from './images/heart.png';
import HeartActive from './images/heart-active.png';
import Menu from './images/menu.png';
import MenuActive from './images/menu-active.png';
import CommentItemMenu from './CommentItemMenu';

const DetailCommentItem = styled.div`
  padding: 2rem 0;
  border-bottom: solid 1px #d0d0d0;
`;

const UserName = styled.span`
  font-size: 1.6rem;
  color: #4c4c4c;
`;

const CommentMenu = styled.span`
  width: 55px;
  float: right;
`;

const HeartIcon = styled.img`
  width: 15px;
  margin-right: 3px;
  margin-bottom: 2px;
`;

const MenuIcon = styled.img`
  width: 5px;
  margin-left: 8px;
`;

const Content = styled.div`
  padding-top: 1rem;
  font-size: 1.4rem;
  word-break: break-all;
`;

const Bottom = styled.span`
  color: ${color['steel-grey']};
  font-weight: 300;
  font-size: 1.2rem;
`;

const propTypes = {
  id: PropTypes.number.isRequired,
  userName: PropTypes.string.isRequired,
  content: PropTypes.object.isRequired,
  isReply: PropTypes.bool.isRequired,
  isSelectedReply: PropTypes.bool.isRequired,
  onSelectedReply: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};
const defaultProps = {
  isReply: false
};

class CommentItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleMenu: true,
      toggleHeart: false
    };
  }

  handleToggleHeart = () => {
    const { toggleHeart } = this.state;
    this.setState({ toggleHeart: !toggleHeart });
  }

  handleToggleMenu = () => {
    const { toggleMenu } = this.state;
    this.setState({ toggleMenu: !toggleMenu });
  }

  componentDidMount() {}

  render() {
    const { id, userName, content, isReply, isSelectedReply, onSelectedReply, onDelete } = this.props;
    const { toggleMenu, toggleHeart } = this.state;

    return (
      <DetailCommentItem>
        <div>
          <UserName>{userName}</UserName>
          <CommentMenu className="flass-comment-item-float-box">
            <HeartIcon alt="like" src={ toggleHeart ? HeartActive : Heart } onClick={ this.handleToggleHeart } />
            11
            <MenuIcon alt="menu" src={ toggleMenu ? MenuActive : Menu } onClick={ this.handleToggleMenu } />
            {toggleMenu && <CommentItemMenu
              onDelete={ _.partial(onDelete, id) } />}
          </CommentMenu>
        </div>
        <Content>
          {content}
        </Content>
        <Bottom>
          2017.07.23 {!isReply && <a onClick={ onSelectedReply }>{ isSelectedReply ? '답글 닫기' : '답글 보기' }</a>}
        </Bottom>
      </DetailCommentItem>
    );
  }
}

CommentItem.propTypes = propTypes;
CommentItem.defaultProps = defaultProps;

export default CommentItem;
