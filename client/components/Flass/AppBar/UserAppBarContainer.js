import { connect } from 'react-redux';
import UserAppBar from './UserAppBar';


function mapStateToProps(state) {
  return {
    user: { ...state.flass.user }
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserAppBar);
