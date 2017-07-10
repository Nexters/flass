import {connect} from 'react-redux';

import MemoContainer from './MemoContainer';
import {
  fetchUpdateUid,
  fetchAddMemo,
  fetchSaveMemo,
  fetchUpdateMemo,
  fetchDeleteMemo,
  fetchSelectedMemoId
} from './MemoActions';

/**
 * Handle state change and map it to local component props.
 *
 * @param {Object} state The new app state.
 */
function mapStateToProps(state) {
  return {
    ...state.memo
  };
}

/**
 * Map dispatch actions to props.
 *
 * @param {Function} dispatch The dispatch func.
 */
function mapDispatchToProps(dispatch) {
  return {
    onFetchUpdateUid: (uid) => {
      dispatch(fetchUpdateUid(uid));
    },
    fetchAddMemo: (data) => {
      let value = data.val();
      let memo = {
        id: data.key,
        txt: value.txt,
        created: value.created,
        updated: value.updated
      };
      dispatch(fetchAddMemo(memo));
    },
    fetchUpdateMemo: (data) => {
      let value = data.val();
      let memo = {
        id: data.key,
        txt: value.txt,
        created: value.created,
        updated: value.updated
      };
      dispatch(fetchUpdateMemo(data.key, memo));
    },
    fetchDeleteMemo: (uid, key) => {
      dispatch(fetchDeleteMemo(uid, key));
    },
    fetchSelectedMemoId: (id) => {
      dispatch(fetchSelectedMemoId(id));
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MemoContainer);
