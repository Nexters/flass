import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import {
  FETCH_COMMENT, fetchReplyComment, ADD_COMMENT,
  DELETE_COMMENT,
} from '../../../../modules/Flass/Lecture/Comment/actions';
import Comment from './Comment';


function mapStateToProps(state) {
  return {
    comments: state.flass.lecture.comment.comments,
    commentchild: state.flass.lecture.comment.commentchild,
    user: state.flass.user,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchComment: lectureId => {
      dispatch({
        type: FETCH_COMMENT,
        lectureId
      });
    },
    fetchReplyComment,
    addComment: (commentId, lectureId, userId, userName, content) => {
      dispatch({
        type: ADD_COMMENT,
        commentId,
        lectureId,
        userId,
        userName,
        content
      });
    },
    deleteComment: (parentId, commentId) => {
      dispatch({
        type: DELETE_COMMENT,
        parentId,
        commentId,
      });
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Comment);
