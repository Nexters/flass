import React, {Component, PropTypes} from 'react';
import {FloatingActionButton, TextField} from "material-ui";
import ContentAdd from 'material-ui/svg-icons/content/add';

const propTypes = {
  memo: PropTypes.shape({
    id: PropTypes.string,
    txt: PropTypes.string
  })
};

const defaultProps = {
  memo: {}
};

class MemoDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      txt: props.txt
    };
    this.handleAddMemo = this.handleAddMemo.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  handleAddMemo(e) {
    const txt = this.state.txt;
    this.props.addMemo({
      txt: txt,
      created: new Date().getTime()
    });
    this.setState({txt: ''});
  }

  handleChange(e) {
    this.setState({txt: e.target.value});
  }

  handleBlur() {
    const {id} = this.props.memo;
    if (!id) {
      return;
    }
    const txt = this.state.txt;
    this.props.addMemo({
      ...this.props.memo,
      txt: txt,
      updated: new Date().getTime()
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      txt: nextProps.memo.txt
    });
  }

  render() {
    return (
      <div className=".memo-detail">
        <TextField
          defaultValue={this.state.txt}
          value={this.state.txt}
          hintText="some anything"
          multiLine={true}
          rows={20}
          onChange={this.handleChange}
          onBlur={this.handleBlur}
        />
        <FloatingActionButton className=".btn-add-memo" onClick={this.handleAddMemo}>
          <ContentAdd />
        </FloatingActionButton>
      </div>
    );
  }
}

MemoDetail.propTypes = propTypes;
MemoDetail.defaultProps = defaultProps;

export default MemoDetail;