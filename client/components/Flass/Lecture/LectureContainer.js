import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Lecture from './Lecture';
import {
  FETCH_LECTURE
} from '../../../modules/Flass/Lecture/actions';
import { REQUEST_ON_ENDED } from '../../../modules/Flass/Lecture/Video/actions';
import withLoading from './withLoading';

function mapStateToProps(state) {
  return {
    ...state.flass.lecture,
    ...state.flass.video
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchRequestLectureAll: lectureId => ({
      type: FETCH_LECTURE,
      lectureId
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
