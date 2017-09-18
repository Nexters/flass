import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import styled from 'styled-components';
import color from '../../../../css/base/colors.scss';
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

const Header = styled.div`
  position: relative;
  width: 100%;
`;

const UserName = styled.span`
  font-size: 1.6rem;
  color: #4c4c4c;
`;

const CommentMenu = styled.span`
  width: 55px;
  position: absolute;
  right: 0px;
  top: 0px;
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
  min-height: 60px;
  padding-top: 1rem;
  padding-bottom: 1rem;
  font-size: 1.4rem;
  word-break: break-all;
`;

const Bottom = styled.div`
  color: ${color['steel-grey']};
  font-weight: 300;
  font-size: 1.2rem;
`;

const BtnReply = styled.a`
  height: 30px;
  color: #337ab7;
  border: solid 1px ${color['steel-grey-two']};
  border-radius: 20px;
  padding: 5px 8px;
  margin-right: 13px;
  float: right;
`;

const propTypes = {
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  isAdmin: PropTypes.bool.isRequired,
  userName: PropTypes.string,
  content: PropTypes.object.isRequired,
  isReply: PropTypes.bool.isRequired,
  replyCount: PropTypes.number.isRequired,
  isSelectedReply: PropTypes.bool.isRequired,
  onSelectedReply: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
};
const defaultProps = {
  userName: '',
  isReply: false
};

class CommentItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleMenu: false,
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

  renderAdminMenu() {
    const { id, isAdmin, onDelete } = this.props;
    const { toggleMenu } = this.state;

    return toggleMenu && <CommentItemMenu
      onDelete={ _.partial(onDelete, id) } />;
  }

  render() {
    const { userName, content, isReply, replyCount, isSelectedReply, onSelectedReply } = this.props;
    const { toggleMenu, toggleHeart } = this.state;

    return (
      <DetailCommentItem>
        <Header>
          <UserName>{userName}</UserName>
          <CommentMenu className="flass-comment-item-float-box">
            <HeartIcon alt="like" src={ toggleHeart ? HeartActive : Heart } onClick={ this.handleToggleHeart } />
            X
            <MenuIcon alt="menu" src={ toggleMenu ? MenuActive : Menu } onClick={ this.handleToggleMenu } />
            {this.renderAdminMenu()}
          </CommentMenu>
        </Header>
        <Content>
          {content}
        </Content>
        <Bottom>
          2017.07.23 {!isReply &&
          <BtnReply onClick={ onSelectedReply }>{isSelectedReply
          ? `설명글 (${replyCount})`
          : `설명글 (${replyCount})`}</BtnReply>}
        </Bottom>
      </DetailCommentItem>
    );
  }
}

CommentItem.propTypes = propTypes;
CommentItem.defaultProps = defaultProps;

export default CommentItem;