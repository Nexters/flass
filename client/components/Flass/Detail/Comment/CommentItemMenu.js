import React, {Component} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import color from '../../common/colors.scss';

const CommentItemMenuView = styled.div`
  width: 80px;
  position: relative;
  top: 5px;
  right: 40px;
  border-radius: 3px;
  border: solid 1px ${color['cool-grey']};
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
`;

const propTypes = {
  onDelete: PropTypes.func.isRequired,
};

const defaultProps = {};

class CommentItemMenu extends Component {
  componentDidMount() {}

  render() {
    const { onDelete } = this.props;

    return (
      <CommentItemMenuView>
        <List>
          <Item>댓글 수정</Item>
          <Item onClick={ onDelete }>댓글 삭제</Item>
        </List>
      </CommentItemMenuView>
    );
  }
}

CommentItemMenu.propTypes = propTypes;
CommentItemMenu.defaultProps = defaultProps;

export default CommentItemMenu;
