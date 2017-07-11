import {connect} from 'react-redux';
import Flass from "./Flass";


function mapStateToProps(state) {
  return {
    ...state.flass
  };
}

function mapDispatchToProps(dispatch) {
  return {

  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Flass);
