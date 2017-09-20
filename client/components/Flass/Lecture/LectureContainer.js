import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Lecture from './Lecture';
import { FETCH_DETAIL } from '../../../modules/Flass/Detail/actions';
import { REQUEST_ON_ENDED } from '../../../modules/Flass/Detail/Video/actions';
import withLoading from './withLoading';

function mapStateToProps(state) {
  return {
    ...state.flass.detail,
    ...state.flass.video
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchRequestDetailAll: detailId => ({
      type: FETCH_DETAIL,
      detailId
    }),
    saveQuestionsStateOnEnded: (solvedQuestionsState, userId, isForExternal) => ({
      type: REQUEST_ON_ENDED,
      solvedQuestionsState,
      userId,
      isForExternal
    })
  }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withLoading()(Lecture));
