import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import color from '../../../../css/base/colors.scss';

const CommentItemMenuView = styled.div`
  width: 80px;
  position: relative;
  top: 5px;
  right: 40px;
  border-radius: 3px;
  border: solid 1px ${color['cool-grey']};
  background-color: ${color['white']};
`;

const List = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
  text-align: center;
`;

const Item = styled.li`
  padding: 5px;
  border-bottom: 1px solid #eee;
  cursor: pointer;
`;

const propTypes = {
  isReply: PropTypes.bool.isRequired,
  onDelete: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired
};

const defaultProps = {};

class CommentItemMenu extends Component {
  render() {
    const { isReply, onUpdate, onDelete } = this.props;
    const name = isReply ? '답글' : '질문';
    return (
      <CommentItemMenuView>
        <List>
          <Item onClick={onUpdate}>{name} 수정</Item>
          <Item onClick={onDelete}>{name} 삭제</Item>
        </List>
      </CommentItemMenuView>
    );
  }
}

CommentItemMenu.propTypes = propTypes;
CommentItemMenu.defaultProps = defaultProps;

export default CommentItemMenu;
