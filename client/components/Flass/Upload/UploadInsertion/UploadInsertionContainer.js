import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  REQUEST_UPLOAD_QUESTIONS,

  addMultipleChoiceQuestion,
  addAnswerQuestion,
  cancelAddingQuestion,
  completeAddingQuestion,
  saveMultipleChoiceQuestion,
  addQuestionSecs,
  focusOnQuestion,
  completeEditQuestion,
  deleteCompleteQuestion
} from '../../../../modules/Upload/UploadInsertion/Quiz/actions';
import UploadInsertionComponent from './UploadInsertionComponent';

function mapStateToProps({ quizInsertion, upload }) {
  const {
    isAdding,
    type,
    questionSecsStateArray,
    stateOfFocusedQuestion,
    quizState,
    isUploadingQuestionRequestSuccess,
    lectureUrl
  } = quizInsertion;

  const {
    videoURL
  } = upload;

  return {
    isAdding,
    type,
    questionSecsStateArray,
    stateOfFocusedQuestion,
    isUploadingQuestionRequestSuccess,
    lectureUrl,
    videoUrl: videoURL,
    questionStateArray: quizState
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    addMultipleChoiceQuestion,
    addAnswerQuestion,
    cancelAddingQuestion,
    completeAddingQuestion,
    saveMultipleChoiceQuestion,
    addQuestionSecs,
    focusOnQuestion,
    completeEditQuestion,
    deleteCompleteQuestion,
    requestUploadQuestions: ({ questionState }) => ({
      type: REQUEST_UPLOAD_QUESTIONS,
      questionState
    })
  }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UploadInsertionComponent);
