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
      selectedQuestions
    }
  } = state.flass.detail;
  console.log('state.flass.detail');
  console.log(state.flass.detail);
  return {
    lectureId: id,
    questions,
    answers,
    selectedQuestions
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    requestLectureAnalysis: lectureId => ({
      type: REQUEST_LECTURE_ANALYSIS,
      id: lectureId
    })
  }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Analysis);
