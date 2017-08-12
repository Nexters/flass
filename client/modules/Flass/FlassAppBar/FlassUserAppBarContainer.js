import { connect } from 'react-redux';
import FlassUserAppBar from '../../../components/Flass/FlassAppBar/FlassUserAppBar';


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
)(FlassUserAppBar);
