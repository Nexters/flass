import { connect } from 'react-redux';
import FlassDetail from './FlassDetail';
import { fetchRequestDetail } from '../../../modules/Flass/FlassDetail/FlassDetailActions';
import { fetchRequestComment } from '../../../modules/Flass/FlassDetail/Comment/FlassCommentActions';


function mapStateToProps(state) {
  return {
    ...state.flass.detail
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchRequestDetail: detailId => {
      dispatch(fetchRequestDetail(detailId));
    },
    fetchRequestComment: detailId => {
      dispatch(fetchRequestComment(detailId));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FlassDetail);
