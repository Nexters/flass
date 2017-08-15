import { connect } from 'react-redux';
import Detail from './Detail';
import { FETCH_DETAIL } from '../../../modules/Flass/Detail/DetailActions';
import {
  LOAD_VIDEO
} from '../../../modules/Flass/Detail/Video/VideoActions';

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
)(Detail);
