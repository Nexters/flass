import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { List } from 'material-ui/List';
import MemoItem from './MemoItem';
import './MemoList.scss';

const propTypes = {
  handleClick: PropTypes.func.isRequired,
  deleteMemo: PropTypes.func.isRequired,
  memos: PropTypes.array
};

const defaultProps = {
  memos: []
};

class MemoList extends Component {
  render() {
    console.dir(this.props.memos);
    const memos = this.props.memos.map(memo => (
      <MemoItem
        key={ memo.id }
        memo={ memo }
        handleClick={ this.props.handleClick }
        deleteMemo={ this.props.deleteMemo } />
    ));

    return (
      <List className="memos">
        {memos}
      </List>
    );
  }
}

MemoList.propTypes = propTypes;
MemoList.defaultProps = defaultProps;

export default MemoList;
