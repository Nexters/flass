import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  FETCH_QUESTION
} from '../../../../modules/Flass/Detail/Question/actions';
import {
  fetchVideo,
  SET_VIDEO_COMPLETE,
  RESET_VIDEO_COMPLETE,
} from '../../../../modules/Flass/Detail/Video/actions';
import {
  UPDATE_STATE_AFTER_SOLVE_QUESTION
} from '../../../../modules/Flass/Detail/actions';

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
    })
  }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Video);
