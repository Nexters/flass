import { connect } from 'react-redux';
import FlassDetail from './FlassDetail';
import { fetchRequestDetailAll, fetchRequestDetail } from '../../../modules/Flass/FlassDetail/FlassDetailActions';
import { fetchRequestComment } from '../../../modules/Flass/FlassDetail/Comment/FlassCommentActions';
import { fetchRequestQuestion } from '../../../modules/Flass/FlassDetail/Question/FlassQuestionActions';

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
    },
    addComment: comment => {

    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FlassDetail);
