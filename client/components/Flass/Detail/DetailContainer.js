import { connect } from 'react-redux';
import Detail from './Detail';
import { FETCH_DETAIL } from '../../../modules/Flass/Detail/actions';
import withLoading from './withLoading';

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
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withLoading()(Detail));
