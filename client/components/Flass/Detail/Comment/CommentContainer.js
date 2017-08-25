import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import {
  FETCH_COMMENT, fetchReplyComment, ADD_COMMENT,
  DELETE_COMMENT,
} from '../../../../modules/Flass/Detail/Comment/CommentActions';
import Comment from './Comment';


function mapStateToProps(state) {
  return {
    comments: state.flass.detail.comment.comments,
    commentchild: state.flass.detail.comment.commentchild,
    user: state.flass.user,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchComment: detailId => {
      dispatch({
        type: FETCH_COMMENT,
        detailId
      });
    },
    fetchReplyComment,
    addComment: (commentId, detailId, userId, userName, content) => {
      dispatch({
        type: ADD_COMMENT,
        commentId,
        detailId,
        userId,
        userName,
        content
      });
    },
    deleteComment: (commentId) => {
      dispatch({
        type: DELETE_COMMENT,
        commentId,
      });
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Comment);
