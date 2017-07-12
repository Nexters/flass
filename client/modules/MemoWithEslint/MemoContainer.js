import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import firebase from 'firebase';
import MemoList from './MemoList';
import MemoDetail from './MemoDetail';

const propTypes = {
  onFetchUpdateUid: PropTypes.func.isRequired,
  fetchAddMemo: PropTypes.func.isRequired,
  fetchUpdateMemo: PropTypes.func.isRequired,
  fetchSelectedMemoId: PropTypes.func.isRequired,
  fetchDeleteMemo: PropTypes.func.isRequired,
  memos: PropTypes.array,
  uid: PropTypes.string.isRequired,
  selectedId: PropTypes.string.isRequired
};

const defaultProps = {
  memos: []
};

class MemoContainer extends Component {
  constructor(props) {
    super(props);
    this.onGoogleAuth = this.onGoogleAuth.bind(this);
    this.onMemo = this.onMemo.bind(this);
    this.saveMemo = this.saveMemo.bind(this);
    this.onGoogleAuth();
  }

  onGoogleAuth() {
    const auth = firebase.auth();
    const authProvider = new firebase.auth.GoogleAuthProvider();

    auth.onAuthStateChanged(user => {
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
    const database = firebase.database();
    const memoRef = database.ref(`memos/${uid}`);
    memoRef.on('child_added', this.props.fetchAddMemo);
    memoRef.on('child_changed', this.props.fetchUpdateMemo);
  }

  render() {
    const { memos = [], selectedId } = this.props;
    return (
      <div>
        <MemoList
          memos={ memos }
          handleClick={ this.props.fetchSelectedMemoId }
          deleteMemo={ _.partial(this.props.fetchDeleteMemo, this.props.uid, _) } />
        <MemoDetail
          memo={ memos.find((memo => memo.id == selectedId)) }
          addMemo={ _.partial(this.saveMemo, this.props.uid, _) } />
      </div>
    );
  }

  saveMemo(uid, memo) {
    const database = firebase.database();
    if (memo.id) {
      const memoRef = database.ref(`memos/${uid}/${memo.id}`);
      memoRef.update({ txt: memo.txt, updated: memo.updated });
    } else {
      const memoRef = database.ref(`memos/${uid}`);
      memoRef.push(memo);
    }
  }
}

MemoContainer.propTypes = propTypes;
MemoContainer.defaultProps = defaultProps;

export default MemoContainer;
