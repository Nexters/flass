import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Analysis from './Analysis';
import {
  REQUEST_LECTURE_ANALYSIS
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
      question_answers,
      answers
    }
  } = state.flass.lecture;
  return {
    lectureId: id,
    questions,
    question_answers,
    answers
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
