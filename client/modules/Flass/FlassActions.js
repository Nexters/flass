

export const ADD_MEMO = 'ADD_MEMO';

export const fetchAddMemo = (memo) => {
  return {
    type: ADD_MEMO,
    memo: memo
  };
};
