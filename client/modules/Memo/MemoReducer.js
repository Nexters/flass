import {
  UPDATE_UID,
  ADD_MEMO,
  UPDATE_MEMO,
  DELETE_MEMO_SUCCESS,
  SELECTED_MEMO_ID
} from './MemoActions';

const initialState = {selectedId: -1, uid: '', memos: []};

const MemoReducer = (state = initialState, action) => {
  // console.log(state, action);
  switch (action.type) {
    case UPDATE_UID:
      return {
        ...state,
        uid: action.uid
      };
    case ADD_MEMO:
      return {
        ...state,
        memos: [...state.memos, action.memo]
      };
    case UPDATE_MEMO:
      return {
        ...state,
        memos: state.memos.map(memo => {
          if (memo.id === action.key) {
            return action.memo;
          }
          return memo;
        })
      };
    case DELETE_MEMO_SUCCESS :
      return {
        ...state,
        selectedId: -1,
        memos: state.memos.filter(memo => memo.id !== action.key)
      }
    case SELECTED_MEMO_ID:
      return {
        ...state,
        selectedId: action.id
      };
    default:
      return state;
  }
}

export default MemoReducer;
