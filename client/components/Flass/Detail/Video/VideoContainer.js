import { connect } from 'react-redux';
import {
  FETCH_QUESTION
} from '../../../../modules/Flass/Detail/Question/QuestionActions';
import {
  flassDetailLoadVideo,
  flassDetailSolvedOneQuestion
} from '../../../../modules/Flass/Detail/Video/VideoActions';

import Video from './Video';


function mapStateToProps(state) {
  const {
    flass: {
      detail: {
        question: {
          questions
        },
        video: {
          videoUrl
        }
      }
    }
  } = state;

  return { questions, videoUrl };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchQuestion: detailId => {
      dispatch({
        type: FETCH_QUESTION,
        detailId
      });
    },
    flassDetailLoadVideo,
    flassDetailSolvedOneQuestion
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Video);
