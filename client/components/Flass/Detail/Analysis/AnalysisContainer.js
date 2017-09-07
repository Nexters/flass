import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Analysis from './Analysis';
import {
  REQUEST_LECTURE_ANALYSIS
} from '../../../../modules/Flass/Detail/Analysis/actions';

function mapStateToProps(state) {
  const {
    detail: {
      detail: {
        id
      }
    },
    analysis: {
      questions,
      answers,
    }
  } = state.flass.detail;
  return {
    lectureId: id,
    questions,
    answers,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    requestLectureAnalysis: (lectureId, questionIndex) => ({
      type: REQUEST_LECTURE_ANALYSIS,
      lectureId,
      questionIndex
    })
  }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Analysis);
