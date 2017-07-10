import React, {Component, PropTypes} from 'react';
import firebase from 'firebase';
import MemoList from "./MemoList";
import MemoDetail from "./MemoDetail";
import _ from 'lodash';

const propTypes = {};

const defaultProps = {};

class MemoContainer extends Component {
  constructor(props) {
    super(props);
    this.onGoogleAuth = this.onGoogleAuth.bind(this);
    this.onMemo = this.onMemo.bind(this);
    this.saveMemo = this.saveMemo.bind(this);
    this.onGoogleAuth();
  }

  onGoogleAuth() {
    let auth = firebase.auth();
    let authProvider = new firebase.auth.GoogleAuthProvider();

    auth.onAuthStateChanged((user) => {
      if (user) {
        console.log(user);
        this.props.onFetchUpdateUid(user.uid);
        this.onMemo(user.uid);
      } else {
        auth.signInWithPopup(authProvider);
      }
    });
  }

  onMemo(uid) {
    let database = firebase.database();
    let memoRef = database.ref(`memos/${uid}`);
    memoRef.on('child_added', this.props.fetchAddMemo);
    memoRef.on('child_changed', this.props.fetchUpdateMemo);
  }

  saveMemo(uid, memo) {
    let database = firebase.database();
    if (memo.id) {
      let memoRef = database.ref(`memos/${uid}/${memo.id}`);
      memoRef.update({txt: memo.txt, updated: memo.updated});
    } else {
      let memoRef = database.ref(`memos/${uid}`);
      memoRef.push(memo);
    }
  }

  render() {
    const {memos = [], selectedId} = this.props;
    return (
      <div>
        1231312312
        <MemoList memos={memos}
                  handleClick={this.props.fetchSelectedMemoId}
                  deleteMemo={_.partial(this.props.fetchDeleteMemo, this.props.uid, _)}
        />
        <MemoDetail memo={memos.find((memo => memo.id == selectedId))}
                    addMemo={_.partial(this.saveMemo, this.props.uid, _)}/>
        asdaslndaslkdnaslkdnasl
      </div>
    );
  }
}

MemoContainer.propTypes = propTypes;
MemoContainer.defaultProps = defaultProps;

export default MemoContainer;