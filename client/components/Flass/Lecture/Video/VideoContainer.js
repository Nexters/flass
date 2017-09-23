import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  FETCH_QUESTION
} from '../../../../modules/Flass/Lecture/Question/actions';
import {
  fetchVideo,
  SET_VIDEO_COMPLETE,
  RESET_VIDEO_COMPLETE,
} from '../../../../modules/Flass/Lecture/Video/actions';
import {
  UPDATE_STATE_AFTER_SOLVE_QUESTION
} from '../../../../modules/Flass/Lecture/actions';

import Video from './Video';


function mapStateToProps(state) {
  const {
    flass: {
      lecture: {
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
    flassLectureLoadVideo: fetchVideo,
    setCompleteVideoFlag: () => ({
      type: SET_VIDEO_COMPLETE
    }),
    resetCompleteVideoFlag: () => ({
      type: RESET_VIDEO_COMPLETE
    }),
    fetchQuestion: lectureId => ({
      type: FETCH_QUESTION,
      lectureId
    }),
    updateStateAfterSolveQuestion: newState => ({
      type: UPDATE_STATE_AFTER_SOLVE_QUESTION,
      newState
    })
  }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Video);
