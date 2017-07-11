import firebase from 'firebase';

export const ADD_MEMO = 'ADD_MEMO';
export const UPDATE_MEMO = 'UPDATE_MEMO';
export const DELETE_MEMO_SUCCESS = 'DELETE_MEMO';
export const SELECTED_MEMO_ID = 'SELECTED_MEMO_ID';
export const UPDATE_UID = 'UPDATE_UID';

export const fetchAddMemo = memo => ({ type: ADD_MEMO, memo });

export const fetchUpdateMemo = (key, memo) => ({ type: UPDATE_MEMO, key, memo });

export const fetchDeleteMemo = (uid, key) => (dispatch => {
  const database = firebase.database();
  const memoRef = database.ref(`memos/${uid}/${key}`);
  memoRef.remove();
  dispatch(fetchDeleteSuccess(key));
});

export const fetchDeleteSuccess = key => ({ type: DELETE_MEMO_SUCCESS, key });

export const fetchSelectedMemoId = id => ({ type: SELECTED_MEMO_ID, id });

export const fetchUpdateUid = uid => ({ type: UPDATE_UID, uid });
