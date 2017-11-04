import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Analysis from './Analysis';
import {
  REQUEST_LECTURE_ANALYSIS,
  UNMOUNT_ANALYSIS
} from '../../../../modules/Flass/Lecture/Analysis/actions';

function mapStateToProps(state) {
  const {
    lecture: {
      lecture: {
        id
      }
    },
    analysis: {
      questions,
      questionIndex,
      question_answers,
      answers,
      loadingQuestions_
    }
  } = state.flass.lecture;
  return {
    lectureId: id,
    questions,
    questionIndex,
    question_answers,
    answers,
    loadingQuestions_
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    requestLectureAnalysisAction: (lectureId, questionIndex) => ({
      type: REQUEST_LECTURE_ANALYSIS,
      lectureId,
      questionIndex
    }),
    unmountAnalysisAction: () => ({
      type: UNMOUNT_ANALYSIS
    })
  }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Analysis);
