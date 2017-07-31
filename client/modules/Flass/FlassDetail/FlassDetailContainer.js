import { connect } from 'react-redux';
import FlassDetail from '../../../components/Flass/FlassDetail/FlassDetail';
import { fetchRequestDetailAll, FETCH_DETAIL } from './FlassDetailActions';

function mapStateToProps(state) {
  return {
    ...state.flass.detail
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchRequestDetailAll: detailId => {
      dispatch({
        type: FETCH_DETAIL,
        detailId
      });
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FlassDetail);
