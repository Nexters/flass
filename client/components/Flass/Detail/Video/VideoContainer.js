import { connect } from 'react-redux';
import {
  FETCH_QUESTION,
} from '../../../../modules/Flass/Detail/Question/QuestionActions';
import {
  fetchVideo
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
          questions
        },
        video: {
          videoUrl,
          searchableSecs
        }
      }
    }
  } = state;

  return {
    questions,
    videoUrl,
    searchableSecs
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchQuestion: detailId => {
      dispatch({
        type: FETCH_QUESTION,
        detailId
      });
    },
    flassDetailLoadVideo: fetchVideo,
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
