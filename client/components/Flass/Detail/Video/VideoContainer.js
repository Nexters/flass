import { connect } from 'react-redux';
import {
  FETCH_QUESTION
} from '../../../../modules/Flass/Detail/Question/QuestionActions';
import {
  fetchVideo,
  SET_VIDEO_COMPLETE,
  RESET_VIDEO_COMPLETE
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
  return {
    flassDetailLoadVideo: fetchVideo,
    setCompleteVideoFlag: () => {
      dispatch({
        type: SET_VIDEO_COMPLETE
      });
    },
    resetCompleteVideoFlag: () => {
      dispatch({
        type: RESET_VIDEO_COMPLETE
      });
    },
    fetchQuestion: detailId => {
      dispatch({
        type: FETCH_QUESTION,
        detailId
      });
    },
    updateStateAfterSolveQuestion: newState => {
      dispatch({
        type: UPDATE_STATE_AFTER_SOLVE_QUESTION,
        newState
      });
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Video);
