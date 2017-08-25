import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  FETCH_QUESTION
} from '../../../../modules/Flass/Detail/Question/QuestionActions';
import {
  fetchVideo,
  SET_VIDEO_COMPLETE,
  RESET_VIDEO_COMPLETE,
  REQUEST_ON_ENDED
} from '../../../../modules/Flass/Detail/Video/VideoActions';
import {
  UPDATE_STATE_AFTER_SOLVE_QUESTION
} from '../../../../modules/Flass/Detail/DetailActions';

import Video from './Video';


function mapStateToProps(state) {
  const {
    flass: {
      detail: {
        question: {
          questions,
          solvedQuestionsState
        },
        video: {
          videoUrl,
          searchableSecs,
          isVideoComplete
        }
      }
    }
  } = state;

  return {
    questions,
    solvedQuestionsState,
    videoUrl,
    searchableSecs,
    isVideoComplete
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    flassDetailLoadVideo: fetchVideo,
    setCompleteVideoFlag: () => ({
      type: SET_VIDEO_COMPLETE
    }),
    resetCompleteVideoFlag: () => ({
      type: RESET_VIDEO_COMPLETE
    }),
    fetchQuestion: detailId => ({
      type: FETCH_QUESTION,
      detailId
    }),
    updateStateAfterSolveQuestion: newState => ({
      type: UPDATE_STATE_AFTER_SOLVE_QUESTION,
      newState
    }),
    requestOnEnded: solvedQuestionsState => ({
      type: REQUEST_ON_ENDED,
      solvedQuestionsState
    })
  }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Video);
