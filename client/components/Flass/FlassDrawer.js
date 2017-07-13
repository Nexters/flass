import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import ContentSend from 'material-ui/svg-icons/content/send';
import ContentDrafts from 'material-ui/svg-icons/content/drafts';
import Divider from 'material-ui/Divider';
import { List, ListItem } from 'material-ui/List';
import FlassDrawerItem from './FlassDrawerItem';
import './FlassDrawer.scss';

const propTypes = {
};

const defaultProps = {
};

class FlassDrawer extends Component {
  componentDidMount() {
  }

  render() {
    return (
      <List className="flass-drawer">
        <div className="flass-drawer-top">
          <FlassDrawerItem icon={ <ContentInbox /> }>내 채널</FlassDrawerItem>
          <FlassDrawerItem icon={ <ActionGrade /> }>새 영상 만들기</FlassDrawerItem>
          <FlassDrawerItem icon={ <ContentSend /> }>구독 영상</FlassDrawerItem>
        </div>
        <div className="flass-drawer-bottom">
          <Divider className="flass-drawer-bottom-divider" />
          <FlassDrawerItem icon={ <ContentDrafts /> }>설정</FlassDrawerItem>
          <FlassDrawerItem icon={ <ContentInbox /> }>로그아웃</FlassDrawerItem>
        </div>
      </List>
    );
  }
}

FlassDrawer.propTypes = propTypes;
FlassDrawer.defaultProps = defaultProps;

export default FlassDrawer;
