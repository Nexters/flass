import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { FETCH_COMMENT, ADD_COMMENT } from './CommentActions';
import Comment from '../../../../components/Flass/FlassDetail/Comment/Comment';


function mapStateToProps(state) {
  return {
    comments: state.flass.detail.comment.comments,
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
    fetchReplyComment: commentId => {

    },
    addComment: (detailId, userId, userName, content) => {
      dispatch({
        type: ADD_COMMENT,
        detailId,
        userId,
        userName,
        content
      });
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Comment);
