import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import PostComment from '../../../../components/Flass/FlassDetail/Comment/PostComment';

function mapStateToProps(state) {
  return {
  };
}

function mapDispatchToProps(dispatch) {
  return {
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(reduxForm({
  form: 'postComment',
})(PostComment));
