import React, {Component, PropTypes} from 'react';
import MemoItem from "./MemoItem";
import './MemoList.scss';
import {List} from 'material-ui/List';

const propTypes = {
  memos: PropTypes.array,
  handleClick: PropTypes.func
};

const defaultProps = {};

class MemoList extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  render() {
    console.dir(this.props.memos);
    let memos = this.props.memos.map(memo => {
      return (<MemoItem key={memo.id}
                        memo={memo}
                        handleClick={this.props.handleClick}
                        deleteMemo={this.props.deleteMemo}
      />);
    })
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