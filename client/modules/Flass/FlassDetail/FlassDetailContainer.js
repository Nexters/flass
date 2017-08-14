import { connect } from 'react-redux';
import FlassDetail from '../../../components/Flass/FlassDetail/FlassDetail';
import { FETCH_DETAIL } from './FlassDetailActions';
import {
  LOAD_VIDEO
} from './Video/VideoActions';

function mapStateToProps(state) {
  return {
    ...state.flass.detail,
    ...state.flass.video
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchRequestDetailAll: detailId => {
      dispatch({
        type: FETCH_DETAIL,
        detailId
      });
    },
    loadVideoUrl: () => dispatch({ type: LOAD_VIDEO })
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FlassDetail);
