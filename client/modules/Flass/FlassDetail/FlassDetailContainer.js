import { connect } from 'react-redux';
import FlassDetail from '../../../components/Flass/FlassDetail/FlassDetail';
import { fetchRequestDetailAll, fetchRequestDetail, FLASS_DETAIL_TEST } from './FlassDetailActions';
import { fetchRequestComment } from './Comment/CommentActions';
import { fetchRequestQuestion } from './Question/QuestionActions';

function mapStateToProps(state) {
  return {
    ...state.flass.detail
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchRequestDetailAll: detailId => {
      dispatch(fetchRequestDetailAll(detailId));
    },
    fetchRequestDetail: detailId => {
      dispatch(fetchRequestDetail(detailId));
    },
    fetchRequestComment: detailId => {
      dispatch(fetchRequestComment(detailId));
    },
    fetchRequestQuestion: detailId => {
      dispatch(fetchRequestQuestion(detailId));
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FlassDetail);
