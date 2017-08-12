import React, {Component} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import color from '../../common/colors.scss';

const CommentItemMenuView = styled.div`
  width: 100px;
  position: relative;
  top: 5px;
  right: 60px;
  border-radius: 3px;
  border: solid 1px ${color['cool-grey']};
`;

const propTypes = {};

const defaultProps = {};

class CommentItemMenu extends Component {
  componentDidMount() {}

  render() {
    return (
      <CommentItemMenuView>
        <ul>
          <li>댓글 수정</li>
          <li>댓글 삭제</li>
        </ul>
      </CommentItemMenuView>
    );
  }
}

CommentItemMenu.propTypes = propTypes;
CommentItemMenu.defaultProps = defaultProps;

export default CommentItemMenu;
