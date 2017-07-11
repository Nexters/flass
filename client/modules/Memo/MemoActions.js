import firebase from 'firebase';

export const ADD_MEMO = 'ADD_MEMO';

export const fetchAddMemo = (memo) => {
  return {
    type: ADD_MEMO,
    memo: memo
  };
};

export const UPDATE_MEMO = 'UPDATE_MEMO';

export const fetchUpdateMemo = (key, memo) => {
  return {
    type: UPDATE_MEMO,
    key: key,
    memo: memo
  };
};

export const DELETE_MEMO_SUCCESS = 'DELETE_MEMO';

export const fetchDeleteMemo = (uid, key) => {
  return (dispatch) => {
    let database = firebase.database();
    let memoRef = database.ref(`memos/${uid}/${key}`);
    memoRef.remove();
    dispatch(fetchDeleteSuccess(key));
  }
};

export const fetchDeleteSuccess = (key) => {
  return {
    type : DELETE_MEMO_SUCCESS,
    key : key
  };
};

export const SELECTED_MEMO_ID = 'SELECTED_MEMO_ID';

export const fetchSelectedMemoId = (id) => {
  return {
    type: SELECTED_MEMO_ID,
    id: id
  };
};

export const UPDATE_UID = 'UPDATE_UID';

/**
 * update uid
 * @return {Function} The action handler.
 */
export const fetchUpdateUid = (uid) => {
  return {
    type: UPDATE_UID,
    uid: uid
  };
};
